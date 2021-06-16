import Wrapper from 'components/Wrapper';
import envs from '../envs';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { APIPOS } from 'utils/axios';
import dayjs from 'dayjs';
import ListUsers from 'components/ListUsers';
import ListUsersTransaksi from 'components/ListUsersTransaksi';

const User = () => {
  let [users, setUsers] = useState([]);
  let [usersTransaksi, setUsersTransaksi] = useState([]);
  let [type, setType] = useState('listUsers');

  useEffect(() => {
    APIPOS.get('api/v1/users')
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.data.users);
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data.message);
      });

    APIPOS.get('api/v1/productorders/users')
      .then((res) => {
        console.log(res.data);
        setUsersTransaksi(res.data.data.users);
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data.message);
      });
  }, []);

  const handleTransaksiClick = () => {
    setType('transaksiUser');
  };

  console.log(type);

  return (
    <div>
      <Wrapper title="Customers">
        <div className="p-10 overflow-scroll">
          <p className="mb-5 text-right">
            <span
              className="px-5 py-2 bg-purple-300 text-sm rounded-md mr-2 cursor-pointer"
              onClick={() => setType('listUsers')}
            >
              Pelanggan
            </span>
            <span
              className="px-5 py-2 bg-purple-300 text-sm rounded-md mr-2 cursor-pointer"
              onClick={handleTransaksiClick}
            >
              Transaksi Pelanggan
            </span>
            <a
              className="px-5 py-2 bg-purple-300 text-sm rounded-md"
              href={`${envs.URL}api/v1/exports/excel/users`}
            >
              Download Data Pelanggan
            </a>
          </p>

          {type === 'listUsers' && <ListUsers users={users} />}
          {type === 'transaksiUser' && <ListUsersTransaksi users={usersTransaksi} />}
        </div>
      </Wrapper>
    </div>
  );
};

export default User;
