import Wrapper from 'components/Wrapper';
import envs from '../envs';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { APIPOS } from 'utils/axios';
import dayjs from 'dayjs';
import ListUsers from 'components/ListUsers';
import ListUserTransaksiDetail from 'components/ListUserTransaksiDetail';
import { useLocation } from 'react-router';

const User = () => {
  const location = useLocation();
  const user = location.state.user || null;

  console.log(user);

  return (
    <div>
      <Wrapper title="Transaksi Customer">
        <div className="p-10">
          <div className="bg-white p-10 rounded-lg shadow-lg">
            <table>
              <tr>
                <td className="px-2 py-1 font-bold">Name</td>
                <td className="px-2 py-1">:</td>
                <td className="px-2 py-1">{user && user.name}</td>
              </tr>
              <tr>
                <td className="px-2 py-1 font-bold">Nomor Telepon</td>
                <td className="px-2 py-1">:</td>
                <td className="px-2 py-1">{user && user.phoneNumber}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="px-10 overflow-scroll">
          {<ListUserTransaksiDetail orders={user.productOrders} />}
        </div>
      </Wrapper>
    </div>
  );
};

export default User;
