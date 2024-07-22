import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: { language: string; bytes: number }[];
}

const predefinedColors = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#C9CBCF",
  "#FF99C8",
  "#FFCC99",
  "#A6D8FF",
  "#B2BEB5",
  "#FFD700",
  "#ADFF2F",
  "#FF6347",
  "#40E0D0",
  "#EE82EE",
  "#FA8072",
  "#FF4500",
  "#DA70D6",
  "#BDB76B",
  "#7B68EE",
  "#6B8E23",
  "#4682B4",
  "#D2691E",
  "#9ACD32",
  "#00CED1",
  "#8A2BE2",
  "#FF00FF",
  "#1E90FF",
  "#FF1493",
];

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const totalBytes = data.reduce((sum, item) => sum + item.bytes, 0);

  const getColor = (index: number) => {
    return predefinedColors[index % predefinedColors.length];
  };

  const chartData = {
    labels: data.map((item) => `${item.language}`),
    datasets: [
      {
        label: "Languages",
        data: data.map((item) => item.bytes),
        backgroundColor: data.map((_, index) => getColor(index)),
        hoverBackgroundColor: data.map((_, index) => getColor(index)),
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
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const value = tooltipItem.raw;
            const percentage = ((value / totalBytes) * 100).toFixed(1);
            return `${percentage}%`;
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
