import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || password.length < 8) {
      setError("Mật khẩu tối thiểu 8 ký tự");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD(token), {
        password,
      });

      alert("Đổi mật khẩu thành công, vui lòng đăng nhập lại");
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Token không hợp lệ");
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] flex flex-col justify-center">
        <h3 className="text-xl font-semibold">Đặt lại mật khẩu</h3>

        <form onSubmit={handleSubmit}>
          <Input
            label="Mật khẩu mới"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button className="btn-primary mt-4" type="submit">
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
