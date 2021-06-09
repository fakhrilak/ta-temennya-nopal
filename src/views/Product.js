import React, { useEffect, useState } from 'react';

import Navbar from 'components/Navbar.js';
import Sidebar from 'components/Sidebar.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Wrapper from 'components/Wrapper';
import Card from 'components/Card';
import { APIPOS } from 'utils/axios';


function Product() {
  const [products,setProduct]=useState([])
  useEffect(()=>{
    APIPOS.get('api/v1/products')
      .then((res) =>setProduct(res.data.data.products))
      .catch((err) => console.log(err));
  },[])
  console.log({
    "productId": 1,
    "unitPrice": 5100,
    "qty": 3,
    "discount": 200
})
  return (
    <Wrapper title="Products">
      <div className="px-8 flex flex-wrap">
        {products.length>0 ? products.map((data,index)=>(
          <Card name={data.productName} 
          stock={data.stock} 
          price={data.price} 
          img={data.image}
          id={data.id}
          />
        )):null}
        
      </div>
    </Wrapper>
  );
}

export default Product;
