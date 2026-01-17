# SideQuest - Next.js Application

A modern quest management application built with Next.js 16, featuring NextAuth authentication, comprehensive dashboard, quest tracking, and a beautiful responsive UI.

## 🚀 Features

### Core Functionality

- **Landing Page** with 7 engaging sections and modern animations
- **NextAuth Authentication** with secure JWT-based sessions
- **Comprehensive Dashboard** with profile, analytics, and quest management
- **Quest Management** with full CRUD operations and validation
- **Project Tracking** for active quests with progress monitoring
- **Responsive Design** optimized for all devices
- **Dark Mode** support with seamless theme switching
- **Toast Notifications** for user feedback and error handling

### Authentication System (NextAuth v4)

- **NextAuth v4.24.13** with JWT session strategy
- **Secure cookie-based sessions** with HttpOnly and Secure flags
- **Protected routes** with middleware-based authentication
- **Login/Signup functionality** with proper state management
- **Automatic redirects** for unauthenticated users
- **Session management** with `useSession` hook integration

**Demo Credentials:**

- Email: `admin@sidequest.com`
- Password: `sidequest123`

### Dashboard Features

- **Profile Management** with user statistics and achievements
- **Analytics Dashboard** with quest completion metrics
- **Quick Actions** for creating quests and managing projects
- **User Stats** including XP, completed quests, and achievements
- **Achievement System** with progress tracking
- **Navigation** with organized sidebar menu

### Quest Features

- **Browse Quests**: Publicly accessible quest catalog with filtering
- **Quest Details**: Comprehensive quest information display
- **Create Quests**: Protected form with complete validation and error handling
- **Start Quests**: Begin quests and track progress in real-time
- **Quest Properties**: Name, description, difficulty, duration, rewards, XP, tags, popularity, image, and requirements
- **Form Validation**: Real-time validation with comprehensive error messages
- **Success Feedback**: Toast notifications and automatic redirects

### User Interface

- **Modern Design**: Built with Tailwind CSS and DaisyUI components
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Loading States**: Proper loading indicators and skeleton screens
- **Error Handling**: Comprehensive error displays and validation messages
- **Toast Notifications**: Success and error feedback for user actions
- **Framer Motion**: Smooth animations and page transitions
- **Responsive Layout**: Mobile-first design with adaptive components

## 🛠 Technologies Used

### Frontend

- **Next.js 16.1.1** (App Router with Turbopack)
- **React 19.2.3** with modern hooks and patterns
- **NextAuth v4.24.13** (Authentication library)
- **Tailwind CSS 4.1.18** (Styling framework)
- **DaisyUI 5.5.14** (Component library)
- **Framer Motion** (Animation library)
- **React Hot Toast** (Notification system)
- **Lucide React** (Icon library)

### Backend & Database

- **Next.js API Routes** (RESTful endpoints)
- **MongoDB 7.0.0** (Data persistence)
- **NextAuth JWT Strategy** (Secure authentication)
- **Cookie-based Sessions** (HttpOnly, Secure)
- **Middleware Protection** (Route security)

### Development Tools

- **ESLint** (Code linting and formatting)
- **PostCSS** (CSS processing)
- **TypeScript** (Type safety - partial implementation)
- **Git** (Version control)
- **Vercel** (Deployment platform)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Authentication route group
│   │   ├── login/          # User login page
│   │   └── signup/         # User registration page
│   ├── (dashboard)/        # Dashboard route group (protected)
│   │   ├── create-quest/   # Create quest form
│   │   ├── layout.jsx       # Dashboard layout
│   │   ├── page.jsx         # Main dashboard
│   │   ├── profile/        # User profile page
│   │   └── projects/       # User's active quests
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   │   └── [...nextauth]/ # NextAuth configuration
│   │   └── quests/        # Quest management endpoints
│   ├── quests/            # Quest-related pages
│   │   └── [id]/          # Dynamic quest details
│   ├── layout.jsx          # Root layout with providers
│   └── page.jsx           # Landing page
├── components/            # Reusable React components
│   ├── Home/              # Landing page sections
│   ├── Shared/            # Common components (Navbar, Footer, etc.)
│   ├── quests/            # Quest-specific components
│   ├── dashboard/         # Dashboard-specific components
│   └── Providers.jsx      # App providers (SessionProvider, etc.)
├── lib/                  # Utility functions
│   ├── auth.js           # Authentication configuration
│   └── dbConnect.js     # Database connection
├── middleware.ts         # Route protection middleware
└── next.config.js        # Next.js configuration
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
   # Database
   MONGODB_URI=your_mongodb_connection_string
   DB_NAME=sidequest

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_key_here

   # Application
   NODE_ENV=development
   OPENAI_API_KEY=your_openai_api_key_here (optional)
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
- **`/login`** - User authentication (NextAuth)
- **`/signup`** - User registration (NextAuth)

