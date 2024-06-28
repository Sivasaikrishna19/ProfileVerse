import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: { language: string; bytes: number }[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const totalBytes = data.reduce((sum, item) => sum + item.bytes, 0);

  const chartData = {
    labels: data.map((item) => `${item.language}`),
    datasets: [
      {
        label: "Languages",
        data: data.map((item) => item.bytes),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
        ],
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          generateLabels: (chart: any) => {
            const data = chart.data;
            return data.labels!.map((label: any, index: any) => {
              const dataset = data.datasets[0];
              const value = dataset.data[index];
              const percentage = (
                ((value as number) / totalBytes) *
                100
              ).toFixed(1);
              return {
                text: `${label} (${percentage}%)`,
                fillStyle: dataset.backgroundColor[index],
                hidden: false,
                lineCap: "butt",
                lineDash: [],
                lineDashOffset: 0,
                lineJoin: "miter",
                lineWidth: 1,
                strokeStyle: dataset.borderColor,
                pointStyle: "circle",
                rotation: 0,
              };
            });
          },
        },
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
