import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { loginUser } from "../../RTK/Slices/AuthSlice";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPasswordDetails, setShowPasswordDetails] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPasswordDetails((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const { token, error, loading, userId } = useSelector((state) => state.auth);

  async function handleLogin(newUserId) {
    const oldUserId = localStorage.getItem('userId');

    if (newUserId !== oldUserId) {
      if (oldUserId) {
        localStorage.removeItem(`cart_${oldUserId}`);
        localStorage.removeItem(`favorites_${oldUserId}`);
      }

      localStorage.setItem('userId', newUserId);
    }

    const newCart = JSON.parse(localStorage.getItem(`cart_${newUserId}`)) || [];
    const newFavorites = JSON.parse(localStorage.getItem(`favorites_${newUserId}`)) || [];

    console.log(newCart, newFavorites);
  }

  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !formData.password) {
      newErrors.error = "الرجاء إدخال البريد الإلكتروني وكلمة المرور.";
    } else if (formData.password.length < 6) {
      newErrors.password = "يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "الرجاء إدخال بريد إلكتروني صالح.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({ ...prevData, [name]: value }));
  };
  const login = async() => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json"); // You need to specify the content type
  
    var body = {
      username: "ali12345@gmail.com",
      password: "111111"
    };
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body), // Stringify the body here
      redirect: 'follow'
    };
  
    await fetch("https://tarmeezacademy.com/api/v1/login", requestOptions)
      .then(response => response.json()) // Use .json() if the response is JSON
      .then(result => console.log("result ",result))
      .catch(error => console.log('error', error));
  }
//   const handleLoginData = async (e) => {
//     console.log(" email and password ",formData.email,formData.password);
    
//     e.preventDefault();
//     if (validateForm()) {
//       // setLoading(true);
  
//       const requestOptions = {
//         method: 'POST',
//         headers: {
//           "Accept": "application/json",
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           username: formData.email,
//           password: formData.password
//         })
//       };
// console.log(requestOptions.body)
  
//     // await  fetch("https://tarmeezacademy.com/api/v1/login", requestOptions)
//     //     .then(response => {
//     //       console.log(response);
//     //       if (!response.ok) {
//     //         throw new Error(`HTTP error! status: ${response.status}`);
//     //       }
//     //       return response.json();
//     //     })
//     //     .then(result => {
//     //       if (result.token) {
//     //         // Handle successful login
//     //       } else {
//     //         // setError(result.message || "فشل تسجيل الدخول");
//     //         // setLoading(false);
//     //       }
//     //     })
//     //     .catch(error => {
//     //       console.error('Login Error:', error);
//     //       // setError('فشل تسجيل الدخول');
//     //       // setLoading(false);
//     //     });
//     await fetch("https://tarmeezacademy.com/api/v1/login", requestOptions)
//     .then(response => response.json()) // Use .json() if the response is JSON
//     .then(result => console.log("result ",result))
//     .catch(error => console.log('error', error));
//     }
//   };
  
  useEffect(() => {
    login()
    if (token) {
      const newUserId = localStorage.getItem('userId');
      handleLogin(newUserId);
      Swal.fire({
        title: "تم تسجيل الدخول بنجاح!",
        text: "أهلاً بعودتك!",
        // icon: "success",
        confirmButtonText: "الذهاب إلى الصفحة الرئيسية",
        timer: 1500,
        timerProgressBar: true,
        customClass: {
          popup: 'animated tada',
          title: 'text-success',
          confirmButton: 'btn btn-success',
        },
        backdrop: `rgba(0,123,255,0.4) left top no-repeat`,
        didOpen: () => {
          Swal.showLoading();
        }
      }).then(() => {
        navigate("/");
      });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "فشل تسجيل الدخول",
        // icon: "error",
        confirmButtonText: "حاول مرة أخرى",
        confirmButtonWidth:"100px",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
          popup: 'animated shake',
          title: 'text-danger',
          confirmButton: '#0282f9',
        },
        showDenyButton: true,
        denyButtonText: 'هل نسيت كلمة المرور؟',
        denyButtonColor: '#261F55',
        backdrop: `rgba(0,123,255,0.4) left top no-repeat
        `,

      }).then((result) => {
        if (result.isDenied) {
          navigate('/forgotpassword');
        }
      });
    }
  }, [error]);

  return (
    <div className="login-container" style={{ height: "100vh", width: "100%" }}>
      <div>
        <div className="container login contact-form" style={{}}>
          <h2 style={{ marginBottom: "25px", paddingTop: "30px" }}>تسجيل الدخول</h2>
          <form onSubmit={login}>
            <div className="">
              {/* Email */}
              <div>
                <TextField style={{ direction: "" }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  id="outlined-basic"
                  className="form-control mb-3"
                  label="البريد الالكتروني"
                  variant="outlined" />
              </div>

              {errors.email && (
                <small className="errorMesg">{errors.email}</small>
              )}
              {/* Password */}
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
                          {showPasswordDetails ?<Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="كلمة المرور"
                    sx={{ direction: 'rtl' }}
                  />
                </FormControl>
              </div>
              {errors.password && (
                <small className="errorMesg">{errors.password}</small>
              )}
              {errors.error && (
                <small className="errorMesg">{errors.error}</small>
              )}
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  value="remember"
                  style={{ width: "" }}
                />
                <label style={{ fontSize: "17px" }} htmlFor="remember">
                  تذكرني
                </label>
                <Link
                  style={{
                    fontSize: "17px",
                    marginLeft: "20px",
                  }}
                  to={"/forgotpassword"}
                >
                  هل نسيت كلمة المرور؟
                </Link>
              </div>
              <button
                style={styles.btnn}
                className="btn text-center mt-0"
                type="submit"
                disabled={loading}
              >
                {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
              </button>
              <small style={{ fontSize: "17px" }} className="">
                ليس لديك حساب؟
                <Link to="/register" style={{ marginLeft: "6px" }}>
                  تسجيل
                </Link>
              </small>
            </div>
            <Box
              component="form"
              sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
              noValidate
              autoComplete="off"
            >
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  btnn: {
    borderRadius: "25px",
    backgroundColor: "#3b5998",
    color: "#fff",
  },
};

export default Login;
