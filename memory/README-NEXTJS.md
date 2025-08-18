# Velto Memory MCP Server - Next.js Deployment

This is a Next.js version of the Velto Memory MCP Server, configured for easy deployment to Vercel.

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the Next.js development server:**
   ```bash
   npm run next:dev
   ```

3. **Run the original Express server (for MCP functionality):**
   ```bash
   npm run dev
   ```

### Building for Production

1. **Build the Next.js application:**
   ```bash
   npm run next:build
   ```

2. **Start the production server:**
   ```bash
   npm run next:start
   ```

## 🌐 Available Routes

### Next.js Pages
- `/` - Main landing page
- `/mcp-status` - MCP server status and tools documentation

### API Routes
- `/api/health` - Health check endpoint
- `/api/docs` - API documentation
- `/api/mcp/[...path]` - MCP endpoint (placeholder)

### Original Express API Routes
- `/api/v1/contexts` - Context management
- `/api/v1/projects` - Project management
- `/api/v1/users` - User management
- `/api/v1/search` - Search functionality
- `/api/v1/webhooks` - Webhook management
- `/api/v1/analytics` - Analytics endpoint

## 🚀 Deploy to Vercel

### Option 1: Deploy with Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts to configure your project**

### Option 2: Deploy via GitHub

1. **Push your code to GitHub**

2. **Connect your repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

### Option 3: Deploy with Vercel Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/velto-memory&project-name=velto-memory-mcp&env=MONGODB_URI,GOOGLE_API_KEY,GEMINI_API_KEY&envDescription=Required%20environment%20variables%20for%20Velto%20Memory%20MCP%20Server)

## 🔧 Environment Variables

Make sure to set these environment variables in Vercel:

- `MONGODB_URI` - Your MongoDB connection string
- `GOOGLE_API_KEY` - Google API key for Gemini
- `GEMINI_API_KEY` - Gemini API key (alternative to GOOGLE_API_KEY)

## 📁 Project Structure

```
memory/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── mcp-status/        # MCP status page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── src/                   # Original Express server code
│   ├── api/               # Express API routes
│   ├── ai/                # AI processing
│   ├── mcp/               # MCP server
│   └── services/          # Business logic
├── test/                  # Test files
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── vercel.json            # Vercel deployment config
└── package.json           # Dependencies and scripts
```

## 🔄 MCP Integration

The Next.js app serves as a web interface for the MCP server. The actual MCP functionality runs through the Express server in the `src/` directory.

### Running MCP Server

```bash
# Development
npm run mcp:dev

# Production
npm run mcp:build
npm run mcp:start
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The design is responsive and includes:

- Modern gradient backgrounds
- Card-based layouts
- Responsive navigation
- Professional color scheme

## 📱 Features

- **Responsive Design** - Works on all device sizes
- **MCP Status Page** - View available tools and server status
- **API Documentation** - Built-in API reference
- **Health Checks** - Monitor server status
- **Vercel Optimized** - Configured for optimal Vercel deployment

## 🚀 Deployment Commands

```bash
# Install dependencies
npm install

# Build for production
npm run next:build

# Deploy to Vercel
vercel --prod

# Or use the original Express server
npm run build
npm run start
```

## 🔍 Testing

```bash
# Test Next.js app
npm run next:dev

# Test original functionality
npm run test:ai
npm run test:api
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
