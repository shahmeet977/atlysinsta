import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Post } from "../types";

interface PostCardProps {
  post: Post;
  onInteraction?: () => void;
  index?: number;
}

const PostCardSkeleton: React.FC = () => (
  <div className="post-card mb-4 animate-pulse">
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
    <div className="mb-4">
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
    <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
        <div className="w-4 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
        <div className="w-4 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
        <div className="w-4 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onInteraction,
  index = 0,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Intersection Observer for performance
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: "50px 0px",
  });

  const handleInteraction = () => {
    if (onInteraction) {
      onInteraction();
    } else {
      alert("Function not implemented");
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    handleInteraction();
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const generateFallbackAvatar = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=6b7280&color=fff&size=150`;
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "now";
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    if (diffInMinutes < 1440)
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  // Show skeleton if not in view
  if (!inView) {
    return (
      <div ref={ref}>
        <PostCardSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="post-card mb-4 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      layout
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <motion.div
          className="avatar relative"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-300 rounded-full animate-pulse"></div>
          )}
          <img
            src={
              imageError
                ? generateFallbackAvatar(post.author.name)
                : post.author.avatar
            }
            alt={post.author.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        </motion.div>
        <div className="flex-1">
          <motion.h3
            className="font-semibold text-gray-900 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {post.author.name}
          </motion.h3>
          <motion.p
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {formatTimeAgo(post.timestamp)}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.4 }}
      >
        {post.emoji && (
          <motion.div
            className="mb-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: index * 0.1 + 0.5,
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          >
            <span className="text-2xl">{post.emoji}</span>
          </motion.div>
        )}
        <motion.p
          className="text-gray-700 leading-relaxed text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.6 }}
        >
          {post.content}
        </motion.p>
      </motion.div>

      {/* Actions */}
      <motion.div
        className="flex items-center space-x-6 pt-4 border-t border-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.7 }}
      >
        <motion.button
          onClick={handleLike}
          className={`post-action-button ${isLiked ? "text-red-500" : ""}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <motion.svg
            className="w-5 h-5"
            fill={isLiked ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </motion.svg>
          <span className="text-sm">{post.likes}</span>
        </motion.button>

        <motion.button
          onClick={handleInteraction}
          className="post-action-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="text-sm">{post.comments}</span>
        </motion.button>

        <motion.button
          onClick={handleInteraction}
          className="post-action-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
          <span className="text-sm">{post.shares}</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
