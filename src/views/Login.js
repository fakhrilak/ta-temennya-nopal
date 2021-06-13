import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';

import { loginAction } from '../redux/actions/authAction';
import { connect } from 'react-redux';

function Login({ login, loading, error, loginAction }) {
  const errorMessage = error?.data?.message ?? null;

  let initialValues = {
    email: '',
    password: '',
  };

  const formOnSubmit = (val) => {
    console.log('SUBMIT');

    loginAction(val);
  };

  let validationSchema = Yup.object({
    email: Yup.string()
      .email('Email tidak valid')
      .required('Email harus diisi')
      .lowercase(),
    password: Yup.string().required('Password harus diisi'),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: formOnSubmit,
    validationSchema,
  });

  const inputOnChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  useEffect(() => {
    const isLogin = Cookies.get('token') && localStorage.getItem('isLogin');

    if (isLogin) {
      window.location.assign('/pos');
    }
  }, [login]);

  console.log('Formik Values', formik.values);
  console.log('Formik errors', formik.errors);

  return (
    <>
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900"
            style={{
              backgroundImage:
                'url(' + require('assets/img/register_bg_2.png').default + ')',
              backgroundSize: '100%',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h3 className="text-gray-600 text-lg font-bold">Login</h3>
                    </div>

                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold"></div>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style={{ transition: 'all .15s ease' }}
                          name="email"
                          onChange={inputOnChange}
                          onBlur={formik.handleBlur}
                        />
                        <p className="text-red-500 text-xs">
                          {formik.errors?.email ?? errorMessage}
                        </p>
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          style={{ transition: 'all .15s ease' }}
                          name="password"
                          onChange={inputOnChange}
                          onBlur={formik.handleBlur}
                        />
                        <p className="text-red-500 text-xs">
                          {formik.errors?.password ?? errorMessage}
                        </p>
                      </div>
                      {loading && (
                        <p className="text-center">Logging in... please wait</p>
                      )}

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: 'all .15s ease' }}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                    <div className="flex flex-wrap mt-6">
                      <div className="text-center mx-auto">
                        <a href="register" className="text-gray-900">
                          <small>Create new account</small>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.AuthReducer.login,
    loading: state.AuthReducer.loading,
    error: state.AuthReducer.error,
  };
};

export default connect(mapStateToProps, { loginAction })(Login);
