import dayjs from 'dayjs';
import React from 'react';
import { moneyFormat } from 'utils/helper';

const ListUserTransaksiDetail = ({ orders }) => {
  return (
    <>
      <table className="w-full table-auto shadow-lg">
        <thead>
          <tr className="bg-gray-800">
            <th className="py-2 text-sm">
              <span className="text-gray-300"></span>
            </th>
            <th className="py-2 text-sm">
              <p className="text-gray-300 text-left">Order</p>
            </th>
            <th className="py-2 text-sm">
              <span className="text-gray-300">Date</span>
            </th>
            <th className="py-2 text-sm">
              <span className="text-gray-300">Note</span>
            </th>

            <th className="py-2 text-sm">
              <span className="text-gray-300">Status</span>
            </th>

            <th className="py-2 text-sm">
              <span className="text-gray-300">Price</span>
            </th>
            <th className="py-2 text-sm">
              <span className="text-gray-300">Pembayaran</span>
            </th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {orders.length > 0 &&
            orders.map((order, index) => (
              <tr key={index} className="bg-white">
                <td className="py-1 px-1">
                  <p className="text-gray-800 font-normal text-center">{index + 1}</p>
                </td>
                <td className="py-1 px-1">
                  <p className="text-gray-800 font-normal text-left ml-2">
                    {order.orderName}
                  </p>
                </td>
                <td className="py-1 px-1">
                  <p className="text-gray-800 font-normal text-center">
                    {dayjs(order.orderDate).format('DD MMMM YYYY')}
                  </p>
                </td>
                <td className="py-1 px-1">
                  <p className="text-gray-800 font-normal text-center">
                    {order.orderNote || '-'}
                  </p>
                </td>

                <td className="py-1 px-1">
                  <p className="text-gray-800 font-normal text-center">
                    {order.orderStatus}
                  </p>
                </td>

                <td className="py-1 px-1">
                  <p className="text-gray-800 font-normal text-center">
                    {moneyFormat(order.priceOrder, 'Rp')}
                  </p>
                </td>
                <td className="py-1 px-1">
                  <p className="text-gray-800 font-normal text-center">
                    {order.paymentMethod}
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ListUserTransaksiDetail;
