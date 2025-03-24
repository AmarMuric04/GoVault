"use client";

import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

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
  index,
  name,
  label,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {label !== 0 && label}
    </text>
  );
};

export default class PasswordStrengthPieChart extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj";

  render() {
    const { data } = this.props;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            stroke="black"
            label={(...args) => renderCustomizedLabel(...args, data.label)}
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
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
