import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

const Social: React.FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/api/auth/google";
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full"
      >
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
};

export default Social;
