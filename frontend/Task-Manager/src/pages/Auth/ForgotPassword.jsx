import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { validateEmail } from "../../utils/helper";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError(t("auth.invalidEmail"));
      return;
    }

    setError("");
    setMessage("");

    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, {
        email,
      });

      setMessage(t("auth.resetLinkSent"));
    } catch (err) {
      setError(err?.response?.data?.message || t("common.somethingWentWrong"));
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] flex flex-col justify-center">
        <h3 className="text-xl font-semibold"> {t("auth.forgotPassword")}</h3>
        <p className="text-xs text-slate-700 mt-2 mb-6">
          {t("auth.forgotPasswordDesc")}
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            label={t("auth.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
          />

          {error && <p className="text-red-500 text-xs">{error}</p>}
          {message && <p className="text-green-600 text-xs">{message}</p>}

          <button className="btn-primary mt-4" type="submit">
            {t("auth.sendResetLink")}
          </button>
        </form>

        <p className="text-sm mt-4">
          <Link to="/login" className="text-primary underline">
            {t("auth.backToLogin")}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
