import React from "react";
import ui_img from "../../assets/images/ui_img.png";
import NavbarAuth from "./NavbarAuth";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <NavbarAuth />
      <div className="flex">
        <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
          {children}
        </div>

        <div className="md:flex w-[40vw] h-screen items-center justify-center">
          <img src={ui_img} className="w-64 lg:w-[90%]" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
