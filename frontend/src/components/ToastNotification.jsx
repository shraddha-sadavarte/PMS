import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/toast.css";

const ToastNotification = () => {
  return <ToastContainer position="top-right" autoClose={3000} hideProgressBar />;
};

export default ToastNotification;
