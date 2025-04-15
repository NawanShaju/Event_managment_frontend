# Event Management System – Frontend

This is the frontend of the Event Management System, built with React.js and styled using Tailwind CSS. It interacts with the Flask-based backend to allow users to register, log in, browse and RSVP to events. Admin users can create and manage events.

Features

JWT-based authentication
User registration & login
Event listing and detail pages
RSVP to events
Admin-only event creation
Client-side form validation
Responsive design with Tailwind CSS
Redux/Context API for state management

Tech Stack

React.js
React Router DOM
Axios
Tailwind CSS
Vite / Create React App (based on your setup)
Redux / Context API (for global state)
JWT for auth

Setup Instructions

1. Clone the repository
git clone https://github.com/yourusername/event-management.git
cd event-management/frontend

Install dependencies
npm install

Run the development server

npm run dev   # for Vite
# OR
npm start     

Directory Structure

frontend/
│
├── src/
│   ├── components/        # Reusable components (EventCard, Navbar, etc.)
│   ├── pages/             # Route-specific pages (Login, Register, Events, etc.)
│   ├── context/ or store/ # Auth/State management (if used)
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── ...
│
├── public/
├── tailwind.config.js
├── vite.config.js or package.json
└── .env

Main Pages

Route	       Description	                    Access
/login	       Login form	                    Public
/register	   Registration form                Public
/events	       View all events	                Public
/events/:id	   View event details, RSVP option	Authenticated
/create-event  Admin-only event creation form	Admin
/dashboard	   Optional user dashboard	        Authenticated

Notes on Implementation

All authenticated requests send JWT from localStorage via the Authorization: Bearer <token> header.
Axios is used for all API calls.
Tailwind CSS handles layout and styling with responsive utility classes.
Route protection is handled via wrappers like PrivateRoute or inline logic in components.
Form error handling includes backend validation feedback and frontend required fields.

Future Improvements

Add toast notifications using something like react-toastify
Add loading spinners and skeleton screens
Paginate event listings
Allow users to cancel RSVPs
Build an admin dashboard to manage events and users

Backend Integration

Make sure the backend is running and CORS is properly configured to allow requests from http://localhost:3000.