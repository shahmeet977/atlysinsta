import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

interface HeaderProps {
  onSignInClick?: () => void;
  onSignUpClick?: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSignInClick,
  onSignUpClick,
  showBackButton,
  onBackClick,
}) => {
  const { isAuthenticated, user, signOut } = useAuth();

  return (
    <motion.header
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <motion.button
                onClick={onBackClick}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Back to home
              </motion.button>
            )}
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <motion.div
                className="header-logo"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-white text-sm font-bold">f</span>
              </motion.div>
              <motion.h1
                className="text-xl font-semibold text-gray-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                foo-rum
              </motion.h1>
            </motion.div>
          </div>

          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <motion.span
                  className="text-gray-700 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Welcome, {user.username}
                </motion.span>
                <motion.button
                  onClick={signOut}
                  className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Sign Out
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {onSignInClick && (
                  <motion.button
                    onClick={onSignInClick}
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Login
                  </motion.button>
                )}
                {onSignUpClick && (
                  <motion.button
                    onClick={onSignUpClick}
                    className="btn-primary text-sm px-4 py-2"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Sign Up
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
