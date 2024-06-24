// PieChart.tsx
import React from "react";
import ReactApexChart from "react-apexcharts";

interface DataItem {
  language: string;
  bytes: number;
}

interface PieChartProps {
  languages: DataItem[];
}

const PieChart: React.FC<PieChartProps> = ({ languages }) => {
  if (!languages || languages.length === 0) {
    return <div>No languages available</div>;
  }

  console.log(languages, "languages");
  const series = languages.map((item) => item.bytes);
  const labels = languages.map((item) => item.language);

  const options: any = {
    chart: {
      type: "pie",
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width="380"
      />
    </div>
  );
};

export default PieChart;
