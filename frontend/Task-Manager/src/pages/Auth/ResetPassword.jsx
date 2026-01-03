import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || password.length < 8) {
      setError(t("auth.min8Char"));
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD(token), {
        password,
      });

      alert(t("auth.resetPasswordSuccess"));
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || t("auth.invalidOrExpiredToken"));
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] flex flex-col justify-center">
        <h3 className="text-xl font-semibold"> {t("auth.resetPassword")}</h3>

        <form onSubmit={handleSubmit}>
          <Input
            label={t("auth.newPassword")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button className="btn-primary mt-4" type="submit">
            {t("auth.changePassword")}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
