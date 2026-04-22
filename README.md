# DevOps Portfolio Website

A professional portfolio website for System Administrator & DevOps Engineer, built with React, Node.js, Express, and MongoDB. This application showcases DevOps projects, infrastructure skills, and provides comprehensive contact functionality.

## Features

- **DevOps-Focused Projects**: Realistic infrastructure and automation projects with metrics
- **Cloud & Container Technologies**: Kubernetes, Docker, Terraform, AWS, Azure, GCP
- **Monitoring & Observability**: Prometheus, Grafana, ELK Stack integration
- **CI/CD Pipeline Showcase**: GitLab CI, Jenkins, GitHub Actions examples
- **Security Implementation**: Zero-trust architecture, compliance, and hardening
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Professional theme toggle for better user experience
- **Search & Filter**: Advanced project filtering by technology and category
- **Blog Section**: DevOps tutorials and technical articles
- **Contact Form**: Functional contact form with email notifications
- **Interactive Elements**: Smooth animations, project modals, and micro-interactions

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)
- React Router DOM
- Axios (API calls)
- React Hot Toast (notifications)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- Helmet (security)
- Express Rate Limiting
- Nodemailer (email)
- dotenv (environment variables)

## Project Structure

```
portfolio-app/
|-- backend/
|   |-- models/          # MongoDB models
|   |-- routes/          # API routes
|   |-- server.js        # Express server
|   |-- .env            # Environment variables
|   |-- package.json
|-- frontend/
|   |-- src/
|   |   |-- components/  # React components
|   |   |-- utils/       # Utility functions
|   |   |-- hooks/       # Custom hooks
|   |   |-- App.jsx      # Main App component
|   |   |-- main.jsx     # Entry point
|   |-- public/
|   |-- index.html
|   |-- package.json
|-- README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   
   In the `backend` directory, create a `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   NODE_ENV=development
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

5. **Start MongoDB**
   - If using local MongoDB: `mongod`
   - If using MongoDB Atlas: Update the `MONGODB_URI` in your `.env` file

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a single project
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/category/:category` - Get skills by category
- `POST /api/skills` - Create a new skill
- `PUT /api/skills/:id` - Update a skill
- `DELETE /api/skills/:id` - Delete a skill

### Contact
- `POST /api/contact` - Send a contact message
- `GET /api/contact` - Get all contact messages (admin)
- `PUT /api/contact/:id` - Update message status (admin)
- `DELETE /api/contact/:id` - Delete a message (admin)

### About
- `GET /api/about` - Get about information
- `POST /api/about` - Create about information
- `PUT /api/about/:id` - Update about information

## Email Configuration

To enable email notifications from the contact form:

1. Set up a Gmail account with app passwords enabled
2. Update the email configuration in your `.env` file:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

## Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your preferred platform
3. Update the API URL in environment variables

### Backend (Heroku/Railway/Render)
1. Set environment variables in your hosting platform
2. Deploy the backend
3. Update CORS origin in `server.js`

## Customization

### Personal Information
- Update your personal details in the Hero component
- Modify the About section with your information
- Add your actual projects and skills
- Update contact information and social links

### Styling
- Modify colors in `tailwind.config.js`
- Update fonts and spacing as needed
- Add custom animations with Framer Motion

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions, please open an issue on the repository or contact the developer.
