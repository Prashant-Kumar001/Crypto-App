import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => (
  <div className=" min-h-[73vh] w-full flex items-center justify-center">
    <div className="loader">
      <ClipLoader size={50} color="#3498db" />
    </div>
  </div>
);

export default Loader;
