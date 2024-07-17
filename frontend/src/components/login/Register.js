import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: ""
  });

  const navigate = useNavigate();

  const addData = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, mobile, password, confirm_password } = userData;

    if (!name || !email || !mobile || !password || !confirm_password) {
      toast.warn("Please fill in all fields", { position: "top-center" });
      return;
    }

    if (password !== confirm_password) {
      toast.warn("Passwords do not match", { position: "top-center" });
      return;
    }

    if (password.length < 6) {
      toast.warn("Password must be at least 6 characters", { position: "top-center" });
      return;
    }

    try {
      const response = await fetch("http://localhost:8001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, mobile, password, confirm_password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error) {
          toast.error(errorData.error, { position: "top-center" });
        } else {
          toast.error("Registration failed", { position: "top-center" });
        }
        return;
      }

      const data = await response.json();
      toast.success("Registration successful", { position: "top-center" });
      setUserData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirm_password: ""
      });
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error. Please try again later", { position: "top-center" });
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
              title="ShopPlusPlus - Logo">
            </iframe>
            <form method='POST'>
              <h1>Register</h1>

              <div className="login_data">
                <label htmlFor="name">Your Name</label>
                <input type="text" 
                  onChange={addData}
                  value={userData.name}
                  name="name" id="name"/>
              </div>

              <div className="login_data">
                <label htmlFor="email">Email</label>
                <input type="text" 
                  onChange={addData}
                  value={userData.email}
                  name="email" id="email"/>
              </div>

              <div className="login_data">
                <label htmlFor="number">Mobile</label>
                <input type="text" 
                  onChange={addData}
                  value={userData.mobile}
                  name="mobile" id="mobile"/>
              </div>

              <div className="login_data">
                <label htmlFor="">Password</label>
                <input type="password" 
                  onChange={addData}
                  value={userData.password}
                  name="password" id="password" placeholder='Atleast 6 character...'/>
              </div>

              <div className="login_data">
                <label htmlFor="">Confirm Password</label>
                <input type="password" 
                  onChange={addData}
                  value={userData.confirm_password}
                  name="confirm_password" id="password"/>
              </div>

              <button className='login_btn' onClick={handleSubmit}>Continue</button>
            </form>

            <div className="login_info">
              <p>Already have an account?</p>
              <NavLink to="/login">Sign In</NavLink>
            </div>
          </div>
          <ToastContainer/>
        </div>
      </section>
    </>
  );
}

export default Register;
