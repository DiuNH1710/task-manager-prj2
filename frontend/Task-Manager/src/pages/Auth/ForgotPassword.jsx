import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { validateEmail } from "../../utils/helper";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Email không hợp lệ");
      return;
    }

    setError("");
    setMessage("");

    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, {
        email,
      });

      setMessage(res.data.message);
    } catch (err) {
      setError(err?.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] flex flex-col justify-center">
        <h3 className="text-xl font-semibold">Quên mật khẩu</h3>
        <p className="text-xs text-slate-700 mt-2 mb-6">
          Nhập email để nhận link đặt lại mật khẩu
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
          />

          {error && <p className="text-red-500 text-xs">{error}</p>}
          {message && <p className="text-green-600 text-xs">{message}</p>}

          <button className="btn-primary mt-4" type="submit">
            Gửi link reset
          </button>
        </form>

        <p className="text-sm mt-4">
          <Link to="/login" className="text-primary underline">
            Quay lại đăng nhập
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
