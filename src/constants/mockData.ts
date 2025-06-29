import type { Post } from "../types";

// Mock user data for demo
export const mockUsers = [
  {
    id: "1",
    email: "demo@example.com",
    username: "demo",
    password: "password123",
  },
  {
    id: "2",
    email: "test@user.com",
    username: "testuser",
    password: "testpass",
  },
];

// Mock posts data
export const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Theresa Webb",
      username: "theresa_webb",
      avatar: "https://ui-avatars.com/api/?name=Theresa+Webb&background=3b82f6&color=fff&size=150",
    },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    emoji: "😊",
    likes: 12,
    comments: 3,
    shares: 1,
  },
  {
    id: "2",
    author: {
      name: "John Doe",
      username: "john_doe",
      avatar: "https://ui-avatars.com/api/?name=John+Doe&background=10b981&color=fff&size=150",
    },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    emoji: "👍",
    likes: 8,
    comments: 2,
    shares: 0,
  },
  {
    id: "3",
    author: {
      name: "Jane Doe",
      username: "jane_doe",
      avatar: "https://ui-avatars.com/api/?name=Jane+Doe&background=f59e0b&color=fff&size=150",
    },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    emoji: "😀",
    likes: 15,
    comments: 5,
    shares: 2,
  },
];
