import React, { useEffect, useState } from "react";
import BarGraph from "../chatbot/Components/BarGraph";
import Switch from "../../components/commonUI/Switch";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardDataListing } from "../../redux/slice/dashboard/getDashboardListingSlice";
import Sketlon from "../../components/commonUI/Sketlon";
import Pagination from "../../components/commonUI/Pagination";
import PieGraph from "../../components/PieGraph";

const Dashboard = () => {
  /**
   * Add Hooks  for state and props here.
   */
  const dispatch = useDispatch()
  const getDataList = useSelector((item)=> item)
    console.log(getDataList);
  // lets fetch data within one variable
  
  const fetchData = getDataList.getDashboardDataListing.tickets 
  // console.log(fetchData.openTicketsList);



  const [pageNumber, setPageNumber] = useState(0);
    const startSerialNumber = pageNumber * 10 + 1;



  useEffect(() => {
    dispatch(getDashboardDataListing(pageNumber))
  }, [pageNumber]);
  return (
    <>
      <div className="doctor-wrapper">
        <div className="container container-padd">
          <div className="mid-head mar-20">
            <h2>Dashboard</h2>
          </div>

          <div class="row">
            <div class="col-xl col-lg-6">
              <div className="ticketBox bg1">
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/icons-images/ticket-icon1.png`}
                    alt="icon"
                  />
                </div>
                <div>
                  <h2>{fetchData?.totalTickets}</h2>
                  <p>Total Tickets</p>
                </div>
              </div>
            </div>
            <div class="col-xl col-lg-6">
              <div className="ticketBox bg2">
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/icons-images/ticket-icon2.png`}
                    alt="icon"
                  />
                </div>
                <div>
                <h2>{fetchData?.openTickets}</h2>
                  <p>Open Tickets</p>
                </div>
              </div>
            </div>
            <div class="col-xl col-lg-6">
              <div className="ticketBox bg3">
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/icons-images/ticket-icon3.png`}
                    alt="icon"
                  />
                </div>
                <div>
                <h2>{fetchData?.pendingTickets}</h2>
                {/* <Sketlon/> */}
                  <p>Pending Tickets</p>
                </div>
              </div>
            </div>
            <div class="col-xl col-lg-6">
              <div className="ticketBox bg4">
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/icons-images/ticket-icon4.png`}
                    alt="icon"
                  />
                </div>
                <div>
                <h2>{fetchData?.closeTickets}</h2>
                  <p>Closed Tickets</p>
                </div>
              </div>
            </div>
            <div class="col-xl col-lg-6">
              <div className="ticketBox bg5">
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/icons-images/ticket-icon5.png`}
                    alt="icon"
                  />
                </div>
                <div>
                <h2>{fetchData?.lastSevenDaysOpenTickets}</h2>
                  <p>Last 7 Days Tickets</p>
                </div>
              </div>
            </div>
          </div>

          <div className="graph">
            <div className="row">
              <div className="col-lg-9 mb-3">
                <div className="graphBox">
                  <div>
                    <h2>Overview</h2>
                  </div>
                  <div class="right">
                    <input type="date" name="startDate" id="startDate" />
                    <span>To</span>
                    <input type="date" name="endDate" id="endDate" />
                  </div>
                </div>
                <div className="graphbg">
                  <BarGraph barData={fetchData}/>
                </div>
              </div>
              <div className="col-lg-3 mb-3">
                <div className="graphBoxRight">
                  <div>
                    <h2>Analytics</h2>
                  </div>
                  <div class="right">
                    <img
                      src={`${process.env.PUBLIC_URL}/icons-images/3dots.png`}
                      alt="icon"
                    />
                  </div>
                </div>
                <div className="graphPieChart">
                  <PieGraph pieData={fetchData} />
                </div>
                {/* <div className="graphPieChart">
                  <PieGraph />
                  <img
                  src={`${process.env.PUBLIC_URL}/icons-images/dashboard-graph2.png`}
                  alt="icon"
                />
                </div> */}
              </div>
            </div>
          </div>

          <div className="mid-head ">
            <h2>Open Tickets</h2>
          </div>

          <div className="mid-table ">
            <table
              className="table MobileTable"
              cellSpacing="2"
              cellPadding="0"
              border="0"
            >
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Ticket No.</th>
                  <th scope="col">Question</th>
                  <th scope="col">Agent</th>
                  <th scope="col">Team Leader </th>
                  <th scope="col">Manager</th>
                  <th scope="col">Team</th>
                  <th scope="col">Start Date</th>
                  <th scope="col"> Status</th>
                </tr>
              </thead>
              <tbody>
              {fetchData?.openTicketsList?.length === 0 ? <> <tr>
              <td colSpan={"9"} align="center">
                <h2 className="mt-5 mb-5"> No Tickets Found!</h2>
              </td>
            </tr></>:<>{fetchData?.openTicketsList?.map((item,i)=>{
                const serialNumber = (startSerialNumber + i)
                      .toString()
                      .padStart(2, "0");
                return(
                  <>
                  <tr key={i}>
                  <td data-label="S.No">{serialNumber}</td>
                  <td data-label="Ticket No.">{item.ticketNo}</td>
                  {/* <td data-label="Question">{item.taskQuestion}</td> */}
                  <td data-label="Name">
                        {item.taskQuestion && item.taskQuestion.length > 15
                          ? `${item.taskQuestion.substring(0, 15)}...`
                          : item.taskQuestion}
                      </td>
                  <td data-label="Agent">{item.agentName || "N/A"}</td>
                  <td data-label="Team Leader ">{item.teamLeaderName || "N/A"}</td>
                  <td data-label="Manager">{item.managerName || "N/A"}</td>
                  <td data-label="Team">{item.teamName || "N/A"}</td>
                  <td data-label="Start Date">{item.startDate || "N/A"}</td>
                  <td data-label="Status" className="status-open">
                  {item.status === "1" ? "Open":""}
                    {/* <Switch /> */}
                  </td>
                </tr>
                  </>
                )
              })}</>}
              
                
              </tbody>
            </table>
          </div>

          <div className="pagination-col">
            {/* <div className="lefttext">
              <p>Showing Result {fetchData.totalItems} found</p>
            </div> */}
            <div className="lefttext">
              {/* <button class=" btn-small bluebg" type="button">
                <i class="fa-solid fa-chevron-down"></i>
              </button> */}
              {/* <Pagination
   totalPages={fetchData?.totalPages}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItems={fetchData?.totalItems}
              items={fetchData?.totalItems}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
