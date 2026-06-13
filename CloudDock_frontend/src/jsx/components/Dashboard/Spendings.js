import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import json2csv from "json2csv";
import SpendingDataTable from "./SpendingDataTable";

function Spendings() {
   const [instances, setInstances] = useState(null);
   const d = new Date();

   // Function to handle CSV download
   const handleDownload = async () => {
      try {
         const response = await fetch('http://localhost:3000/api/details/instances');
         const data = await response.json();
         setInstances(data);
      } catch (error) {
         console.error('Error fetching data:', error);
      }
      if (instances) {
         try {
            // Convert JSON data to CSV format
            const csvData = json2csv.parse(instances);

            // Create a Blob object with the CSV data
            const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

            // Create a temporary anchor element to trigger the download
            const link = document.createElement("a");
            if (link.download !== undefined) {
               const url = URL.createObjectURL(blob);
               link.setAttribute("href", url);
               link.setAttribute("download", "instances.csv");
               document.body.appendChild(link);
               link.click();
               document.body.removeChild(link);
            } else {
               console.error("Anchor element download attribute is not supported in this browser.");
            }
         } catch (error) {
            console.error("Error occurred while converting data to CSV:", error);
         }
      }
   };

   return (
      <>
         <div className="form-head d-flex mb-0 mb-lg-4 align-items-start">
            <div className="mr-auto d-none d-lg-block">
               <h2 className="text-black font-w600"> Spending </h2>
               <p className="mb-0">Current Instances list</p>
            </div>
            <div className="d-none d-lg-flex align-items-center">
               <div className="text-right">
                  <h3 className="fs-20 text-black mb-0">{d.getHours() + ":" + d.getMinutes()}</h3>
                  <span className="fs-14">{d.toDateString()}</span>
               </div>
               <Link
                  className="ml-4 text-black p-3 rounded border text-center width60"
                  to="/spendings"
               >
                  <i className="las la-cog scale5" />
               </Link>
            </div>
         </div>
         <div className="row">
            <div className="col-xl-12">
               <div className="d-flex justify-content-between mb-1 flex-wrap">
                  <div>
                     <Link to="/spendings" className="btn bg-white mr-2 mb-2">
                        <svg
                           className="mr-2 scale5"
                           width={14}
                           height={14}
                           viewBox="0 0 24 24"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              d="M6.75 13.5H2.25C1.83579 13.5 1.5 13.8358 1.5 14.25V21.75C1.5 22.1642 1.83579 22.5 2.25 22.5H6.75C7.16421 22.5 7.5 22.1642 7.5 21.75V14.25C7.5 13.8358 7.16421 13.5 6.75 13.5Z"
                              fill="#52B141"
                           />
                           <path
                              d="M21.75 7.5H17.25C16.8358 7.5 16.5 7.83579 16.5 8.25V21.75C16.5 22.1642 16.8358 22.5 17.25 22.5H21.75C22.1642 22.5 22.5 22.1642 22.5 21.75V8.25C22.5 7.83579 22.1642 7.5 21.75 7.5Z"
                              fill="#52B141"
                           />
                           <path
                              d="M14.25 1.5H9.75C9.33579 1.5 9 1.83579 9 2.25V21.75C9 22.1642 9.33579 22.5 9.75 22.5H14.25C14.6642 22.5 15 22.1642 15 21.75V2.25C15 1.83579 14.6642 1.5 14.25 1.5Z"
                              fill="#52B141"
                           />
                        </svg>
                        <span className="text-black">View Analytics</span>
                     </Link>
                     <button onClick={handleDownload} className="btn bg-white mr-2 mb-2">
                        <svg
                           className="mr-2 scale5"
                           width={14}
                           height={14}
                           viewBox="0 0 20 26"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           {/* SVG for Download PDF button */}
                        </svg>
                        <span className="text-black">Download CSV</span>
                     </button>
                  </div>
                  <div>
                     <Link to="/spendings" className="btn bg-white mr-2">
                        <svg
                           width={20}
                           height={18}
                           viewBox="0 0 20 18"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           {/* SVG for another button */}
                        </svg>
                     </Link>
                     
                  </div>
                  <SpendingDataTable />
               </div>
            </div>
         </div>
      </>
   );
}

export default Spendings;
