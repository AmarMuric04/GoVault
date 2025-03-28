import { cache } from "react";
import Password from "@/lib/database/models/password";
import { isAuthenticated, correctPassword } from "../auth.actions";
import connectToDatabase from "@/lib/database/db";
import { decrypt } from "./password.actions";
import moment from "moment";

export const getPasswordStrengthPieData = cache(async () => {
  const user = await isAuthenticated();
  const passwords = await Password.find({ owner: user._id });

  const strengthStats = {
    Critical: 0,
    Bad: 0,
    Dubious: 0,
    Good: 0,
    Great: 0,
  };

  passwords.forEach((psw) => {
    strengthStats[psw.strength] = (strengthStats[psw.strength] || 0) + 1;
  });

  const pieData = Object.entries(strengthStats).map(([strength, value]) => ({
    name: `${strength} Passwords`,
    value,
    label: value,
  }));

  return pieData;
});

export const getPasswordsPerDay = cache(async (days = 7) => {
  const user = await isAuthenticated();
  const passwords = await Password.find({ owner: user._id }).sort({
    createdAt: 1,
  });

  const passwordCountByDate = {};

  passwords.forEach((psw) => {
    const date = moment(psw.createdAt).format("YYYY-MM-DD");
    passwordCountByDate[date] = (passwordCountByDate[date] || 0) + 1;
  });

  const startDate = passwords.length
    ? moment(passwords[0].createdAt).startOf("day")
    : moment().subtract(6, "days").startOf("day");

  const endDate = moment().startOf("day");
  const data = [];
  for (let i = 0; i < days; i++) {
    const date = moment().subtract(i, "days").format("YYYY-MM-DD");
    data.push({
      date,
      value: passwordCountByDate[date] || 0,
    });
  }

  return data.reverse();
});

export const getBarChartData = cache(async (userId, password, days = 7) => {
  if (!correctPassword(userId, password)) return;

  const yourPasswords = await getPasswordsPerDay(userId, password, days);

  const allPasswords = await Password.find({
    owner: { $ne: userId },
    createdAt: {
      $gte: moment()
        .subtract(days - 1, "days")
        .startOf("day")
        .toDate(),
    },
  }).sort({ createdAt: 1 });

  const passwordCountByDate = {};
  const userCountByDate = {};

  allPasswords.forEach((psw) => {
    const date = moment(psw.createdAt).format("YYYY-MM-DD");

    passwordCountByDate[date] = (passwordCountByDate[date] || 0) + 1;
    userCountByDate[date] = new Set([
      ...(userCountByDate[date] || new Set()),
      psw.owner.toString(),
    ]);
  });

  const avgPasswordsByDate = {};
  Object.keys(passwordCountByDate).forEach((date) => {
    const totalPasswords = passwordCountByDate[date];
    const uniqueUsers = userCountByDate[date]?.size || 1;
    avgPasswordsByDate[date] = totalPasswords / uniqueUsers;
  });

  const barData = yourPasswords.map(({ date, value }) => ({
    date,
    ["Your passwords"]: value,
    ["Others' passwords"]: Math.round(avgPasswordsByDate[date] || 0),
  }));

  return barData;
});

export const getPasswordStatisticsByUserId = cache(async () => {
  const user = await isAuthenticated();

  await connectToDatabase();

  const passwords = await Password.find({ owner: user._id });
  const total = passwords.length;

  const counts = { good: 0, great: 0, bad: 0, critical: 0, compromised: 0 };
  let positiveCount = 0;
  let negativeCount = 0;
  let totalPasswordLength = 0;
  let countWithPassword = 0;
  let minPasswordLength = Infinity;
  let maxPasswordLength = 0;

  passwords.forEach(async (psw) => {
    if (psw.strength) {
      const strength = psw.strength.toLowerCase();
      if (["good", "great", "bad", "critical"].includes(strength)) {
        counts[strength]++;
      }
      if (["good", "great"].includes(strength)) {
        positiveCount++;
      } else if (["bad", "critical"].includes(strength)) {
        negativeCount++;
      }
    }
    if (psw.compromised) {
      counts.compromised++;
    }
    if (psw.password) {
      const len = await decrypt(psw.password).length;
      totalPasswordLength += len;
      countWithPassword++;
      if (len < minPasswordLength) minPasswordLength = len;
      if (len > maxPasswordLength) maxPasswordLength = len;
    }
  });

  const averagePasswordLength =
    countWithPassword > 0 ? totalPasswordLength / countWithPassword : 0;
  const positivePercentage = total > 0 ? (positiveCount / total) * 100 : 0;
  const negativePercentage = total > 0 ? (negativeCount / total) * 100 : 0;
  const compromisedPercentage =
    total > 0 ? (counts.compromised / total) * 100 : 0;

  const strengthDistribution = {
    good: total > 0 ? (counts.good / total) * 100 : 0,
    great: total > 0 ? (counts.great / total) * 100 : 0,
    bad: total > 0 ? (counts.bad / total) * 100 : 0,
    critical: total > 0 ? (counts.critical / total) * 100 : 0,
  };

  return {
    totalPasswords: total,
    countsByStrength: {
      good: counts.good,
      great: counts.great,
      bad: counts.bad,
      critical: counts.critical,
    },
    strengthDistribution,
    compromisedCount: counts.compromised,
    compromisedPercentage,
    positivePercentage,
    negativePercentage,
    averagePasswordLength,
    minPasswordLength: countWithPassword > 0 ? minPasswordLength : 0,
    maxPasswordLength: countWithPassword > 0 ? maxPasswordLength : 0,
  };
});

