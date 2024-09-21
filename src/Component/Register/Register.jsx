import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { registerUser } from "../../RTK/Slices/AuthSlice";
import "./register.css"; // Ensure you have appropriate CSS for RTL support
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPasswordDetails, setShowPasswordDetails] = useState(false);
  const [showConfirmedPasswordDetails, setShowConfirmedPasswordDetails] = useState(false);

  const handleClickShowPassword = () => setShowPasswordDetails((show) => !show);
  const handleClickShowConfirmedPassword = () => setShowConfirmedPasswordDetails((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  // Redirect to home page upon successful registration
  const { token, error } = useSelector((state) => state.auth);

  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const showConfirmPassword = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "الرجاء إدخال عنوان بريد إلكتروني صالح.";
    }
    if (!formData.username) {
      newErrors.username = "الرجاء إدخال اسم المستخدم.";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتين.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Register user
        const response = await dispatch(
          registerUser({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            name:formData.username
          })
        ).unwrap();

        console.log("response:", response);
        // const newUserId = response.user.id; // Ensure that you get the userId from the response
        // console.log("newUserId:", newUserId);

        // Update localStorage with valid userId
        // localStorage.setItem("userId", newUserId);
        // localStorage.setItem(`cart_${newUserId}`, JSON.stringify([])); // Initialize empty cart
        // localStorage.setItem(`favorites_${newUserId}`, JSON.stringify([])); // Initialize empty favorites

        Swal.fire({
          title: "مرحبا!",
          text: `مرحباً، ${formData.username}. تم التسجيل بنجاح.`,
          // icon: "success",
          timer: 1500,
          confirmButtonText: "شكرًا",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        }).then(() => {
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/");
        });
      } catch (error) {
        console.error("Registration error:", error);

        Swal.fire({
          title: "هذا المستخدم موجود بالفعل",
          // icon: "error",
          confirmButtonText: "حاول مرة أخرى",
          customClass: {
            title: "text-danger", // Using customClass for title color
            // font:"28px"
          },
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    } else {
      console.log("فشل التحقق من صحة النموذج");
    }
  };

  useEffect(() => {
    if (token) {
      // Optional: Redirect or perform actions upon successful registration
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "فشل التسجيل",
        text: error.message || "حدث خطأ أثناء التسجيل.",
        icon: "error",
        confirmButtonText: "حاول مرة أخرى",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  }, [error]);

  return (
    <div
      className="register-container"
      style={{
        // marginTop: "73px",
        paddingTop: "20px",
        height: "100vh",
        direction: "rtl", // Set the direction to RTL
      }}
    >
      <div>
        <div className="container register contact-form">
          <h2 style={{ marginBottom: "25px", textAlign: "center", paddingTop: "20px", color: "black" }}>تسجيل حساب جديد</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              {/* Username */}
              <div>
                <TextField style={{ direction: "" }}
                  type="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  id="outlined-basic"
                  className="form-control"
                  placeholder="اسم المستخدم "
                  label="اسم المستخدم "
                  variant="outlined" />
              </div>

              {/* <div className="input-group">
                <i className="fa fa-user" aria-hidden="true"></i>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="اسم المستخدم"
                  className="form-control"
                />
              </div> */}
              {errors.username && <small className="errorMesg">{errors.username}</small>}

              {/* Email */}
              {/* <div className="input-group">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="البريد الإلكتروني"
                  className="form-control"
                />
              </div> */}
              <div>
                <TextField style={{ direction: "" }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="البريد الالكتروني"
                  id="outlined-basic"
                  className="form-control"
                  label="البريد الالكتروني"
                  variant="outlined" />
              </div>
              {errors.email && <small className="errorMesg">{errors.email}</small>}

              {/* Password */}
              {/* <div className="input-group">
                <i className="fa fa-lock" aria-hidden="true"></i>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="كلمة المرور"
                  className="form-control"
                />
                <i
                  className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={showPassword}
                  style={{ cursor: "pointer" }}
                  aria-hidden="true"
                  title={passwordVisible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                ></i>
              </div> */}
              <div>

                <FormControl sx={{ width: '100%' }} variant="outlined" className="form-control">
                  <InputLabel htmlFor="outlined-adornment-password" sx={{ direction: 'rtl' }}>
                    كلمة المرور
                  </InputLabel>
                  <OutlinedInput
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="أدخل كلمة المرور"
                    id="outlined-adornment-password"
                    type={showPasswordDetails ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end" >
                        <IconButton
                          aria-label="إظهار أو إخفاء كلمة المرور"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPasswordDetails ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="كلمة المرور"
                    sx={{ direction: '' }}
                  />
                </FormControl>
              </div>
              {errors.password && <small className="errorMesg">{errors.password}</small>}

              {/* Confirm Password */}
              {/* <div className="input-group">
                <i className="fa fa-lock" aria-hidden="true"></i>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="تأكيد كلمة المرور"
                  className="form-control"
                />
                <i
                  className={`fa ${confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={showConfirmPassword}
                  style={{ cursor: "pointer" }}
                  aria-hidden="true"
                  title={confirmPasswordVisible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                ></i>
              </div> */}

              <div>
                <FormControl sx={{ width: '100%' }} variant="outlined" className="form-control">
                  <InputLabel htmlFor="outlined-adornment-password" sx={{ direction: 'rtl' }}>
                    تاكيد كلمة المرور
                  </InputLabel>
                  <OutlinedInput
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="تاكيد كلمة المرور"
                    id="outlined-adornment-password"
                    type={showConfirmedPasswordDetails ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end" >
                        <IconButton
                          aria-label="إظهار أو إخفاء كلمة المرور"
                          onClick={handleClickShowConfirmedPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showConfirmedPasswordDetails ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label=" تاكيد كلمة المرور "
                    sx={{ direction: '' }}
                  />
                </FormControl>
              </div>
              {errors.confirmPassword && (
                <small className="errorMesg">{errors.confirmPassword}</small>
              )}

              {/* Links */}
              <div className="form-links">
                <small>
                  لديك حساب بالفعل؟{" "}
                  <Link to="/login" style={{ marginLeft: "6px", color: "#242259" }}>
                    تسجيل الدخول
                  </Link>
                </small>
              </div>

              {/* Submit Button */}
              <button
                className="btn text-light text-center"
                style={{ borderRadius: "25px", backgroundColor: "#3b5998", width: "100%", padding: "10px" }}
                type="submit"
              >
                انشاء حساب
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
