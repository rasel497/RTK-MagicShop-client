const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: null,
        isLoading: true,
        isLogedIn: false,
        // isAuthenticated: false,
        currentUser: null,
    },
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
            console.log('usrSnlice', action);
        },
        setIsLogedIn: (state) => {
            state.isLoading = false;
            state.isLogedIn = true;
        },
        setIsLogedOut: (state) => {
            state.isLoading = false;
            state.isLogedIn = false;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
            console.log('currentUser', action.payload);
        }

    }
});

export const { setCurrentUser, setUsers, setIsLogedIn, setIsLogedOut } = userSlice.actions;
export default userSlice.reducer;