import dayjs from 'dayjs';
import React from 'react';
import { useHistory } from 'react-router';
import { moneyFormat } from 'utils/helper';

const ListUsersTransaksi = ({ users }) => {
  const history = useHistory();

  return (
    <>
      <table className="w-full table-auto">
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
              <span className="text-gray-300">
                Total Order <br />
                <small>(Repeat order)</small>
              </span>
            </th>

            <th className="py-2 text-sm">
              <span className="text-gray-300">
                Total Belanja <br />
                <small>(Rp)</small>
              </span>
            </th>

            <th className="py-2 text-sm">
              <span className="text-gray-300">
                Terakhir <br />
                Belanja
              </span>
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
                  <p
                    className="font-normal text-left ml-2 text-pink-500 cursor-pointer"
                    onClick={() =>
                      history.push({ pathname: '/user-transaksi', state: { user } })
                    }
                  >
                    {user.name} 🔍
                  </p>
                </td>
                <td className="py-1 px-1">
                  <p className="text-gray-800 font-normal text-center">
                    {user.phoneNumber}
                  </p>
                </td>

                <td className="py-1 px-1">
                  <p className="text-gray-800 font-normal text-center">
                    {user.totalOrders}x
                  </p>
                </td>

                <td className="py-1 px-1">
                  <p className="text-gray-800 font-normal text-center">
                    {moneyFormat(user.totalBelanja, 'Rp ')}
                  </p>
                </td>

                <td className="py-1 px-1">
                  <p className="text-gray-800 font-normal text-center">
                    {dayjs(user.productOrders[0].orderDate).format('D MMMM YYYY')}
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ListUsersTransaksi;
