"use client";

import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default class BarChartComp extends PureComponent {
  static demoUrl = "https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5";

  render() {
    const { data } = this.props;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barCategoryGap="50%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#111" />
          <XAxis dataKey="date" />
          <YAxis axisLine={false} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Your passwords"
            fill="#fff"
            activeBar={<Rectangle fill="#000" stroke="#000" />}
            barSize={20}
          />
          <Bar
            dataKey="Others' passwords"
            fill="#aaa"
            activeBar={<Rectangle fill="#555" stroke="#555" />}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
