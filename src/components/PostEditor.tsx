import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

interface PostEditorProps {
  onPost: (content: string, emoji?: string) => void;
  onInteraction?: () => void;
}

export const PostEditor: React.FC<PostEditorProps> = ({
  onPost,
  onInteraction,
}) => {
  const { isAuthenticated } = useAuth();
  const [content, setContent] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState<string>("😊");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (!isAuthenticated && onInteraction) {
      onInteraction();
      return;
    }

    if (content.trim()) {
      onPost(content, selectedEmoji);
      setContent("");
    }
  };

  const handleInputClick = () => {
    if (!isAuthenticated && onInteraction) {
      onInteraction();
    }
  };

  const handleToolbarClick = () => {
    alert("Function not implemented");
  };

  const emojis = ["😊", "😀", "😂", "❤️", "👍", "🎉", "🤔", "😎"];

  return (
    <motion.div
      className="post-card mb-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -2 }}
    >
      {/* Toolbar */}
      <motion.div
        className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="flex items-center space-x-2">
          <motion.select
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onClick={handleToolbarClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <option>Paragraph</option>
          </motion.select>

          <div className="flex items-center">
            <motion.button
              className="toolbar-button"
              onClick={handleToolbarClick}
              title="Bold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="font-bold text-sm">B</span>
            </motion.button>
            <motion.button
              className="toolbar-button"
              onClick={handleToolbarClick}
              title="Italic"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="italic text-sm">I</span>
            </motion.button>
            <motion.button
              className="toolbar-button"
              onClick={handleToolbarClick}
              title="Underline"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="underline text-sm">U</span>
            </motion.button>
          </div>

          <div className="flex items-center ml-2">
            <motion.button
              className="toolbar-button"
              onClick={handleToolbarClick}
              title="Bullet List"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
            <motion.button
              className="toolbar-button"
              onClick={handleToolbarClick}
              title="Numbered List"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
            <motion.button
              className="toolbar-button"
              onClick={handleToolbarClick}
              title="Quote"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
            <motion.button
              className="toolbar-button"
              onClick={handleToolbarClick}
              title="Code"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        <motion.button
          className="p-2 hover:bg-red-50 text-red-500 rounded transition-colors duration-200"
          onClick={handleToolbarClick}
          title="Delete"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      </motion.div>

      {/* Emoji Selector */}
      <motion.div
        className="flex items-center space-x-1 mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {emojis.map((emoji, index) => (
          <motion.button
            key={emoji}
            onClick={() => setSelectedEmoji(emoji)}
            className={`emoji-button ${
              selectedEmoji === emoji ? "selected" : ""
            }`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.2 }}
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            {emoji}
          </motion.button>
        ))}
      </motion.div>

      {/* Content Input */}
      <motion.div
        className="relative mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <motion.textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onClick={handleInputClick}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="How are you feeling today?"
          className="w-full min-h-[100px] p-4 border-none resize-none focus:outline-none text-gray-700 placeholder-gray-400 bg-transparent"
          rows={4}
          animate={{
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
        <AnimatePresence>
          {isFocused && (
            <motion.div
              className="absolute inset-0 rounded-lg ring-2 ring-blue-500 pointer-events-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex items-center justify-between pt-4 border-t border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <div className="flex items-center space-x-2">
          <motion.button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={handleToolbarClick}
            title="Add attachment"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </motion.button>
          <motion.button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={handleToolbarClick}
            title="Add image"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </motion.button>
          <motion.button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={handleToolbarClick}
            title="Add video"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </motion.button>
        </div>

        <motion.button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 text-sm"
          whileHover={content.trim() ? { scale: 1.05, y: -2 } : {}}
          whileTap={content.trim() ? { scale: 0.95 } : {}}
          animate={content.trim() ? { opacity: 1 } : { opacity: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          Publish
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
