import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Register User
export const registerUser = createAsyncThunk('auth/registerUser', async (userInfo) => {
  const { username, email, name, password } = userInfo;
  console.log("uerInfo ",userInfo)

  // Using FormData for file uploads or complex form submissions
  // var formdata = new FormData();
  // formdata.append("username", username);
  // formdata.append("password", password);
  // formdata.append("name", name);
  // formdata.append("email", email);
  // console.log("formData ",formdata)
  var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
 
  var body={
    username:username,
    password:password,
    name:name,
    email:email
  }
  console.log("body ",body)
 
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body), // Stringify the body like the first code
      redirect: 'follow' // Same behavior as the first code
    };
    console.log("body ",requestOptions.body)
  try {
    const response = await fetch("https://tarmeezacademy.com/api/v1/register", requestOptions);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    const data = await response.json();
    console.log("data ",data)
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('userId', data.user.id);
    return data; // Return data to Redux
  } catch (error) {
    console.error('Error:', error.message);
    throw error; // Pass the error to Redux
  }
});

// Login User
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  const { username, password } = credentials;
  console.log("Credentials ",credentials);
  
  try {
    // Define headers
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    // Define body
    var body = {
      username:username,  // Ensure correct mapping
      password: password
    };

    // Define request options
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body), // Stringify the body like the first code
      redirect: 'follow' // Same behavior as the first code
    };

    // Make the request
    const response = await fetch('https://tarmeezacademy.com/api/v1/login', requestOptions);
    console.log("response ",response);

    if (!response.ok) {
    //   // If the response is not OK, throw an error
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    // Parse the response
    const data = await response.json();

    // Optionally store token and user in localStorage for persistence (same as the first code)
   
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('userId', data.user.id);

    // Return the data for Redux
    return data;

  } catch (error) {
    // Log the error (same as the first code)
    console.error("Login error:", error.message);
    throw error; // Pass the error to Redux for handling
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
    userId: localStorage.getItem('userId') || null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.userId = action.payload.user._id;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.userId = action.payload.user._id;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
