import { createSlice } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from 'C:/Users/User/Documents/Code Tribe/ACADEMY/hotelapp/src/firebase/firebaseConfig.js';
import { doc, setDoc } from 'firebase/firestore'; // Firestore functions

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;

// Thunk for registering a user and storing user data in Firestore
export const registerUser = (email, password, additionalData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    // Create user with email and password in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user data in Firestore under "User" collection using the user's UID as document ID
    await setDoc(doc(db, "User", user.uid), {
      uid: user.uid,
      email: user.email,
      ...additionalData, // Add any additional user data like name, age, etc.
    });

    // Dispatch login success
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Thunk for logging in a user
export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(loginSuccess(userCredential.user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Thunk for logging out a user
export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
  } catch (error) {
    console.error('Logout error:', error.message);
  }
};
