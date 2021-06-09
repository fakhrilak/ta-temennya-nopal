import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Wrapper = (props) => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Navbar title={props.title} />
        {/* Header */}
        <div className="relative md:pt-28 pb-20 pt-12">{props.children}</div>
      </div>
    </>
  );
};

export default Wrapper;
