import Table from 'components/Table';
import Wrapper from 'components/Wrapper';
import React,{useState} from 'react';
import {connect,useDispatch} from "react-redux"
import { APIPOS } from 'utils/axios';
import { setAPIPOS } from 'utils/axios';
import Cookies from 'js-cookie';
const Cart = ({order}) => {
  
  const [nama,setnama]= useState("Ibu Nani")
  const [phone,setPhone]=useState("081834334335")
  const [note,setNote]= useState("")
  const [paymethod,setPaymethod]=useState("")
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
  const TotalHarga =(data)=>{
      let total = 0
      for(let i = 0;i<=data.length-1;i++){
        total +=data[i].qty * data[i].unitPrice
      }
      return total
  }
  const Submit=()=>{
    const data={
      "user": {
          "name": nama, 
          "phoneNumber": phone
      },
      "priceOrder": TotalHarga(orderDetail),
      "orderName": nama,
      "orderNote": note,
      "paymentMethod": paymethod,
      "orderDetails": orderDetail
  }
  setAPIPOS(`Bearer ${Cookies.get('token')}`);
    APIPOS.post('api/v1/productorders',data)
      .then((res) => {
        if (res?.data) {
          alert('Berhasil ditambahkan');
          window.location.reload();
        }
      })
      .catch((err) =>{
        alert(err.response.data.message)
        console.log(err.response.data)
      });
}
  return (
    <Wrapper title="Cart">
      <div className="text-center w-full">
        <table class="table-fixed ml-40 mr-40 mb-10">
          <thead>
            <tr>
              <th class="w-28 bg-pink-400">Nama barang</th>
              <th class="w-28 bg-pink-400">Harga</th>
              <th class="w-100 bg-pink-400">Jumpah</th>
              <th class="w-1/2 bg-pink-400">Total Harga</th>
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
              {orderDetail.length > 0 ?<tr>
                  <td class="w-1/4 text-center"></td>
                  <td class="w-1/4 text-center"></td>
                  <td class="w-1/4 text-center">TOTAL HARGA</td>
                  <td class="w-1/4 text-center">{TotalHarga(orderDetail)}</td>
              </tr>:null}
          </tbody>
        </table>
      </div>
      <div className="w-full bg-pink-400 text-center">
              <div>
                  <input
                   className="border-0 px-3 py-3 m-5 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-80"
                    type="text"
                    value={nama}
                    onChange={(e)=>setnama(e.target.value)}
                    placeholder="Nama"
                  />
              </div>
              <div>
                  <input
                   className="border-0 px-3 py-3 m-5 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-80"
                    type="text"
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                    placeholder="Wa/Phone"
                  />
              </div>
              <div>
                  <input
                   className="border-0 px-3 py-3 m-5 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-80"
                    type="text"
                    value={note}
                    onChange={(e)=>setNote(e.target.value)}
                    placeholder="Note"
                  />
              </div>
              <div>
                  <select
                    className="border-0 px-3 py-3 m-5 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-80"
                    onChange={(e)=>setPaymethod(e.target.value)}
                  >
                      <option value={"TRANSFERBANK"}>{"TRANSFERBANK"}</option>
                      <option value={"TRANSFERBANK"}>{"VIRTUAL ACCOUNT"}</option>    
                  </select>
              </div>
              <div>
                  <button

                   className="border-0 px-3 py-3 m-5 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-80"
                  onClick={()=>Submit()}
                  >
                      Pesan Sekarang
                  </button>
              </div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    order : state.ProductOrder
  };
};

export default connect(mapStateToProps, {})(Cart)
