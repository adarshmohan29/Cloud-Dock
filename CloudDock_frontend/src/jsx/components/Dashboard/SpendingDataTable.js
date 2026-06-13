import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SpendingDataTable = () => {
   const [instances, setInstances] = useState([]);
   const [activePage, setActivePage] = useState(0);
   const [perPage] = useState(50);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      try {
         const response = await fetch('http://localhost:3000/api/details/instances');
         const data = await response.json();
         setInstances(data);
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   }

   // Checkbox function
   const checkboxFun = (type) => {
      // Your checkbox logic here
   };

   // Pagination logic
   const onPageChange = (page) => {
      setActivePage(page);
   };

   // Paginate data
   const paginatedInstances = instances.slice(activePage * perPage, (activePage + 1) * perPage);

   // Generate pagination links
   const paginationLinks = [];
   for (let i = 0; i < Math.ceil(instances.length / perPage); i++) {
      paginationLinks.push(
         <Link
            key={i}
            to="/spendings"
            className={`paginate_button ${activePage === i ? "current" : ""}`}
            onClick={() => onPageChange(i)}
         >
            {i + 1}
         </Link>
      );
   }

   return (
      <>
         <div className="table-responsive">
            <div className="dataTables_wrapper no-footer">
               <table
                  id="spendingTable"
                  className="display mb-4 dataTablesCard card-table dataTable no-footer"
                  style={{ width: "100%" }}
               >
                  <thead>
                      <tr role="row">
                         <th
                           className="pr-0 no-data-img all_spending_strg"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-sort="ascending"
                           style={{ width: 32 }}
                        >
                           <div className="custom-control custom-checkbox ml-2">
                              <input
                                 type="checkbox"
                                 onClick={() => checkboxFun("all")}
                                 className="custom-control-input"
                                 id="checkAll"
                                 required
                              />
                              <label
                                 className="custom-control-label"
                                 htmlFor="checkAll"
                              />
                           </div>
                        </th>
                        <th
                           className="sorting"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-label="Ads ID: activate to sort column ascending"
                           style={{ width: 87 }}
                        >
                           Instance ID
                        </th>
                        <th
                           className="sorting"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-label="Date Published: activate to sort column ascending"
                           style={{ width: 124 }}
                        >
                           Instance name
                        </th>
                        <th
                           className="sorting"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-label="Yesterday Spending: activate to sort column ascending"
                           style={{ width: 162 }}
                        >
                          Instance Region
                        </th>
                        <th
                           className="sorting"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-label="Today Spending: activate to sort column ascending"
                           style={{ width: 130 }}
                        >
                           Total Active Hours
                        </th>
                        <th
                           className="sorting"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-label="Total Spending: activate to sort column ascending"
                           style={{ width: 122 }}
                        >
                           Total Spending
                        </th>
                        
                        <th
                           className="sorting"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-label=": activate to sort column ascending"
                           style={{ width: 46 }}
                        />
                        <th
                           className="sorting"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-label=": activate to sort column ascending"
                           style={{ width: 24 }}
                        />
                     </tr>
                  </thead>
                  <tbody>
                     {paginatedInstances.map((instance, index) => (
                        <tr key={index} role="row" className={index % 2 === 0 ? "even" : "odd"}>
                           <td className="pr-0 all_spending_checkbox">
                              <div className="custom-control custom-checkbox ml-2">
                                 <input
                                    type="checkbox"
                                    onClick={() => checkboxFun()}
                                    className="custom-control-input"
                                    id={`customCheckBox${index}`}
                                    required
                                 />
                                 <label
                                    className="custom-control-label"
                                    htmlFor={`customCheckBox${index}`}
                                 />
                              </div>
                           </td>
                           <td>{`#${instance.instanceId}`}</td>
                           <td>{instance.name}</td>
                           <td>{instance.region}</td>
                           <td>{(instance.hoursActive/60).toFixed(3)}</td>
                           <td>${(instance.estimatedCost).toFixed(3)}</td>
                           <td>
   <span className="p-2 rounded border">
      <svg
         width={28}
         height={28}
         viewBox="0 0 28 28"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         style={{ fill: instance.status === "running" ? "#52B141" : "#FF0000" }}
      >
         <path
            d="M7.875 15.75H2.625C2.14175 15.75 1.75 16.1418 1.75 16.625V25.375C1.75 25.8582 2.14175 26.25 2.625 26.25H7.875C8.35825 26.25 8.75 25.8582 8.75 25.375V16.625C8.75 16.1418 8.35825 15.75 7.875 15.75Z"
         />
         <path
            d="M25.375 8.75H20.125C19.6418 8.75 19.25 9.14175 19.25 9.625V25.375C19.25 25.8582 19.6418 26.25 20.125 26.25H25.375C25.8582 26.25 26.25 25.8582 26.25 25.375V9.625C26.25 9.14175 25.8582 8.75 25.375 8.75Z"
         />
         <path
            d="M16.625 1.75H11.375C10.8918 1.75 10.5 2.14175 10.5 2.625V25.375C10.5 25.8582 10.8918 26.25 11.375 26.25H16.625C17.1082 26.25 17.5 25.8582 17.5 25.375V2.625C17.5 2.14175 17.1082 1.75 16.625 1.75Z"
         />
      </svg>
   </span>
</td>

                        </tr>
                     ))}
                  </tbody>
               </table>
               <div className="d-sm-flex text-center justify-content-between align-items-center">
                  <div className="dataTables_info" id="example5_info">
                     Showing {activePage * perPage + 1} to{" "}
                     {instances.length > (activePage + 1) * perPage
                        ? (activePage + 1) * perPage
                        : instances.length}{" "}
                     of {instances.length} entries
                  </div>
                  <div className="dataTables_paginate paging_simple_numbers">
                     <Link
                        to="/spendings"
                        className={`paginate_button previous ${activePage === 0 ? "disabled" : ""}`}
                        aria-controls="example5"
                        onClick={() => activePage > 0 && onPageChange(activePage - 1)}
                     >
                        Previous
                     </Link>
                     <span>
                        {paginationLinks}
                     </span>
                     <Link
                        to="/spendings"
                        className={`paginate_button next ${activePage === Math.ceil(instances.length / perPage) - 1 ? "disabled" : ""}`}
                        onClick={() => activePage < Math.ceil(instances.length / perPage) - 1 && onPageChange(activePage + 1)}
                     >
                        Next
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default SpendingDataTable;