export const getUserGlobalComparisons = cache(async () => {
  const user = await isAuthenticated();

  await connectToDatabase();

  const allPasswords = await Password.find({});

  const userStatsMap = {};
  allPasswords.forEach((psw) => {
    const owner = psw.owner.toString();
    if (!userStatsMap[owner]) {
      userStatsMap[owner] = {
        count: 0,
        compromised: 0,
        generated: 0,
        strengthTotal: 0,
        strengthCount: 0,
      };
    }
    userStatsMap[owner].count += 1;
    if (psw.compromised) userStatsMap[owner].compromised += 1;
    if (psw.isGenerated) userStatsMap[owner].generated += 1;
    if (psw.strength) {
      let score = 0;
      const s = psw.strength.toLowerCase();
      if (s === "critical") score = 0;
      else if (s === "bad") score = 1;
      else if (s === "good") score = 3;
      else if (s === "great") score = 4;
      userStatsMap[owner].strengthTotal += score;
      userStatsMap[owner].strengthCount += 1;
    }
  });

  const users = Object.keys(userStatsMap);
  const quantityArr = users.map((u) => userStatsMap[u].count);
  const strengthArr = users.map((u) =>
    userStatsMap[u].strengthCount > 0
      ? userStatsMap[u].strengthTotal / userStatsMap[u].strengthCount
      : 0
  );
  const compromisedArr = users.map((u) =>
    userStatsMap[u].count > 0
      ? (userStatsMap[u].compromised / userStatsMap[u].count) * 100
      : 0
  );
  const generatedArr = users.map((u) =>
    userStatsMap[u].count > 0
      ? (userStatsMap[u].generated / userStatsMap[u].count) * 100
      : 0
  );

  const getReversedPercentileRank = (arr, value) => {
    const sorted = arr.slice().sort((a, b) => a - b);
    let count = 0;
    sorted.forEach((val) => {
      if (val >= value) count++;
    });
    return (count / sorted.length) * 100;
  };

  const getNormalPercentileRank = (arr, value) => {
    const sorted = arr.slice().sort((a, b) => a - b);
    let count = 0;
    sorted.forEach((val) => {
      if (val <= value) count++;
    });
    return (count / sorted.length) * 100;
  };

  const userStats = userStatsMap[user._id] || {
    count: 0,
    compromised: 0,
    generated: 0,
    strengthTotal: 0,
    strengthCount: 0,
  };
  const userQuantity = userStats.count;
  const userStrength =
    userStats.strengthCount > 0
      ? userStats.strengthTotal / userStats.strengthCount
      : 0;
  const userCompromisedRatio =
    userStats.count > 0 ? (userStats.compromised / userStats.count) * 100 : 0;
  const userGeneratedRatio =
    userStats.count > 0 ? (userStats.generated / userStats.count) * 100 : 0;

  const quantityPercentile = getReversedPercentileRank(
    quantityArr,
    userQuantity
  );
  const compromisedPercentile = getReversedPercentileRank(
    compromisedArr,
    userCompromisedRatio
  );
  const generatedPercentile = getReversedPercentileRank(
    generatedArr,
    userGeneratedRatio
  );
  const strengthPercentile = getNormalPercentileRank(strengthArr, userStrength);

  return {
    passwordQuantity: `Top ${Math.round(quantityPercentile)}%`,
    passwordStrength: `Top ${Math.round(strengthPercentile)}%`,
    compromisedPasswords: `Top ${Math.round(compromisedPercentile)}%`,
    generatedPasswords: `Top ${Math.round(generatedPercentile)}%`,
  };
});

export const getPasswordCountComparison = cache(async () => {
  const user = await isAuthenticated();

  await connectToDatabase();

  const allPasswords = await Password.find({});

  const userCounts = {};
  allPasswords.forEach((psw) => {
    const owner = psw.owner.toString();
    userCounts[owner] = (userCounts[owner] || 0) + 1;
  });

  const currentUserCount = userCounts[user._id] || 0;

  const otherUserCounts = Object.keys(userCounts)
    .filter((owner) => owner !== user._id)
    .map((owner) => userCounts[owner]);

  const averageOthers =
    otherUserCounts.length > 0
      ? otherUserCounts.reduce((sum, count) => sum + count, 0) /
        otherUserCounts.length
      : 0;

  return [
    { name: "You have", value: currentUserCount },
    { name: "Other's have", value: Math.round(averageOthers) },
  ];
});
