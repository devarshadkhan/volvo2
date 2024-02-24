import React from "react";
import ReactEcharts from "echarts-for-react";

const BarGraph = ({ graphColor,barData }) => {
  const {closeTickets,lastSevenDaysOpenTickets,openTickets,pendingTickets,totalTickets} = barData;
  let base = +new Date(1988, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let data = [[base, Math.random() * 300]];
  for (let i = 1; i < 20000; i++) {
    let now = new Date((base += oneDay));
    data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
  }
  data = [
    {
      name: "Solicitados",
      value: 18203,
    },
    {
      name: "Aprobados",
      value: 12000,
    },
    {
      name: "Aceptados",
      value: 13203,
    },
    {
      name: "Cerrados",
      value: 8203,
    },
    {
      name: "Negados",
      value: 1203,
    },
    {
      name: "En revision",
      value: 6203,
    },
    {
      name: "En mora",
      value: 2203,
    },
  ];
  //   Graph Customizations
  const option = {
    // title: {
    //   text: "Rainfall vs Evaporation",
    //   subtext: "Fake Data",
    // },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Open Tickets", "Pending Tickets", "Closed Tickets"],
      orient: "horizontal", // Display the legend horizontally
      x: "center", // Position the legend at the center horizontally
      y: "bottom", // Place the legend at the bottom of the graph
    },
    toolbox: {
      show: true,
      //   feature: {
      //     dataView: { show: true, readOnly: false },
      //     magicType: { show: true, type: ["line", "bar"] },
      //     restore: { show: true },
      //     saveAsImage: { show: true },
      //   },
    },
    calculable: true,
    xAxis: [
      {
        type: "category",
        // prettier-ignore
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', ],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Open Tickets",
        type: "bar",
        data: [ openTickets
          // 222.0, 334.9, 117.0, 223.2, 235.6, 76.7, 135.6, 162.2, 232.6, 20.0,
          // 6.4, 3.3,
        ],
        itemStyle: {
          normal: {
            color: "#3960CB", // Set primary color for the bar
            barBorderRadius: [5, 5, 0, 0], // Set border-radius for the bar
          },
        },
      },

      {
        name: "Pending Tickets",
        type: "bar",
        data: [ pendingTickets
        ],
        itemStyle: {
          normal: {
            color: "#F85F5F", // Set primary color for the bar
            barBorderRadius: [5, 5, 0, 0], // Set border-radius for the bar
          },
        },
      },
      {
        name: "Closed Tickets",
        type: "bar",
        data: [closeTickets
        ],
        itemStyle: {
          normal: {
            color: "#FFAD65", // Set secondary color for the bar
            barBorderRadius: [5, 5, 0, 0], // Set border-radius for the bar
          },
        },
      },
    ],

    grid: {
      top: "10%", // Set top margin to 0
      left: "3%", // Adjust the left margin if needed
      right: "4%", // Adjust the right margin if needed
      bottom: "15%", // Adjust the bottom margin if needed
      containLabel: true, // Ensures the labels within the grid don't overflow
    },
  };

  return (
    <ReactEcharts
      option={option}
      notMerge={true}
      lazyUpdate={true}
      theme={"theme_name"}
      // onChartReady={this.onChartReadyCallback}
      // onEvents={EventsDict}
      // opts={}
      style={{ height: "150px", width: "800px", maxWidth: "100%" }}
    />
  );
};

export default BarGraph;
