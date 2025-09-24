import React from "react";
import { useTranslation } from "react-i18next";

const CustomTooltip = ({ active, payload }) => {
  const { t } = useTranslation();
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className="text-xs font-semibold text-purple-800 mb-1 ">
          {t(`status.${payload[0].name.replace(" ", "")}`)}
        </p>
        <p className="text-sm text-gray-600">
          {t("common.count")}:{" "}
          <span className="text-sm font-medium text-gray-900">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return <div>CustomTooltip</div>;
};

export default CustomTooltip;
