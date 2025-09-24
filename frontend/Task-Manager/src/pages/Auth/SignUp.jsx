import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { UserContext } from "../../context/userContext";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError(t("auth.errorFullname"));
      return;
    }

    if (!validateEmail(email)) {
      setError(t("auth.errorEmail"));
      return;
    }

    if (!password) {
      setError(t("auth.errorPass"));
      return;
    }
    setError("");
    // Sign Up API call
    try {
      // Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken,
      });

      const { token, role } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        //Redirect based on role

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(t("auth.errorAuth"));
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text=xl font-semibold text-black">
          {t("auth.createAccount")}
        </h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          {t("auth.joinUs")}
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label={t("auth.fullname")}
              placeholder="John"
              type="text"
            />

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

            <Input
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
              label={t("auth.token")}
              placeholder={t("auth.digitcode")}
              type="text"
            />
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            {t("auth.signUp")}
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            {t("auth.haveAccount")}{" "}
            <Link className="font-medium text-primary underline" to="/login">
              {t("auth.login")}
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
