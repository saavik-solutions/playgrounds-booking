"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PasswordInput({
  id,
  name,
  value,
  placeholder = "Enter password",
  error,
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`pr-10 ${error ? "border-red-500" : ""}`}
        onChange={onChange} // Call the parent's handleChange
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-gray-500" />
        ) : (
          <Eye className="h-4 w-4 text-gray-500" />
        )}
      </Button>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>} {/* Display validation error */}
    </div>
  );
}
