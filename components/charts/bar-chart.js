"use client";

import { memo, useMemo } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChart = memo(({ data }) => {
  const processedData = useMemo(() => data, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        width={500}
        height={300}
        data={processedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barCategoryGap="50%"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#00000010" />
        <XAxis dataKey="date" />
        <YAxis axisLine={false} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="Your passwords"
          fill="#faaa15"
          activeBar={<Rectangle fill="#faaa15" stroke="#faaa15" />}
          barSize={20}
        />
        <Bar
          dataKey="Others' passwords"
          fill="#facc15"
          activeBar={<Rectangle fill="#facc15" stroke="#facc15" />}
          barSize={20}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
});

export default BarChart;
