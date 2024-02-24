import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieGraph = ({pieData}) => {
    const {closeTickets,lastSevenDaysOpenTickets,openTickets,pendingTickets,totalTickets} = pieData;
  const DoughData = {
    labels: ["Open Tickets", "Pending Tickets", "Closed Tickets"],
    datasets: [
      {
        data: [closeTickets,openTickets,pendingTickets],
        backgroundColor: ["#3960CB", "#F85F5F", "#FFAD65"],
        hoverBackgroundColor: ["#3960CB", "#F85F5F", "#FFAD65"],
      },
    ],
  };

  return (
    <>
      <div>
        <Doughnut
          data={DoughData}
          options={{
            responsive: false,
            // width: "200px",
            // height: "100px",
            borderWidth: 0,
            legend: {
              display: false,
            },
          }}
        />
      </div>
    </>
  );
};

export default PieGraph;