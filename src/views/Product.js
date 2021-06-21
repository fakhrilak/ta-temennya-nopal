import React, { useEffect, useState } from 'react';

import Navbar from 'components/Navbar.js';
import Sidebar from 'components/Sidebar.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Wrapper from 'components/Wrapper';
import Card from 'components/Card';
import { APIPOS } from 'utils/axios';
import {connect} from "react-redux"

function Product({search}) {
  const [products,setProduct]=useState([])
  const [filtered, setFiltered] = useState([]);

  useEffect(()=>{
    APIPOS.get('api/v1/products')
      .then((res) =>setProduct(res.data.data.products))
      .catch((err) => console.log(err));
  },[])
  useEffect(()=>{
    setFiltered(
        products.filter((product) =>
          product.productName.toLowerCase().includes(search.toLowerCase())
        ))
  },[search,products])  
  
  return (
    <Wrapper title="Products">
      <div className="px-8 flex flex-wrap">
        {products.length>0 ? filtered.map((data,index)=>(
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

const mapStateToProps = (state) => {
  return {
    search: state.AuthReducer.search
  };
};

export default connect(mapStateToProps, {})(Product);
