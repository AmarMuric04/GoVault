"use client";

import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function Chart({ data }) {
  return (
    <ResponsiveContainer width="100%">
      <AreaChart data={data}>
        <CartesianGrid stroke="#111" />
        <XAxis dataKey="date" name="Date" />
        <YAxis dataKey="value" name="Value" axisLine={false} />
        <Tooltip labelClassName="text-black" />
        <Area
          type="monotone"
          dataKey="value"
          name="Total passwords"
          stroke="#fff"
          fill="#ffffff40"
          dot={false}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
