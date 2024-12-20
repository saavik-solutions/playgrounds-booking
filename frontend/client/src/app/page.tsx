"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store"; // Adjust the import path for your store
import { clearAuth } from "@/redux/slices/authSlice";

const RootPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Access auth state from Redux
  const authHeader = useSelector((state: RootState) => state.auth.authHeader);
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  useEffect(() => {
    // Check if user is authenticated
    if (!authHeader) {
      // If not authenticated, navigate to login page
      router.push("/auth/login");
      return;
    }

    // Navigate based on user role
    if (userRole === "admin") {
      router.push("/admin/dashboard");
    } else if (userRole === "user") {
      router.push("/user/dashboard");
    } else {
      // Clear auth if the role is unrecognized and redirect to login
      dispatch(clearAuth());
      router.push("/login");
    }
  }, [authHeader, userRole, dispatch, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg font-semibold text-gray-700">Redirecting...</p>
    </div>
  );
};

export default RootPage;
