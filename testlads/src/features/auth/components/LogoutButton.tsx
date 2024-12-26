"use client"
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
