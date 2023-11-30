import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet";

const ManageRegisteredCamps = () => {
  const { user } = useContext(AuthContext);
  const [campData, setCampData] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    fetch(`http://localhost:5000/manage-registered-camps/${user.email}`)
      .then(response => response.json())
      .then(data => {
        setCampData(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [user.email]);

  const handleConfirm = useCallback(
    async (_id) => {
      const confirmation = await Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to confirm",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, confirm it!'
      });
  
      if (confirmation.isConfirmed) {
        try {
          const updateStatus = {
            confirmationStatus: 'Confirmed',
          };
          
          // Update the confirmation status on the payment history
          const res2 = await axiosPublic.patch(`/payment-history-status/${_id}`, updateStatus);
          console.log('Confirmation status updated on payment history:', res2.data.message);

          // Update the confirmation status
          const res = await axiosPublic.patch(`/registered-camp-organizer/${_id}`, updateStatus);
          console.log('Confirmation status updated:', res.data.message);
  
          // Assuming campData is a state you use to render your table
          const updatedCamps = campData.map((camp) =>
            camp._id === _id ? { ...camp, confirmationStatus: 'Confirmed' } : camp
          );
          setCampData(updatedCamps);
  
          Swal.fire({
            title: 'Confirmed!',
            text: 'Registration Confirmed.',
            icon: 'success'
          });
        } catch (error) {
          console.error('Error updating confirmation status:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while updating confirmation status.',
            icon: 'error'
          });
        }
      }
    },
    [campData]
  );
  
  const handleCancel = useCallback(
    async (_id) => {
      const confirmation = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, cancel it!'
      });
  
      if (confirmation.isConfirmed) {
        try {
          const updateStatus = {
            confirmationStatus: 'Cancelled',
          };
          
          // Update the confirmation status on the payment history
          const res2 = await axiosPublic.patch(`/payment-history-status/${_id}`, updateStatus);
          console.log('Confirmation status updated on payment history:', res2.data.message);

          // Update the confirmation status
          const res = await axiosPublic.patch(`/registered-camp-organizer/${_id}`, updateStatus);
          console.log('Confirmation status updated:', res.data.message);
  
          // Assuming campData is a state you use to render your table
          const updatedCamps = campData.map((camp) =>
            camp._id === _id ? { ...camp, confirmationStatus: 'Cancelled' } : camp
          );
          setCampData(updatedCamps);
  
          Swal.fire({
            title: 'Cancelled!',
            text: 'Registration Cancelled.',
            icon: 'success'
          });
        } catch (error) {
          console.error('Error updating confirmation status:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while updating confirmation status.',
            icon: 'error'
          });
        }
      }
    },
    [campData]
  );
  
  // Create columns and data for React Table
  const columns = React.useMemo(
    () => [
      {
        Header: "Camp Name",
        accessor: "campName", 
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
        Header: "Camp Fees",
        accessor: "fees", 
      },     
      {
        Header: "Payment Status",
        accessor: "paymentStatus", 
      },     
      {
        Header: "Confirmation Status",
        accessor: "confirmationStatus", 
      },     
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex gap-1">
          
             {row.original.paymentStatus === 'Paid' && row.original.confirmationStatus === 'Pending' &&
              <button className="btn bg-green-500 border-none text-white"
              onClick={() => handleConfirm(row.original._id)}
              > Pending</button>
             }
            
            { row.original.paymentStatus === 'Unpaid'  && row.original.confirmationStatus === 'Pending' &&
              <button
              className="btn bg-red-500 border-none text-white"
              onClick={() => handleCancel(row.original._id)}
            >
              Cancel
            </button>
            }
          </div>
        ),
      },
    ],
    [handleCancel]
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
    <div>
      <Helmet>
        <title>Care Sync | Manage Registered Camp</title>
      </Helmet>
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
    </div>
);
};





export default ManageRegisteredCamps;