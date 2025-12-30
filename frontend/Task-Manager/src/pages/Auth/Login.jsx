import React, { useContext, useState, useTransition } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import { useTranslation } from "react-i18next";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { t } = useTranslation();

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError(t("auth.errorEmail"));
      return;
    }

    if (!password) {
      setError(t("auth.errorPass"));
      return;
    }
    setError("");
    // Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(t("auth.invalidEmailorPass"));
      } else {
        setError(t("auth.errorAuth"));
      }
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      if (!credentialResponse?.credential) {
        throw new Error("Missing Google credential");
      }

      const payload = {
        credential: credentialResponse.credential,
      };

      if (isAdminLogin) {
        if (!adminInviteToken.trim()) {
          setError("Vui lòng nhập mã admin");
          return;
        }
        payload.adminInviteToken = adminInviteToken.trim(); // tên field nên giống backend
      }

      const response = await axiosInstance.post(
        API_PATHS.AUTH.GOOGLE_LOGIN,
        payload
      );

      const { token, role } = response.data;

      if (!token) {
        throw new Error("Missing token");
      }

      localStorage.setItem("token", token);
      updateUser(response.data);

      navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    } catch (err) {
      console.error("Google login error:", err?.response?.data || err);
      setError(err?.response?.data?.message || t("auth.errorAuth"));
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:f-full flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">
          {t("auth.welcomeBack")}
        </h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          {t("auth.enterDetails")}
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label={t("auth.email")}
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label={t("auth.password")}
            placeholder={t("auth.min8Char")}
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            {t("auth.login")}
          </button>
        </form>

        <div className="mt-3">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={isAdminLogin}
              onChange={(e) => {
                setIsAdminLogin(e.target.checked);
                if (!e.target.checked) {
                  setAdminInviteToken("");
                }
              }}
            />
            Đăng nhập Google với quyền Admin
          </label>
        </div>
        {isAdminLogin && (
          <Input
            value={adminInviteToken}
            onChange={(e) => setAdminInviteToken(e.target.value)}
            label="Admin invite code"
            placeholder="Nhập mã mời admin"
            type="text"
          />
        )}

        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              setError(t("auth.errorAuth"));
            }}
          />
        </div>

        <p className="text-[13px] text-slate-800 mt-3">
          {t("auth.notAccount")}{" "}
          <Link className="font-medium text-primary underline" to="/signup">
            {t("auth.signUp")}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
