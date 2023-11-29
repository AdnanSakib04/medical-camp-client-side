import React, { useContext, useEffect, useState } from "react";
import { useTable } from "react-table";
import { AuthContext } from "../../../providers/AuthProvider";

const ManageCamps = () => {
  const { user } = useContext(AuthContext);
  const [campData, setCampData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/available-camps?email=${user.email}`)
      .then(response => response.json())
      .then(data => {
        setCampData(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [user.email]);

  // Create columns and data for React Table
  const columns = React.useMemo(
    () => [
      {
        Header: "Camp Name",
        accessor: "name", 
      },
      {
        Header: "Scheduled Date and Time",
        accessor: "dateTime",
      },
      {
        Header: "Venue Location",
        accessor: "location", 
      },
      {
        Header: "Specialized Services Provided",
        accessor: "specializedServices", 
      },
      {
        Header: "Healthcare Professionals in Attendance",
        accessor: "healthcareProfessionals",  
      },
      {
        Header: "Target Audience",
        accessor: "audience",
      },
      {
        Header: "Comprehensive Description",
        accessor: "description",
      },
    ],
    []
  );

  const data = React.useMemo(() => campData || [], [campData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="overflow-x-auto">
    <table {...getTableProps()} className="w-full table-auto">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="border p-2" key={column.id}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} className="border p-2" key={cell.column.id}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
};


export default ManageCamps;
