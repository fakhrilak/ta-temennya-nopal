import React, { useEffect, useState } from 'react'
import Wrapper from 'components/Wrapper'
import { APIPOS } from 'utils/axios'
import dayjs from "dayjs"

const Orders = () => {
    const [productOrders,setProductOrders]=useState([])
    useEffect(()=>{
        APIPOS.get("api/v1/productorders")
        .then((res)=>{
            setProductOrders(res.data.data.productOrders)
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
    })

    const converTime=(data)=>{
       return dayjs(data).format("DD MMMM YYYY HH:mm:ss") 
    }
    return (
        <div>
            <Wrapper title="Orders">
                <table class="table-fixed ml-40 mr-40 mb-10">
                    <thead>
                        <tr>
                            <th class="w-28 bg-pink-400">Nama</th>
                            <th class="w-28 bg-pink-400">Paymethod</th>
                            <th class="w-100 bg-pink-400">Note</th>
                            <th class="w-1/2 bg-pink-400">Status</th>
                            <th class="w-100 bg-pink-400">Tanggal</th>
                            <th class="w-1/2 bg-pink-400">Price</th>
                        </tr>
                    </thead>
                        <tbody>
                            {productOrders.length > 0 ? productOrders.map((data)=>(
                                <tr>
                                    <td class="w-1/4 text-center">{data.orderName}</td>
                                    <td class="w-1/4 text-center">{data.paymentMethod}</td>
                                    <td class="w-1/4 text-center">{data.orderNote}</td>
                                    <td class="w-1/4 text-center">{data.orderStatus}</td>
                                    <td class="w-1/4 text-center">{converTime(data.orderDate)}</td>
                                    <td class="w-1/4 text-center">{data.priceOrder}</td>
                                </tr>
                            )):null}
                        </tbody>
                </table>
            </Wrapper>
        </div>
    )
}

export default Orders
