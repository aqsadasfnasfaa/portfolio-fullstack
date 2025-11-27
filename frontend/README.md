# Portfolio Website - Frontend

A modern, responsive React portfolio website with blog functionality, built as a full-stack capstone project.

## Live URLs

- **Frontend URL**: [Your deployed frontend URL here]
- **Backend API URL**: [Your deployed API URL here]

## Features

- Responsive design with Tailwind CSS
- User authentication (Login/Register)
- Public pages: Home, Projects, Blog, Contact
- Protected Admin Dashboard
- CRUD operations for Projects and Blog Posts
- Comment system for blog posts
- Contact form
- Auth-aware navigation

## Tech Stack

- React 18
- Vite
- React Router v6
- Tailwind CSS
- Axios
- Context API for state management

## Pages

### Public Routes
- `/` - Home/About Me page
- `/projects` - Projects gallery
- `/blog` - Blog posts list
- `/blog/:id` - Individual blog post with comments
- `/contact` - Contact form
- `/login` - User login
- `/register` - User registration

### Protected Routes
- `/admin` - Admin Dashboard (requires authentication)

## Installation & Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Local Development

1. Clone the repository:
```bash
git clone [your-repo-url]
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Connecting to Backend

Make sure your backend API is running at the URL specified in `VITE_API_URL`. By default, it expects the API at `http://localhost:5000/api`.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── BlogPostCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Admin.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
└── vite.config.js
```

## Building for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set environment variables:
   - `VITE_API_URL` - Your deployed backend API URL
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the repository in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable: `VITE_API_URL`
6. Deploy

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL (e.g., `https://your-api.onrender.com/api`) |

## Authentication Flow

1. Users register or login via the respective pages
2. Upon successful authentication, a JWT token is stored in localStorage
3. The AuthContext provides user state across the application
4. Protected routes redirect unauthenticated users to login
5. API requests include the JWT token in the Authorization header

## Key Components

### AuthContext
Manages global authentication state including:
- User data
- Login/Register functions
- Logout function
- Authentication status

### ProtectedRoute
A wrapper component that:
- Checks if user is authenticated
- Redirects to login if not authenticated
- Renders children if authenticated

### Admin Dashboard
Allows authenticated users to:
- Create, update, and delete projects
- Create, update, and delete blog posts
- View all existing content

## License

ISC
