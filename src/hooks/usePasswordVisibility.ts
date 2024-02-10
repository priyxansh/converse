"use client";

import { useState } from "react";

/**
 * A hook to toggle the visibility of a password input
 * @returns {Object} - An object containing the state and function to toggle the password visibility
 */
export const usePasswordVisibility = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return { isPasswordVisible, togglePasswordVisibility };
};
