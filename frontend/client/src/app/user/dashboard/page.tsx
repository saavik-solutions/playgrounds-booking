// src/pages/user/dashboard.tsx
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectUserRole } from "@/redux/slices/authSlice";

const UserDashboard: React.FC = () => {
  const role = useAppSelector(selectUserRole);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold">User Dashboard</h1>
      <p className="mt-4 text-lg">Role: {role}</p>
    </div>
  );
};

export default UserDashboard;
