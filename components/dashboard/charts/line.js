"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ data }) {
  return (
    <ResponsiveContainer width="100%">
      <LineChart data={data}>
        <CartesianGrid stroke="#0a0a0a" />
        <XAxis dataKey="date" name="Date" stoke="#0a0a0a" />
        <YAxis dataKey="value" name="Value" stoke="#0a0a0a" />
        <Tooltip labelClassName="text-black" />
        <Line
          dataKey="value"
          type="monotone"
          name="Total passwords"
          stroke="#fff"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
