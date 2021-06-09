import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Wrapper from 'components/Wrapper';
import { APIPOS } from 'utils/axios';
import { setAPIPOS } from 'utils/axios';
import Cookies from 'js-cookie';

export default function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    APIPOS.get('api/v1/categories')
      .then((res) => setCategories(res.data.data.categories))
      .catch((err) => console.log(err));
  }, []);

  const errorMessage = null;

  let initialValues = {
    categoryName: '',
  };

  const handleDelete = (e) => {
    const id = e.target.dataset.id;

    setAPIPOS(`Bearer ${Cookies.get('token')}`);
    APIPOS.delete(`api/v1/categories/${id}`)
      .then((res) => {
        if (res?.data) {
          alert('Berhasil dihapus');
          window.location.reload();
        }
      })
      .catch((err) => console.log(err.response));
  };

  const formOnSubmit = (val) => {
    console.log('SUBMIT');

    setAPIPOS(`Bearer ${Cookies.get('token')}`);
    APIPOS.post('api/v1/categories', val)
      .then((res) => {
        if (res?.data) {
          alert('Berhasil ditambahkan');
          window.location.reload();
        }
      })
      .catch((err) => console.log(err.response));
  };

  let validationSchema = Yup.object({
    categoryName: Yup.string().required('categoryName harus diisi'),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: formOnSubmit,
    validationSchema,
  });

  const inputOnChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  console.log('Formik Values', formik.values);
  console.log('Formik errors', formik.errors);
  console.log(categories);

  return (
    <Wrapper title="Category">
      <div className="px-4 md:px-10 mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <div className="relative w-full mb-3">
            <input
              type="categoryName"
              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
              placeholder="Category Name"
              style={{ transition: 'all .15s ease' }}
              name="categoryName"
              onChange={inputOnChange}
              onBlur={formik.handleBlur}
            />
            <p className="text-red-500 text-xs">
              {formik.errors?.categoryName ?? errorMessage}
            </p>
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
              type="submit"
              style={{ transition: 'all .15s ease' }}
            >
              Add Category
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 px-10">
        <div className="p-10 bg-white shadow-lg rounded-md">
          <table className="w-1/2">
            <thead>
              <tr>
                <th className="text-left pb-4">Category Name</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 &&
                categories.map((cat) => (
                  <tr>
                    <td>{cat.categoryName}</td>
                    <td className="text-center">
                      <button
                        data-id={cat.id}
                        className="bg-pink-500 px-3 py-1 my-1 text-white"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
}
