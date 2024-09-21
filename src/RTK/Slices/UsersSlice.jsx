import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserData=createAsyncThunk('user/fetchUserData',async()=>{
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();
    // console.log(data);
    return data;
})
const users =
  [
    {
      "id": "1",
      "username": "Ali",
      "email": "ali123@gmail.com",
      "password": "123456"
    },
    {
      "id": "2",
      "username": "tifa",
      "email": "tifa44@gmail.com",
      "password": "123456"
    },
    {
      "id": "3",
      "username": "Noha",
      "email": "noha55@gmail.com",
      "password": "123456"
    },
    {
      "id": "4",
      "username": "esra",
      "email": "esra23@gmail.com",
      "password": "123456"
    },
    {
      "id": "5",
      "username": "ahmed",
      "email": "ahmed123@gmail.com",
      "password": "123456"
    },
    {
      "id": "6",
      "username": "Hadeer",
      "email": "hadeer56@gmail.com",
      "password": "111111"
    }
  ]
export const usersSlice=createSlice({
    name:"user",
    initialState:users,
    reducers:{
        add_user:(state,action)=>{
            console.log("action payload ",action.payload);
             state.push({id:state.length+1,...action.payload})
             return state
        },
        get_user:(state,action)=>{
            console.log("action payload " ,action.payload);
            console.log("state ",state);
            const userFound=state.find((user)=>user.email===action.payload.email)
            return userFound
            // return state
        }
    }
    // ,
    // extraReducers:(builder)=>{
    //     builder.addCase(fetchUserData.fulfilled,(state,action)=>{
    //         return action.payload;
    //     })
    // }
})
export const {add_user,get_user}=usersSlice.actions;
export default usersSlice.reducer;