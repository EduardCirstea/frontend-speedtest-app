import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Definim tipul pentru fiecare punct de date
interface ChartData {
  time: string;
  downloadSpeed: number;
  uploadSpeed: number;
}

// Definim tipul pentru props
interface ConnectionChartProps {
  data: ChartData[];
}

const ConnectionChart: React.FC<ConnectionChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="downloadSpeed"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uploadSpeed" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ConnectionChart;
