# Velto Landing Page

A modern landing page for Velto - your AI brain that remembers everything you do across every app, AI, and device.

## Features

- **Sticky Header**: Transparent when at the top, glassmorphic when scrolling
- **Early Access Registration**: MongoDB-powered backend for collecting waitlist signups
- **Responsive Design**: Mobile-first approach with modern UI components
- **Interactive Elements**: Animated hero section with neural network visualization

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/velto
   
   # For production, use MongoDB Atlas or similar:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/velto?retryWrites=true&w=majority
   
   # Next.js
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## MongoDB Setup

### Local MongoDB

1. Install MongoDB locally or use Docker:
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. Create the database:
   ```bash
   mongosh
   use velto
   ```

### MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Add it to your `.env.local` file

## API Endpoints

### Early Access Registration

- **POST** `/api/early-access` - Register for early access
- **GET** `/api/early-access` - Get registration count

### Request Body (POST)

```json
{
  "email": "user@example.com",
  "feedback": "Optional feedback about use case",
  "source": "landing-page"
}
```

### Response

```json
{
  "success": true,
  "message": "Successfully registered for early access",
  "id": "64f1a2b3c4d5e6f7g8h9i0j1"
}
```

## Database Schema

### Early Access Collection

```typescript
interface EarlyAccessRegistration {
  _id?: string
  email: string
  feedback?: string
  source?: string
  timestamp: Date
  createdAt: Date
  status: 'waitlist' | 'approved' | 'rejected'
  ipAddress?: string
  userAgent?: string
}
```

## Development

### Project Structure

```
landing/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── early-access/  # Early access endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── ui/                # UI components (shadcn/ui)
│   ├── header.tsx         # Navigation header
│   ├── footer-section.tsx # Footer component
│   ├── hero-section.tsx   # Hero section
│   └── email-popup.tsx    # Early access form
├── lib/                    # Utility functions
│   ├── mongodb.ts         # MongoDB connection
│   └── early-access-service.ts # API service functions
├── types/                  # TypeScript type definitions
│   └── early-access.ts    # Early access types
└── public/                 # Static assets
```

### Key Components

- **Header**: Sticky navigation with scroll-responsive behavior
- **Hero Section**: Interactive neural network visualization
- **Email Popup**: Early access registration form with MongoDB integration
- **Footer**: Simple footer with essential links

## Deployment

### Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary to Velto.
