import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state, action) => {
            state.currentUser = action.payload
            localStorage.setItem("token", action.payload.token)
        },
        signOut: (state) => {
            state.currentUser = null
            localStorage.removeItem("token")
        }
    }
})

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;