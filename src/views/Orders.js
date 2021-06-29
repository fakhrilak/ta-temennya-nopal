import React, { useEffect, useState } from 'react'
import Wrapper from 'components/Wrapper'
import { APIPOS } from 'utils/axios'
import dayjs from "dayjs"
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

const Orders = ({search}) => {
    const distpatch = useDispatch()
    const [productOrders,setProductOrders]=useState([])
    const [filteredCountries, setFilteredCountries] = useState([]);
    useEffect(()=>{
        APIPOS.get("api/v1/productorders")
        .then((res)=>{
            setProductOrders(res.data.data.productOrders)
            console.log(res.data.data)
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
    },[])

    useEffect(()=>{
        distpatch({
          type:"clearSearch",
        })
      },[])
    
    useEffect(()=>{
        setFilteredCountries(
            productOrders.filter((order) =>
              order.orderName.toLowerCase().includes(search.toLowerCase())
            ))
    },[search,productOrders])  
      
    const converTime=(data)=>{
       return dayjs(data).format("DD MMMM YYYY") 
    }
    const history = useHistory()
    const toOrderDetail=(data)=>{
    
        distpatch({
            type:"RES ORDERS",
            payload:data
        })
        history.push("/detail-order")
    }
    return (
        <div>
            <Wrapper title="Orders">
            <table className="w-full table-auto shadow-lg">
                        <thead>
                        <tr className="bg-gray-800">
                            <th className="py-2 text-sm">
                            <p className="text-gray-300 text-left">Nama</p>
                            </th>
                            <th className="py-2 text-sm">
                            <span className="text-gray-300">Paymethod</span>
                            </th>
                            <th className="py-2 text-sm">
                            <span className="text-gray-300">Note</span>
                            </th>

                            <th className="py-2 text-sm">
                            <span className="text-gray-300">Status</span>
                            </th>

                            <th className="py-2 text-sm">
                            <span className="text-gray-300">Tanggal</span>
                            </th>
                            <th className="py-2 text-sm">
                            <span className="text-gray-300">Price</span>
                            </th>
                        </tr>
                        </thead>        
                        <tbody>
                            {productOrders.length > 0 ? filteredCountries.map((data)=>(
                                <tr onClick={()=>toOrderDetail(data.productOrderDetails)}>
                                    <td className="py-1 px-1">
                                        <p className="text-gray-800 font-normal text-center">{data.orderName}</p>
                                    </td>
                                    <td className="py-1 px-1">
                                        <p className="text-gray-800 font-normal text-center">{data.paymentMethod}</p>
                                    </td>
                                    <td className="py-1 px-1">
                                        <p className="text-gray-800 font-normal text-center">{data.orderNote}</p>
                                    </td>
                                    <td className="py-1 px-1">
                                        <p className="text-gray-800 font-normal text-center">{data.orderStatus}</p>
                                    </td>
                                    <td className="py-1 px-1">
                                        <p className="text-gray-800 font-normal text-center">{converTime(data.orderDate)}</p>
                                    </td>
                                    <td className="py-1 px-1">
                                        <p className="text-gray-800 font-normal text-center">{data.priceOrder}</p>
                                    </td>
                                </tr>
                            )):null}
                        </tbody>
                </table>
            </Wrapper>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      search: state.AuthReducer.search
    };
  };
  
  export default connect(mapStateToProps, {})(Orders);
