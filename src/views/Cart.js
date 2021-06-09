import Table from 'components/Table';
import Wrapper from 'components/Wrapper';
import React from 'react';
import {connect,useDispatch} from "react-redux"
const Cart = ({order}) => {
  const{orderDetail}= order
  const dispatch = useDispatch()
  const ADD=(id)=>{
    let newData = []
      for(let a = 0;a<=orderDetail.length-1;a++){
        if(orderDetail[a].productId == id){
          orderDetail[a].qty += 1
        }
        newData.push(orderDetail[a])
      }
    dispatch({
      type:"ADD QTY",
      payload: newData
    })
  }
  const REMOVE=(id)=>{
    let newData = []
      for(let a = 0;a<=orderDetail.length-1;a++){
        if(orderDetail[a].productId == id && orderDetail[a].qty != 0){
          orderDetail[a].qty -= 1
        }
        newData.push(orderDetail[a])
      }
    dispatch({
      type:"REMOVE QTY",
      payload: newData
    })
  }
  return (
    <Wrapper title="Cart">
      <div className="p-8">
        <table class="table-fixed">
          <thead>
            <tr>
              <th class="w-1/4 ...">Nama barang</th>
              <th class="w-10 ...">Harga</th>
              <th class="w-700 ...">Jumpah</th>
              <th class="w-1/2 ...">Total Harga</th>
            </tr>
          </thead>
          <tbody>
            {orderDetail.length > 0 ? orderDetail.map((data)=>(
                <tr>
                  <td class="w-1/4 text-center">{data.name}</td>
                  <td class="w-1/4 text-center">{data.unitPrice}</td>
                  <td class="w-1/4 text-center">
                    <button
                    className="w-10 bg-pink-400 m-5"
                    onClick={()=>ADD(data.productId)}
                    >+</button>
                    {data.qty}
                    <button
                    onClick={()=>REMOVE(data.productId)}
                    className="w-10 bg-pink-400 m-5">-</button>
                  </td>
                  <td class="w-1/4 text-center">{data.qty * data.unitPrice}</td>
              </tr>
            )):null}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    order : state.ProductOrder
  };
};

export default connect(mapStateToProps, {})(Cart);
