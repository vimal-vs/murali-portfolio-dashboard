import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/reusable/Button";
import Input from "../components/reusable/Input";
import LoginLayout from "../components/layouts/LoginLayout";
import AuthServices from "../services/AuthServices";
import { message } from "antd";
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrors(prev => ({ ...prev, email: "This is required" }));
      return;
    } else {
      setErrors(prev => ({ ...prev, email: "" }));
    }

    if (!password) {
      setErrors(prev => ({ ...prev, password: "This is required" }));
      return;
    } else {
      setErrors(prev => ({ ...prev, password: "" }));
    }
    setLoading(true);
    const response = await AuthServices.login(email, password);
    if (response.status === 200) {
      setLoading(false);
      message.success("Login successful!");
      Cookies.set('token', response.data.token, {
        expires: 1, // Example: token expiry in days
        path: '/', // Example: cookie path
        // secure: true, // Ensure cookie is only sent over HTTPS
        // sameSite: 'strict', // Mitigate CSRF attacks by ensuring cookies are sent only to the same site
        // httpOnly: true, // Prevent client-side JavaScript from accessing the cookie);
      });
      navigate("/");
    }
    else {
      message.error(response.data.error);
      setLoading(false)
    }
  };

  function handleOnChange(field, value) {
    if (field === "email") {
      setEmail(value);
    }

    if (field === "password") {
      setPassword(value);
    }
  }

  return (
    <LoginLayout title={"Hello Again !"} text={"Please enter your details"}>
      <form className="flex flex-col px-6 lg:px-0 gap-6 justify-center items-center w-full lg:w-[400px]" onSubmit={handleSignIn}>
        <Input
          label={"Email"}
          placeholder={"Enter your email address"}
          value={email}
          onChange={(e) => handleOnChange("email", e.target.value)}
          error={errors.email}
        />
        <Input
          label={"Password"}
          placeholder={"Enter your password"}
          type={"password"}
          value={password}
          onChange={(e) => handleOnChange("password", e.target.value)}
          error={errors.password}
        />
        <div className="w-full mt-2">
          <Button type={"submit"} loading={loading} text="Sign in" />
        </div>
      </form>
    </LoginLayout>
  );
}
