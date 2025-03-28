"use client";

import { memo } from "react";
import {
  PieChart as PieC,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const getColorForStrength = (strength) => {
  const colors = {
    Critical: "#b60600",
    Bad: "#e64006",
    Dubious: "#dfca00",
    Good: "#0fc200",
    Great: "#087420",
  };

  return colors[strength] || "#8884d8";
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
  label,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return label !== 0 ? (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {label}
    </text>
  ) : null;
};

const PieChart = memo(({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieC width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          stroke="black"
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getColorForStrength(entry.name.split(" ")[0])}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieC>
    </ResponsiveContainer>
  );
});

export default PieChart;
