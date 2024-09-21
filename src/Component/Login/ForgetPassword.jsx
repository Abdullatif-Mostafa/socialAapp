import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../MainStyle.css";
import img1 from "../../Images/Screenshot 2024-02-07 021040.png";
import "../Animation.css";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
console.log("email ",email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setMessage(""); // Reset success message

    if (email.trim() === "") {
      setError("Please enter your email address");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/Users/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      console.log("response ",data)
      if (response.ok) {
        setMessage(`Password reset link sent to ${email}`);
      } else {
        setError(data.message || "Failed to send password reset link");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container" style={{marginTop:"77px",minHeight:"100vh"}}>
      <div className="row">
        <div className="col-md-6 pt-5 contact-form d-flex justify-content-center m-auto align-items-center">
          <img src={img1} alt="img3" style={{ width: "75%" }} />
        </div>
        <div className="col-md-6 pt-5 contact-form m-auto">
          <h2 className="mb-4">Forgot Password?</h2>
          <p>
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
          {message && <div style={{backgroundColor:"#F2C1B6"}} className="alert">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form className="w-100" onSubmit={handleSubmit}>
            <div className="mb-3 position-relative">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <div className="d-flex p-2 g-5 align-items-center form-control">
                <i
                  className="fa fa-envelope"
                  aria-hidden="true"
                  style={{ marginRight: "10px" }}
                ></i>
                <input
                  type="email" id="email" name="email" value={email} onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  style={{ outline: "none", border: "none", width:"100%", paddingLeft:"5px" }}
                />
              </div>
            </div>
            <button type="submit" className="btn text-light py-2" style={{width:"100%",backgroundColor:"#242259"}}>
              Submit
            </button>
          </form>
          <Link
            to="/login"
            className="mt-4 
            text-decoration-none
            text-black
            d-flex 
            align-items-center 
            justify-content-center
            gap-2
            fs-6
            mb-4
            "
          >
            <i className="fa fa-chevron-left"></i>
            <span style={{ textDecoration: "none", color: "black" }}>
              Back to Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
