import Wrapper from "components/Wrapper"
import React,{useState,useEffect} from "react"
import {connect} from "react-redux"
import { APIPOS } from "utils/axios"
import Product from "./Product"

const OrderDetail=({resOrserDetail,product})=>{
    console.log(resOrserDetail)
    const filter=(data1,data2)=>{
        let newData =[]
        for(let a = 0;a<data1.length;a++){
            for(let b = 0;b<data2.length;b++){
                if(parseInt(data1[a].productId)  == parseInt(data2[b].id) ){
                    newData.push({
                        qty:data1[a].qty,
                        unitPrice:data1[a].unitPrice,
                        name:data2[b].productName,
                        image:data2[b].image
                    })
                }
            }
        }
        console.log(newData)
        return newData
    }
    const convert=(qty,unitPrice)=>{
        return `Rp ${qty*unitPrice}` 
    }
    return(
        <Wrapper title="Order Detail" className="m-3">
            <div className="px-8 flex flex-wrap">
                {filter(resOrserDetail,product).map((data)=>(
                        <div className="flex flex-col max-w-xs m-2 bg-white px-8 py-6 rounded-xl space-y-5 items-center shadow-lg">
                            <h3 className="font-serif font-bold text-gray-900 text-xl">{data.name}</h3>
                                <img
                                className="w-full rounded-md h-60"
                                src={"http://dreamtechnology.id/testnode/images/products/"+data.image}
                                alt="motivation"
                                />
                            <p className="self-start">
                                <p className="self-start my-0">Qty: {data.qty}</p>
                                <p className="self-start my-0">Unit Price: {data.unitPrice}</p>
                                <p className="self-start font-bold text-lg"> {convert(data.qty,data.unitPrice)}</p>
                            </p>
                        </div>
                    ))
                }
            </div>
        </Wrapper>
        
    )
}

const mapStateToProps = (state) => {
    return {
      resOrserDetail: state.ProductOrder.ResorderDetails,
      product:state.ProductOrder.product
    };
  };
  
  export default connect(mapStateToProps, {})(OrderDetail);
