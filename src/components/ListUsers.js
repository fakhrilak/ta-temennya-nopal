import dayjs from 'dayjs';
import React from 'react';

const ListUsers = ({ users }) => {
  return (
    <>
      <table className="w-full table-auto shadow-lg">
        <thead>
          <tr className="bg-gray-800">
            <th className="py-2 text-sm">
              <span className="text-gray-300"></span>
            </th>
            <th className="py-2 text-sm">
              <p className="text-gray-300 text-left">Name</p>
            </th>
            <th className="py-2 text-sm">
              <span className="text-gray-300">Nomor Telepon</span>
            </th>
            <th className="py-2 text-sm">
              <span className="text-gray-300">email</span>
            </th>

            <th className="py-2 text-sm">
              <span className="text-gray-300">Tanggal Daftar</span>
            </th>

            <th className="py-2 text-sm">
              <span className="text-gray-300">Status</span>
            </th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {users.length > 0 &&
            users.map((user, index) => (
              <tr key={index} className="bg-white">
                <td className="py-1 px-1">
                  <p className="text-gray-800 font-normal text-center">{index + 1}</p>
                </td>
                <td className="py-1 px-1">
                  <p className="text-gray-800 font-normal text-left ml-2">{user.name}</p>
                </td>
                <td className="py-1 px-1">
                  <p className="text-gray-800 font-normal text-center">
                    {user.phoneNumber}
                  </p>
                </td>
                <td className="py-1 px-1">
                  <p className="text-gray-800 font-normal text-center">
                    {user.email || '-'}
                  </p>
                </td>

                <td className="py-1 px-1">
                  <p className="text-gray-800 font-normal text-center">
                    {dayjs(user.createdAt).format('DD MMMM YYYY')}
                  </p>
                </td>

                <td className="py-1 px-1">
                  <p className="text-gray-800 font-normal text-center">Status</p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ListUsers;
