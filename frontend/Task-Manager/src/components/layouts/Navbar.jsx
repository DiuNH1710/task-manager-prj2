import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { HiOutlineX, HiOutlineMenu } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import moment from "moment"; // <<--- cần import
import "moment/locale/vi";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { t, i18n } = useTranslation();
  const toggleLang = () => {
    const newLang = i18n.language === "en" ? "vi" : "en";
    i18n.changeLanguage(newLang);

    // Set locale cho Moment
    moment.locale(newLang === "vi" ? "vi" : "en-gb");
  };

  return (
    <div className="flex gap-5 items-center justify-between bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          className="block lg:hidden text-black"
          onClick={() => {
            setOpenSideMenu(!openSideMenu);
          }}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>
        <h2 className="text-lg font-medium text-black">{t("app.title")}</h2>
      </div>

      {/* Toggle ngôn ngữ EN/VI */}
      <div className="ml-auto">
        <button className="btn-primary w-auto px-4 py-2" onClick={toggleLang}>
          {i18n.language === "en" ? "VI" : "EN"}
        </button>
      </div>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
