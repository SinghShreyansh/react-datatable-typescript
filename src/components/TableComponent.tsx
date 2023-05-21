import React, { useState } from 'react';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } from 'react-table';
import Table, { AvatarCell, StatusPill } from './Table'; // new
import moment from 'moment';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2, FiDownloadCloud } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";

interface User {
  name: string;
  email: string;
  title: string;
  department: string;
  status: string;
  role: string;
  age: number;
  lastlogin: string;
  imgUrl: string;
}

interface Column {
  Header: string;
  accessor: string;
  Cell?: any;
  imgAccessor?: string;
  emailAccessor?: string;
}

const TableComponent: React.FC<{ fetchdata: User[] }> = ({ fetchdata }) => {
  const [data, setData] = useState<User[]>([...fetchdata]);

  const columns: Column[] = React.useMemo(() => [
    {
      Header: "Name",
      accessor: 'name',
      Cell: AvatarCell,
      imgAccessor: "imgUrl",
      emailAccessor: "email",
    },
    {
      Header: "Status",
      accessor: 'status',
      Cell: StatusPill,
    },
    {
      Header: "Role",
      accessor: 'role',
    },
    {
      Header: "Last Login",
      accessor: 'lastlogin',
      Cell: ({ value }: { value: string }) => {
        const formattedDate = moment(value).format('LLL'); // Format the date using moment.js
        return <div className='flex flex-col text-left'><span className='text-sm text-left font-medium text-gray-900'>{formattedDate.slice(0, 12)}</span><span className='text-sm text-gray-500'>{formattedDate.slice(12)}</span></div>;
      },
    },
    {
      Header: " ",
      accessor: "email",
      Cell: ({ value }: { value: string }) => {
        const deleteUser = (email: string) => {
          console.log(value)
          setData([...data.filter(user => user.email !== value)]);
          alert(value + " deleted successfully");
        }
        return <div className='flex flex-col text-left'><span className='text-sm text-left font-medium text-gray-900 hover:cursor-pointer' onClick={() => deleteUser(value)}> <RiDeleteBin6Line size={24} color="black" /></span></div>;
      },
    },
    {
      Header: "  ",
      accessor: "imgUrl",
      Cell: ({ value }: { value: string }) => {
        const editUser = (email: string) => {
          let newName = prompt("Enter a new name", "name");
          let newRole = prompt("Enter a new role", "role");
          setData([...data.map(user => {
            if (user.imgUrl === value) {
              console.log("true")
              console.log({ ...user, name: newName, role: newRole })
              return { ...user, name: newName, role: newRole };
            }
            return user;
          })]);
        }
        return <div className='flex flex-col text-left'><span className='text-sm text-left font-medium text-gray-900 hover:cursor-pointer' onClick={() => editUser(value)}><FiEdit2 size={24} color="black" /></span></div>;
      },
    },
  ], []);

  const handleAddUser = () => {
    const name = prompt('Enter the name:');
    const email = prompt('Enter the email:');
    const status = prompt('Enter the status:');
    const role = prompt('Enter the role:');
    const lastlogin = "11 May, 2022";
    const imgUrl = prompt('Enter the imgUrl:');

    if (name && email && role && imgUrl && status) {
      const newUser: User = {
        name,
        email,
        status,
        role,
        lastlogin,
        imgUrl
      };

      setData([...data, newUser]);
    }

    alert(email + " added successfully");
  };

  return (
    <div className=" mx-5 my-5 rounded-lg border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div>
        {/* head of table  */}
        <div className='flex justify-between'>
          <div className="flex flex-col">
            <div className="flex">
              <div className="mb-1 text-medium font-medium text-black dark:text-white">
                Users
              </div>
              <div>
                <span
                  className="mx-3 px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm bg-gray-200 text-green-600"
                >
                  48 Users
                </span>
              </div>
            </div>
            <div className='text-left text-sm text-gray-500'>
              Manage your team members and their account permissions here.
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <button
                className=" rounded-lg border border-gray-300 mx-2 px-4 py-1 flex justify-center items-center text-md font-medium text-gray-500 bg-blueGray-800 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                <FiDownloadCloud size={24} color="gray" ></FiDownloadCloud> <span className='ml-2'>Download CSV</span>
              </button>
              <button
                className=" rounded-lg border border-gray-200 mx-2 px-4 py-1 flex justify-center items-center text-md text-white font-medium bg-blue-400 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={handleAddUser}
              >
                <IoAdd size={32} color="white" ></IoAdd> <span className='ml-2'>Add User</span>
              </button>
            </div>
          </div>
        </div>
        {/* table start */}
        <Table columns={columns} data={data} />
      </div>
    </div>
  )
}

export default TableComponent;
