import React, { useEffect, useState } from 'react';

// import { useFormik } from 'formik';
// import * as Yup from 'yup';
import Wrapper from 'components/Wrapper';
import { APIPOS } from 'utils/axios';
import { setAPIPOS } from 'utils/axios';
import Cookies from 'js-cookie';

function ProductAdd() {
  const errorMessage = null;

  const [category, setCategory] = useState([]);
  const [products,setProduct] =useState([]);
  const [productName,setProductname]=useState("")
  const [price,setPrice] = useState("")
  const [weight,setWeight] = useState("")
  const [stock,setStock] = useState("")
  const [unit,setUnit] = useState("")
  const [image,setImage] =useState("")
  const [desk,setDesk] = useState("")
  const [imagepreview,setImagePreview] = useState(null)
  const [categoryId,setCategoryId] = useState("")



  useEffect(() => {
    APIPOS.get('api/v1/categories')
      .then((res) => {
        setCategory(res.data.data.categories);
        console.log(res.data.data.categories)
      })
      .catch((err) => console.log(err));
    
  }, []);

  useEffect(()=>{
    APIPOS.get('api/v1/products')
      .then((res) =>setProduct(res.data.data.products))
      .catch((err) => console.log(err));
  },[])

  let initialValues = {
    categoryName: '',
  };

  const formOnSubmit = (val) => {
    console.log('SUBMIT');
  };

  const onDelet=(data)=>{
    setAPIPOS(`Bearer ${Cookies.get('token')}`);
    APIPOS.delete(`api/v1/products/${data}`)
      .then((res) => {
        if (res?.data) {
          alert('Berhasil dihapus');
          window.location.reload();
        }
      })
      .catch((err) => console.log(err.response));
  }

  const imageUpload=(e)=>{
    const file = e.target.files[0]
    setImage(file)
    console.log(image)
    setImagePreview(URL.createObjectURL(file))
  }

  const submit =(e)=>{
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('categoryId',categoryId)
    formdata.append('productName',productName)
    formdata.append('price',price)
    formdata.append('weight',weight)
    formdata.append('stock',stock)
    formdata.append('unit',unit)
    formdata.append('image',image)
    formdata.append('desc',desk)
    formdata.append('isActive',1)

    setAPIPOS(`Bearer ${Cookies.get('token')}`);
    APIPOS.post('api/v1/products', formdata)
      .then((res) => {
        if (res?.data) {
          alert('Berhasil ditambahkan');
          window.location.reload();
        }
      })
      .catch((err) => console.log(err.response));
    
  }
  return (
    <Wrapper title="Add Product">
      <div className="px-4 md:px-10 mx-auto">
        <form onSubmit={(e)=>submit(e)}>
          <div className="relative w-full mb-3">
            <input
              type="text"
              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
              placeholder="Product Name"
              style={{ transition: 'all .15s ease' }}
              value={productName}
              onChange={(e)=>setProductname(e.target.value)}
            />
            <p className="text-red-500 text-xs"></p>
          </div>
          <div className="relative w-full mb-3">
            <select
              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
              onChange={(e)=>setCategoryId(e.target.value)}
            >
              {category.length > 0 &&
                category.map((cat) => 
                <option value={cat.id}>{cat.categoryName}</option>   
              )}
            </select>

            <p className="text-red-500 text-xs"></p>
          </div>

          <div className="relative w-full mb-3">
            <input
              type="text"
              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
              placeholder="Price"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              style={{ transition: 'all .15s ease' }}
            />
            <p className="text-red-500 text-xs"></p>
          </div>
          <div className="relative w-full mb-3">
            <input
              type="text"
              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
              placeholder="weight"
              style={{ transition: 'all .15s ease' }}
              value={weight}
              onChange={(e)=>setWeight(e.target.value)}
            />
            <p className="text-red-500 text-xs"></p>
          </div>
          <div className="relative w-full mb-3">
            <input
              type="text"
              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
              placeholder="Stock"
              style={{ transition: 'all .15s ease' }}
              value={stock}
              onChange={(e)=>setStock(e.target.value)}
            />
            <p className="text-red-500 text-xs"></p>
          </div>
          <div className="relative w-full mb-3">
            <input
              type="text"
              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
              placeholder="Unit"
              style={{ transition: 'all .15s ease' }}
              value={unit}
              onChange={(e)=>setUnit(e.target.value)}
            />
            <p className="text-red-500 text-xs"></p>
          </div>
          <div className="relative w-full mb-3">
            <input
              type="text"
              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
              placeholder="Desc"
              style={{ transition: 'all .15s ease' }}
              value={desk}
              onChange={(e)=>setDesk(e.target.value)}
            />
            <p className="text-red-500 text-xs"></p>
          </div>
          <div className="relative w-full mb-3">
            <input
              type="file"
              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
              style={{ transition: 'all .15s ease' }}
              onChange={(e)=>imageUpload(e)}
            />
            <p className="text-red-500 text-xs"></p>
          </div>
          <div className="relative w-full mb-3">
            <img src={imagepreview}/>
          </div>
          <div className="text-center mt-6">
            <button
              className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
              type="submit"
              style={{ transition: 'all .15s ease' }}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 px-10">
        <div className="p-10 bg-white shadow-lg rounded-md">
          <table className="w-1/2">
            <thead>
              <tr>
                <th className="text-left pb-4">Product Name</th>
                <th className="pb-4">Stock</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length >0? products.map((data)=>(
                <tr>
                  <td>{data.productName}</td>
                  <td className="text-center">{data.stock}</td>
                  <td className="text-center"
                  onClick={()=>onDelet(data.id)}
                  >Delete</td>
                </tr>
              )):null}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
}

export default ProductAdd;
