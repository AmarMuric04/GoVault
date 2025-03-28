"use client";

import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart as AreaC,
  Area,
} from "recharts";
import { memo } from "react";

const AreaChart = memo(({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaC data={data} key={data?.length || "chart"}>
        <CartesianGrid stroke="#111" />
        <XAxis dataKey="date" name="Date" />
        <YAxis dataKey="value" name="Value" axisLine={false} />
        <Tooltip labelClassName="text-black" />
        <Area
          type="monotone"
          dataKey="value"
          name="Total passwords"
          stroke="#ee6711"
          fill="#ffffff40"
          dot={{ r: 0 }}
          strokeWidth={2}
        />
      </AreaC>
    </ResponsiveContainer>
  );
});

export default AreaChart;
