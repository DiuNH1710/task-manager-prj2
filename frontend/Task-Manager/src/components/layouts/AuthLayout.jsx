import React from "react";
import ui_img from "../../assets/images/ui_img.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Task Manager</h2>
        {children}
      </div>

      <div className="md:flex w-[40vw] h-screen items-center justify-center">
        <img src={ui_img} className="w-64 lg:w-[90%]" />
      </div>
    </div>
  );
};

export default AuthLayout;
