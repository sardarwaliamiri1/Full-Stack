import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
      currentUser: null,
      isSubmitting: false,
      serverSideError:null,
}

const userSlice = createSlice({
      name: 'user',
      initialState,
      reducers: {
            loginStart: (state) => {
                  state.isSubmitting = true
                  state.serverSideError = null
            },
            loginSuccess: (state, action) => {
                  state.isSubmitting = false
                  state.currentUser = action.payload
                  state.serverSideError = null
            },
            loginFailure: (state, action) => {
                  state.isSubmitting = false
                  state.serverSideError = action.payload
            },
            logout: (state) => {
                  state.currentUser = null
            },
      },})

      export const {loginStart, loginSuccess, loginFailure} = userSlice.actions;
      export default userSlice.reducer