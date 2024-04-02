import { createSlice } from "@reduxjs/toolkit";
type MemberRole = "member" | "admin"
export type users = {
    id: number;
    userName: string;
    password: string;
    avatar: string;
    email: string;
    emailConfirm: boolean;
    status: boolean;
    createAt: string;
    updateAt: string;
    ipList: string;
    address: string;
    role: MemberRole
}
interface InitState {
    data: users | null,


}
let initialState: InitState = {
    data: null,

}
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        updateaddress: (state, action) => {
            return state.data = state.data?.map((item: any) => {
                if (item.id == action.payload.id) {
                    return { ...item, ...action.payload.data };
                }
                return item;
            });
        }
    }
})
export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;