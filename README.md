# SideQuest - Next.js Application

A modern quest management application built with Next.js 16, featuring authentication, quest tracking, and a beautiful responsive UI.

## 🚀 Features

### Core Functionality

- **Landing Page** with 7 engaging sections
- **User Authentication** with secure cookie-based login
- **Quest Management** with full CRUD operations
- **Project Tracking** for active quests
- **Responsive Design** optimized for all devices
- **Dark Mode** support with seamless theme switching

### Authentication System

- Mock authentication with hardcoded credentials
- Secure cookie-based session management
- Protected routes with automatic redirects
- Login/logout functionality with proper state management

**Demo Credentials:**

- Email: `admin@sidequest.com`
- Password: `sidequest123`

### Quest Features

- **Browse Quests**: Publicly accessible quest catalog
- **Quest Details**: Comprehensive quest information display
- **Create Quests**: Protected form for adding new quests
- **Start Quests**: Begin quests and track progress
- **Quest Properties**: Name, description, difficulty, duration, rewards, XP, tags, and more

### User Interface

- **Modern Design**: Built with Tailwind CSS and DaisyUI components
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Loading States**: Proper loading indicators and skeleton screens
- **Error Handling**: Comprehensive error displays and validation messages
- **Toast Notifications**: Success and error feedback for user actions

## 🛠 Technologies Used

### Frontend

- **Next.js 16.1.1** (App Router)
- **React 19.2.3**
- **Tailwind CSS 4.1.18**
- **DaisyUI 5.5.14** (Component library)

### Backend & Database

- **Next.js API Routes** (RESTful endpoints)
- **MongoDB 7.0.0** (Data persistence)
- **Cookie-based Authentication** (HttpOnly, Secure)

### Development Tools

- **ESLint** (Code linting)
- **PostCSS** (CSS processing)
- **Git** (Version control)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── quests/        # Quest management endpoints
│   ├── quests/            # Quest-related pages
│   │   ├── [id]/          # Dynamic quest details
│   │   └── create/        # Create quest form
│   ├── projects/          # User's active quests
│   ├── login/             # Authentication page
│   └── about/             # About page
├── components/            # Reusable React components
│   ├── Home/              # Landing page sections
│   ├── Shared/            # Common components (Navbar, etc.)
│   ├── quests/            # Quest-specific components
│   ├── projects/          # Project-specific components
│   └── ui/                # UI utility components
├── contexts/              # React contexts
└── lib/                   # Utility functions
```

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18+
- MongoDB instance (local or cloud)
- Git

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Pritom678/sidequest_next.git
   cd sidequest_next
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   DB_NAME=sidequest
   NODE_ENV=development
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Available Pages & Routes

### Public Pages

- **`/`** - Landing page with hero section and features
- **`/quests`** - Browse all available quests
- **`/quests/[id]`** - View detailed quest information
- **`/about`** - About the application
- **`/login`** - User authentication

### Protected Pages (Requires Login)

- **`/projects`** - User's active quests and projects
- **`/quests/create`** - Create new quest form

### API Endpoints

- **`POST /api/auth/login`** - User authentication
- **`POST /api/auth/logout`** - User logout
- **`GET /api/auth/check`** - Check authentication status
- **`GET /api/quests`** - Fetch all quests
- **`GET /api/quests/[id]`** - Fetch specific quest
- **`POST /api/quests`** - Create new quest (protected)
- **`POST /api/quests/[id]/start`** - Start a quest (protected)

## 🎯 Implemented Features

### Authentication & Security

- ✅ Mock authentication with email/password
- ✅ Secure cookie-based sessions
- ✅ Route protection with middleware
- ✅ Automatic redirects for unauthenticated users
- ✅ Logout functionality

### Quest Management

- ✅ Browse quests with filtering and search
- ✅ Detailed quest information display
- ✅ Create new quests with comprehensive form
- ✅ Quest properties: name, description, difficulty, category, duration, rewards, XP, popularity, tags
- ✅ Image support for quest visuals
- ✅ Progress tracking for active quests

### User Experience

- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Dark mode toggle with system preference detection
- ✅ Loading states and skeleton screens
- ✅ Form validation with real-time feedback
- ✅ Toast notifications for success/error states
- ✅ Smooth transitions and micro-interactions
- ✅ Accessible markup with ARIA labels

### Data Management

- ✅ MongoDB integration for data persistence
- ✅ RESTful API design
- ✅ Error handling and validation
- ✅ Data fetching with proper loading states

## 🎨 UI/UX Highlights

### Design System

- **Color Scheme**: Modern gradient backgrounds with dark mode support
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Consistent design using DaisyUI components
- **Spacing**: Uniform spacing system using Tailwind classes

### Interactive Elements

- **Hover Effects**: Smooth scale and color transitions
- **Loading States**: Animated spinners and skeleton screens
- **Form Validation**: Real-time validation with helpful error messages
- **Navigation**: Sticky navbar with mobile hamburger menu
- **Cards**: Interactive quest cards with hover animations

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 📝 Notes

### Architecture Decisions

- **Next.js API Routes** chosen over Express.js for better integration with Next.js ecosystem
- **MongoDB** used for flexible quest data structure
- **Cookie-based authentication** for secure session management
- **Server Components** leveraged for better performance where applicable

### Future Enhancements

- Real-time quest progress updates
- User profiles and achievements
- Quest categories and advanced filtering
- Social features (sharing, comments)
- Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Next.js and modern web technologies**
