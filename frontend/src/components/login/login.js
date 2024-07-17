import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const Login = () => {
  const [data, setData] = useState({
    emailOrMobile: "",
    password: ""
  });

  const addData = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { emailOrMobile, password } = data;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[0-9]{10}$/;

    if (emailOrMobile === "") {
      toast.warn("Please Enter Your Email or Mobile Number", { position: "top-center" });
    } else if (isNaN(emailOrMobile) && !emailPattern.test(emailOrMobile)) {
      toast.warn("Please Enter a Valid Email", { position: "top-center" });
    } else if (!isNaN(emailOrMobile) && !mobilePattern.test(emailOrMobile)) {
      toast.warn("Please Enter a Valid 10 Digit Mobile Number", { position: "top-center" });
    } else if (password === "") {
      toast.warn("Please Enter Your Password", { position: "top-center" });
    } else if (password.length < 6) {
      toast.warn("Password must be at least 6 characters", { position: "top-center" });
    } else {
      // Proceed with form submission
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ emailOrMobile, password })
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
        if (data.error) {
          toast.warn(data.error, { position: "top-center" });
        } else {
          toast.warn("Invalid Details", { position: "top-center" });
        }
      } else {
        toast.success("Login Successful", { position: "top-center" });
        console.log("Login Successful");

        setData({
          emailOrMobile: "",
          password: ""
        });
      }
    }
  };

  return (
    <>
      <section>
        <div className="login_container">
          <div className="login_form">
            <iframe
              src="https://giphy.com/embed/2MPs6HoeYBK3AdcNM4"
              className="logo_white"
              title="ShopPlusPlus - Logo"
            ></iframe>
            <form method="POST">
              <h2>Sign-In</h2>
              <div className="login_data">
                <label htmlFor="emailOrMobile">Email / Mobile Number</label>
                <input
                  type="text"
                  onChange={addData}
                  value={data.emailOrMobile}
                  name="emailOrMobile"
                  id="emailOrMobile"
                />
              </div>
              <div className="login_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  onChange={addData}
                  value={data.password}
                  name="password"
                  id="password"
                  placeholder="At least 6 characters..."
                />
              </div>
              <button className="login_btn" onClick={sendData}>
                Login
              </button>
            </form>
          </div>

          <div className="register_info">
            <p>New to ShopPlusPlus?</p>
            <NavLink to="/register">
              <button>Create New Account</button>
            </NavLink>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Login;
