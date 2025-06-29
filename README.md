# 🗣️ foo-rum

A modern, responsive social media application built with React, TypeScript, and TailwindCSS. Features a complete authentication flow with feed functionality for sharing posts and interactions.

## ✨ Features

### 🔐 Authentication System

- **Modal Auth Flow**: Sign in/Sign up modals triggered by user interactions
- **Dedicated Auth Pages**: Standalone pages for authentication
- **Demo Accounts**: Pre-configured test accounts for easy testing
- **Form Validation**: Real-time validation with error handling

### 📱 Feed Functionality

- **Rich Post Editor**: Full-featured editor with formatting options and emoji selection
- **Real-time Posts**: New posts appear instantly in the feed
- **Interactive Elements**: Like, comment, and share buttons (with alerts for demo)
- **Responsive Design**: Works seamlessly across desktop and mobile devices

### 🎨 UI/UX Excellence

- **Modern Design**: Clean, intuitive interface matching the provided Figma design
- **Smooth Animations**: Subtle transitions and hover effects
- **TailwindCSS**: Utility-first CSS for maintainable styling
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Tech Stack

- **Frontend**: React 19.1.0 + TypeScript
- **Styling**: TailwindCSS 4.1.11
- **Build Tool**: Vite 7.0.0
- **State Management**: React Context API
- **Icons**: Heroicons (SVG icons)
- **Avatars**: UI Avatars API for dynamic user avatars

## 🏗️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd foo-rum-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🧪 Demo Accounts

Use these pre-configured accounts to test the application:

- **Account 1**: `demo@example.com` / `password123`
- **Account 2**: `test@user.com` / `testpass`

## 📋 Usage Guide

### For Unauthenticated Users

1. Visit the feed page (landing page)
2. Try to interact with posts or the post editor
3. Authentication modal will appear automatically
4. Sign in with demo accounts or create a new account

### For Authenticated Users

1. Create new posts using the rich text editor
2. Select emojis to express your mood
3. Interact with existing posts (buttons show "not implemented" alerts)
4. Your new posts appear at the top of the feed

### Navigation

- **Modal Flow**: Click interactions on feed → Auth modal appears
- **Page Flow**: Use "Sign In" button in header → Dedicated auth page
- **Switching**: Toggle between Sign In/Sign Up easily

## 🏛️ Architecture

### Component Structure

```
src/
├── components/
│   ├── AuthModal.tsx       # Authentication modal component
│   ├── Header.tsx          # Navigation header
│   ├── PostCard.tsx        # Individual post display
│   └── PostEditor.tsx      # Rich text post creation
├── contexts/
│   └── AuthContext.tsx     # Authentication state management
├── constants/
│   └── mockData.ts         # Mock users and posts data
├── types/
│   └── index.ts           # TypeScript type definitions
└── App.tsx                # Main application component
```

### State Management

- **AuthContext**: Manages user authentication state
- **Local State**: Component-level state for UI interactions
- **Mock Data**: Simulated backend with local storage persistence

## 🎯 Key Implementation Details

### Authentication Flow

- Context-based state management for auth
- Mock authentication with predefined user accounts
- Form validation with real-time error feedback
- Seamless modal/page switching

### Feed System

- Dynamic post creation with user-generated content
- Mock social interactions (likes, comments, shares)
- Responsive card layout with proper spacing
- Time-based post sorting (newest first)

### UI Components

- Modular, reusable component architecture
- Consistent design system with TailwindCSS
- Smooth animations and transitions
- Mobile-first responsive design

## 🚧 Future Enhancements

- [ ] Real backend integration
- [ ] Image/video upload support
- [ ] Real-time notifications
- [ ] Dark mode support
- [ ] Advanced text formatting
- [ ] User profiles and settings
- [ ] Comment threading
- [ ] Search functionality

## 📝 Development Notes

### Code Quality

- TypeScript for type safety
- ESLint for code quality
- Modular component architecture
- Consistent naming conventions

### Performance

- Vite for fast development and builds
- Optimized bundle size
- Efficient re-renders with React hooks
- Lazy loading ready

### Maintainability

- Clear separation of concerns
- Documented component interfaces
- Consistent file structure
- Scalable state management

---

Built with ❤️ using React, TypeScript, and TailwindCSS
