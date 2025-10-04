import React, { useContext, useState } from "react";
import axios from "axios";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import Navbar from "../Components/Navbar";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import api from "../api"; 

const Login = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {setCurrentUser } = useContext(UserContext)

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? "/api/login" : "/api/signup";
      const res = await api.post(url, formdata);

      localStorage.setItem("accessToken", res.data.accessToken);
      setCurrentUser(res.data.user)
      alert(res?.data?.message);
      setFormdata({ name: "", email: "", password: "" });
      navigate('/')


    } catch (error) {
      console.log(error);
      setMessage(error?.response?.data?.message || "Server Error");
    }
  };

  return (
   <div className="relative min-h-screen flex flex-col">
  {/* Background Image with blur */}
  <div
    className="absolute inset-0 bg-cover bg-center filter blur-sm -z-20"
    style={{ backgroundImage: `url(${assets.b7})` }}
  ></div>

  {/* Navbar fixed at top */}
  <div className="w-full fixed top-0 left-0 z-30">
    <Navbar
      logo={assets.logo}
      title={isLogin ? "Login" : "Sign Up"}
      onButtonClick={() => navigate("/")}
      buttonName="Home"
    />
  </div>

  {/* Form Container */}
  <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-36 sm:pt-40 pb-12">
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white/30 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl z-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-magenta-900">
        {isLogin ? "Login" : "Sign Up"}
      </h1>

      <form onSubmit={handleLogin} className="space-y-4">
        {!isLogin && (
          <InputField
            type="text"
            name="name"
            value={formdata.name}
            onChange={handleChange}
            placeholder="Name"
            label="Name"
          />
        )}

        <InputField
          type="email"
          name="email"
          value={formdata.email}
          onChange={handleChange}
          placeholder="Email"
          label="Email"
        />

        <InputField
          type="password"
          name="password"
          value={formdata.password}
          onChange={handleChange}
          placeholder="Password"
          label="Password"
        />

        <Button type="submit" text={isLogin ? "Login" : "Signup"} />
      </form>

      <div className="mt-4 text-center">
        <Button
          onClick={() => setIsLogin(!isLogin)}
          text={isLogin ? "Switch to Signup" : "Switch to Login"}
        />
      </div>

      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  </div>
</div>

  );
};

export default Login;
