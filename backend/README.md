# Portfolio & Blog API

A RESTful API built with Node.js, Express, and MongoDB for managing a personal portfolio website with blog functionality.

## Live URLs

- **API URL**: [Your deployed API URL here]
- **Frontend URL**: [Your deployed frontend URL here]

## Features

- User authentication with JWT
- Password hashing with bcrypt
- CRUD operations for Projects
- CRUD operations for Blog Posts
- Comments system for blog posts
- Contact form message handling
- Protected routes with authorization
- Security headers with Helmet
- CORS configuration

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- JSON Web Tokens (JWT)
- bcryptjs
- Helmet (security)

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users/register` | Register a new user | Public |
| POST | `/api/users/login` | Login and get JWT token | Public |
| GET | `/api/users/profile` | Get user profile | Private |

### Projects

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all projects | Public |
| GET | `/api/projects/:id` | Get single project | Public |
| POST | `/api/projects` | Create a project | Private |
| PUT | `/api/projects/:id` | Update a project | Private |
| DELETE | `/api/projects/:id` | Delete a project | Private |

### Blog Posts

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog` | Get all blog posts | Public |
| GET | `/api/blog/:id` | Get single post with comments | Public |
| POST | `/api/blog` | Create a blog post | Private |
| PUT | `/api/blog/:id` | Update a blog post | Private (Author only) |
| DELETE | `/api/blog/:id` | Delete a blog post | Private (Author only) |

### Comments

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog/:postId/comments` | Get comments for a post | Public |
| POST | `/api/blog/:postId/comments` | Create a comment | Private |

### Contact

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/contact` | Send a contact message | Public |
| GET | `/api/contact` | Get all messages | Private |

## Installation & Setup

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account

### Local Development

1. Clone the repository:
```bash
git clone [your-repo-url]
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## Data Models

### User
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, minlength: 6)
}
```

### Project
```javascript
{
  title: String (required),
  description: String (required),
  imageUrl: String,
  repoUrl: String,
  liveUrl: String,
  user: ObjectId (ref: User)
}
```

### BlogPost
```javascript
{
  title: String (required),
  content: String (required),
  author: ObjectId (ref: User)
}
```

### Comment
```javascript
{
  body: String (required),
  author: ObjectId (ref: User),
  post: ObjectId (ref: BlogPost)
}
```

### Message
```javascript
{
  name: String (required),
  email: String (required),
  message: String (required)
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected routes:

1. Register or login to get a token
2. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Deployment

This API is designed to be deployed on platforms like Render, Heroku, or Railway.

### Environment Variables for Production

Set the following environment variables on your hosting platform:

- `PORT` (usually auto-set by the platform)
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `JWT_SECRET` - A secure secret key for JWT signing
- `NODE_ENV` - Set to `production`
- `FRONTEND_URL` - Your deployed frontend URL for CORS

## License

ISC