### Protected Pages (Requires Authentication)

- **`/dashboard`** - Main dashboard with analytics and quick actions
- **`/dashboard/create-quest`** - Create new quest form with validation
- **`/dashboard/profile`** - User profile with statistics and achievements
- **`/dashboard/projects`** - User's active quests and progress tracking

### API Endpoints

#### Authentication (NextAuth)

- **`GET/POST /api/auth/[...nextauth]`** - NextAuth configuration and callbacks
- **`POST /api/auth/signup`** - User registration endpoint

#### Quest Management

- **`GET /api/quests`** - Fetch all quests
- **`GET /api/quests/[id]`** - Fetch specific quest
- **`POST /api/quests`** - Create new quest (protected)
- **`POST /api/quests/[id]/start`** - Start a quest (protected)
- **`PUT /api/quests/[id]`** - Update quest (protected)
- **`DELETE /api/quests/[id]`** - Delete quest (protected)

## 🎯 Implemented Features

### Authentication & Security (NextAuth v4)

- ✅ **NextAuth v4.24.13** with JWT session strategy
- ✅ **Secure cookie-based sessions** with HttpOnly and Secure flags
- ✅ **Route protection** with middleware-based authentication
- ✅ **Login/Signup functionality** with proper state management
- ✅ **Automatic redirects** for unauthenticated users
- ✅ **Session management** with `useSession` hook integration
- ✅ **User registration** with email/password validation

### Dashboard & User Management

- ✅ **Comprehensive dashboard** with profile and analytics
- ✅ **User statistics** including XP, completed quests, and achievements
- ✅ **Analytics dashboard** with quest completion metrics
- ✅ **Profile management** with user achievements display
- ✅ **Quick actions** for creating quests and managing projects
- ✅ **Navigation sidebar** with organized menu structure

### Quest Management

- ✅ **Browse quests** with filtering and search functionality
- ✅ **Detailed quest information** display with all properties
- ✅ **Create new quests** with comprehensive form validation
- ✅ **Quest properties**: name, description, difficulty, category, duration, rewards, XP, popularity, tags, image, requirements
- ✅ **Form validation** with real-time feedback and error handling
- ✅ **Success notifications** with toast messages and automatic redirects
- ✅ **Progress tracking** for active quests
- ✅ **Image support** for quest visuals
- ✅ **Tags system** with comma-separated input and display

### User Experience & Interface

- ✅ **Responsive design** for mobile, tablet, and desktop
- ✅ **Dark mode toggle** with system preference detection
- ✅ **Loading states** and skeleton screens for better UX
- ✅ **Form validation** with real-time feedback
- ✅ **Toast notifications** for success/error states
- ✅ **Smooth transitions** and micro-interactions
- ✅ **Framer Motion animations** for page transitions
- ✅ **Accessible markup** with ARIA labels and semantic HTML

### Data Management & API

- ✅ **MongoDB integration** for data persistence
- ✅ **RESTful API design** with proper HTTP methods
- ✅ **Error handling** and validation at API level
- ✅ **Data fetching** with proper loading states
- ✅ **Debug logging** for development and troubleshooting
- ✅ **Database validation** for required fields and data integrity

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
