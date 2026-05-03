import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    username: '',
    password: '',
    role: 'User',
    token: ''
}

const userSlice = createSlice({
    name: 'User',
    initialState: initialValue,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username
            state.password = action.payload.password
            state.role = action.payload.role
            state.token = action.payload.token
        },
        clearUser: (state) => {
            state.username = ''
            state.password = ''
            state.role = 'User'
            state.token = ''
        }
    }

})
export const {setUser, clearUser} = userSlice.actions
export default userSlice.reducer