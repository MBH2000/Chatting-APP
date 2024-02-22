import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '@/store'

export interface UserState {
    name: string;
    token: string;
    avatar:string;
    email: string;
    isLoggedIn: boolean;
}
  
const initialState: UserState = {
    name: '',
    token: '',
    avatar:'',
    email: '',
    isLoggedIn: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleIsLoggedIn: (state) => {
            state.isLoggedIn = !state.isLoggedIn;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setAvatar: (state, action: PayloadAction<string>) => {
            state.avatar = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    }
});

export const { toggleIsLoggedIn, setName,setAvatar, setToken,setEmail } = userSlice.actions;

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer;
