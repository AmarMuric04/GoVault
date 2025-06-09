import { cache } from "react";
import Password from "@/lib/database/models/password";
import { isAuthenticated, correctPassword } from "../auth.actions";
import connectToDatabase from "@/lib/database/db";
import { decrypt } from "./password.actions";
import moment from "moment";

export const getPasswordStrengthPieData = cache(async () => {
  await connectToDatabase();
  const user = await isAuthenticated();
  if (!user) throw new Error("User not authenticated");

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
  await connectToDatabase();
  const user = await isAuthenticated();
  if (!user) throw new Error("User not authenticated");

  const passwords = await Password.find({ owner: user._id }).sort({
    createdAt: 1,
  });

  const passwordCountByDate = {};
  passwords.forEach((psw) => {
    const date = moment(psw.createdAt).format("YYYY-MM-DD");
    passwordCountByDate[date] = (passwordCountByDate[date] || 0) + 1;
  });

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

export const getBarChartData = cache(async (days = 7) => {
  try {
    const user = await isAuthenticated();

    await connectToDatabase();

    const yourPasswords = await getPasswordsPerDay(days);

    const allPasswords = await Password.find({
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

      if (!userCountByDate[date]) {
        userCountByDate[date] = new Set();
      }
      userCountByDate[date].add(psw.owner.toString());
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
  } catch (error) {
    console.log(error);
  }
});

export const getPasswordStatisticsByUserId = cache(async () => {
  await connectToDatabase();
  const user = await isAuthenticated();
  if (!user) throw new Error("User not authenticated");

  const passwords = await Password.find({ owner: user._id });
  const total = passwords.length;

  const counts = { good: 0, great: 0, bad: 0, critical: 0, compromised: 0 };
  let positiveCount = 0;
  let negativeCount = 0;
  let totalPasswordLength = 0;
  let countWithPassword = 0;
  let minPasswordLength = Infinity;
  let maxPasswordLength = 0;

  // Use a for...of loop to await decryption of each password.
  for (const psw of passwords) {
    if (psw.strength) {
      const strength = psw.strength.toLowerCase();
      if (["good", "great", "bad", "critical"].includes(strength)) {
        counts[strength] = (counts[strength] || 0) + 1;
      }
      if (["good", "great"].includes(strength)) {
        positiveCount++;
      } else if (["bad", "critical"].includes(strength)) {
        negativeCount++;
      }
    }
    if (psw.compromised) {
      counts.compromised = (counts.compromised || 0) + 1;
    }
    if (psw.password) {
      const decrypted = await decrypt(psw.password);
      const len = decrypted.length;
      totalPasswordLength += len;
      countWithPassword++;
      if (len < minPasswordLength) minPasswordLength = len;
      if (len > maxPasswordLength) maxPasswordLength = len;
    }
  }

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
  try {
    await connectToDatabase();
    const user = await isAuthenticated();
    if (!user) throw new Error("User not authenticated");

    const allPasswords = await Password.find({});

    // Early return if no passwords exist globally
    if (!allPasswords || allPasswords.length === 0) {
      return {
        passwordQuantity: "No data available",
        passwordStrength: "No data available",
        compromisedPasswords: "No data available",
        generatedPasswords: "No data available",
      };
    }

    const userStatsMap = {};

    // Process all passwords and build user statistics
    allPasswords.forEach((psw) => {
      if (!psw || !psw.owner) return; // Skip invalid entries

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

      userStatsMap[owner].count++;

      if (psw.compromised === true) {
        userStatsMap[owner].compromised++;
      }

      if (psw.isGenerated === true) {
        userStatsMap[owner].generated++;
      }

      if (psw.strength && typeof psw.strength === "string") {
        const strengthScore = getStrengthScore(
          psw.strength.toLowerCase().trim()
        );
        if (strengthScore !== null) {
          userStatsMap[owner].strengthTotal += strengthScore;
          userStatsMap[owner].strengthCount++;
        }
      }
    });

    const users = Object.keys(userStatsMap);

    // Need at least 2 users for meaningful comparisons
    if (users.length < 2) {
      return {
        passwordQuantity: "Insufficient data",
        passwordStrength: "Insufficient data",
        compromisedPasswords: "Insufficient data",
        generatedPasswords: "Insufficient data",
      };
    }

    // Calculate arrays for percentile comparisons
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

    // Get current user's statistics
    const userStats = userStatsMap[user._id] || {
      count: 0,
      compromised: 0,
      generated: 0,
      strengthTotal: 0,
      strengthCount: 0,
    };

    // If user has no passwords, return appropriate message
    if (userStats.count === 0) {
      return {
        passwordQuantity: "No passwords found",
        passwordStrength: "No passwords found",
        compromisedPasswords: "No passwords found",
        generatedPasswords: "No passwords found",
      };
    }

    const userQuantity = userStats.count;
    const userStrength =
      userStats.strengthCount > 0
        ? userStats.strengthTotal / userStats.strengthCount
        : 0;
    const userCompromisedRatio =
      (userStats.compromised / userStats.count) * 100;
    const userGeneratedRatio = (userStats.generated / userStats.count) * 100;

    // Calculate percentiles with improved error handling
    const quantityPercentile = calculateReversedPercentile(
      quantityArr,
      userQuantity
    );
    const strengthPercentile = calculateNormalPercentile(
      strengthArr,
      userStrength
    );
    const compromisedPercentile = calculateReversedPercentile(
      compromisedArr,
      userCompromisedRatio
    );
    const generatedPercentile = calculateReversedPercentile(
      generatedArr,
      userGeneratedRatio
    );

    return {
      passwordQuantity: formatPercentile(quantityPercentile),
      passwordStrength: formatPercentile(strengthPercentile),
      compromisedPasswords: formatPercentile(compromisedPercentile),
      generatedPasswords: formatPercentile(generatedPercentile),
    };
  } catch (error) {
    console.error("Error in getUserGlobalComparisons:", error);
    return {
      passwordQuantity: "Error calculating",
      passwordStrength: "Error calculating",
      compromisedPasswords: "Error calculating",
      generatedPasswords: "Error calculating",
    };
  }
});

// Helper function to get strength score
function getStrengthScore(strength) {
  const strengthMap = {
    critical: 0,
    bad: 1,
    weak: 1,
    fair: 2,
    good: 3,
    strong: 4,
    great: 4,
    excellent: 4,
  };

  return strengthMap[strength] !== undefined ? strengthMap[strength] : null;
}

// Helper function for reversed percentile calculation (higher is better)
function calculateReversedPercentile(arr, value) {
  if (
    !arr ||
    arr.length === 0 ||
    typeof value !== "number" ||
    !isFinite(value)
  ) {
    return null;
  }

  const sorted = [...arr].sort((a, b) => a - b);
  const count = sorted.filter((val) => val >= value).length;
  return (count / sorted.length) * 100;
}

// Helper function for normal percentile calculation (higher is better)
function calculateNormalPercentile(arr, value) {
  if (
    !arr ||
    arr.length === 0 ||
    typeof value !== "number" ||
    !isFinite(value)
  ) {
    return null;
  }

  const sorted = [...arr].sort((a, b) => a - b);
  const count = sorted.filter((val) => val <= value).length;
  return (count / sorted.length) * 100;
}

// Helper function to format percentile results
function formatPercentile(percentile) {
  if (
    percentile === null ||
    percentile === undefined ||
    !isFinite(percentile)
  ) {
    return "Unable to calculate";
  }

  const rounded = Math.round(percentile);

  // Handle edge cases
  if (rounded <= 0) return "Bottom 1%";
  if (rounded >= 100) return "Top 1%";

  return `Top ${rounded}%`;
}

export const getPasswordCountComparison = cache(async () => {
  await connectToDatabase();
  const user = await isAuthenticated();
  if (!user) throw new Error("User not authenticated");

  const allPasswords = await Password.find({});
  const userCounts = {};

  allPasswords.forEach((psw) => {
    const owner = psw.owner.toString();
    userCounts[owner] = (userCounts[owner] || 0) + 1;
  });

  const currentUserCount = userCounts[user._id] || 0;
  const otherUserCounts = Object.entries(userCounts)
    .filter(([owner]) => owner !== user._id)
    .map(([, count]) => count);

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
