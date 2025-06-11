import { createSlice } from "@reduxjs/toolkit";  

const initialState = {
    userData: {},
    isUserAuth: false,
    isAdminAuth: false,
    role:null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            const role = action.payload.role;
            state.role = role;
            state.userData = action.payload;
            if (role === "user") {
                state.isUserAuth = true;
                state.isAdminAuth = false;
                // state.isSellerAuth = false;
              } else if (role === "admin") {
                state.isAdminAuth = true;
                state.isUserAuth = false;
                // state.isSellerAuth = false;
              } 
        },
        clearUser: (state) => {
            state.userData={}
            state.isUserAuth = false;
            state.isAdminAuth = false;
            state.role=null
        },
    },
});


export const { saveUser, clearUser } = userSlice.actions;

export default userSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";


// const userInfoFromStorage = JSON.parse(localStorage.getItem("authUser"));

// const initialState = {
//   user: userInfoFromStorage || null,
//   role: userInfoFromStorage?.role || null,
//   isAuthenticated: !!userInfoFromStorage,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.user = action.payload;
//       state.role = action.payload.role;
//       state.isAuthenticated = true;
//       localStorage.setItem("authUser", JSON.stringify(action.payload));
//     },
//     logout: (state) => {
//       state.user = null;
//       state.role = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem("authUser");
//     },
//   },
// });

// export const { loginSuccess, logout } = userSlice.actions;

// export default userSlice.reducer;
