import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTable } from "react-table";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageCamps = () => {
  const { user } = useContext(AuthContext);
  const [campData, setCampData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/available-camps/${user.email}`)
      .then(response => response.json())
      .then(data => {
        setCampData(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [user.email]);

  const handleDelete = useCallback(
    _id => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then(result => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/delete-camp/${_id}`, {
            method: 'DELETE'
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              if (data.deletedCount > 0) {
                Swal.fire(
                  'Removed!',
                  'Camp has been removed.',
                  'success'
                );
                const remainingCamps = campData.filter(camp => camp._id !== _id);
                setCampData(remainingCamps);
              }
            })
            .catch(error => {
              console.error('Error deleting camp:', error);
              Swal.fire(
                'Error!',
                'An error occurred while removing the camp.',
                'error'
              );
            });
        }
      });
    },
    [campData]
  );

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
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex gap-1">
            <Link to={`/updateBlog/`}>
              <button className="btn bg-green-500 border-none text-white"> Update</button>
            </Link>
            <button
              className="btn bg-red-500 border-none text-white"
              onClick={() => handleDelete(row.original._id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [handleDelete]
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
