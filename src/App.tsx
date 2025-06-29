import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Header } from "./components/Header";
import { PostEditor } from "./components/PostEditor";
import { PostCard } from "./components/PostCard";
import { AuthModal } from "./components/AuthModal";
import { mockPosts } from "./constants/mockData";
import type { Post } from "./types";

type AppMode = "feed" | "signin" | "signup";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  duration: 0.4,
};

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [mode, setMode] = useState<AppMode>("feed");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleCreatePost = (content: string, emoji?: string) => {
    if (!isAuthenticated || !user) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: user.username,
        username: user.username,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.username
        )}&background=6366f1&color=fff`,
      },
      content,
      timestamp: new Date().toISOString(),
      emoji,
      likes: 0,
      comments: 0,
      shares: 0,
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  const handleAuthRequired = () => {
    if (mode === "feed") {
      setShowAuthModal(true);
      setAuthMode("signin");
    }
  };

  const handleSignInClick = () => {
    if (mode === "feed") {
      setShowAuthModal(true);
      setAuthMode("signin");
    } else {
      setMode("signin");
    }
  };

  const handleSignUpClick = () => {
    if (mode === "feed") {
      setShowAuthModal(true);
      setAuthMode("signup");
    } else {
      setMode("signup");
    }
  };

  const handleBackToFeed = () => {
    setMode("feed");
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
  };

  const handleSwitchAuthMode = () => {
    if (showAuthModal) {
      setAuthMode(authMode === "signin" ? "signup" : "signin");
    } else {
      setMode(mode === "signin" ? "signup" : "signin");
    }
  };

  // Feed Page
  if (mode === "feed") {
    return (
      <motion.div
        className="min-h-screen bg-gray-50"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Header
          onSignInClick={handleSignInClick}
          onSignUpClick={handleSignUpClick}
        />

        <motion.main
          className="max-w-2xl mx-auto px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <PostEditor
              onPost={handleCreatePost}
              onInteraction={handleAuthRequired}
            />
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <AnimatePresence>
              {posts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  index={index}
                  onInteraction={
                    isAuthenticated ? undefined : handleAuthRequired
                  }
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.main>

        <AuthModal
          isOpen={showAuthModal}
          mode={authMode}
          onClose={handleCloseModal}
          onSwitchMode={handleSwitchAuthMode}
        />
      </motion.div>
    );
  }

  // Dedicated Auth Pages
  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Header showBackButton onBackClick={handleBackToFeed} />

      <motion.main
        className="flex items-center justify-center px-4 py-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="w-full max-w-md">
          <AuthModal
            isOpen={true}
            mode={mode as "signin" | "signup"}
            onClose={handleBackToFeed}
            onSwitchMode={handleSwitchAuthMode}
          />
        </div>
      </motion.main>
    </motion.div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
