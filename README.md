# One2One 💬

One2One is a professional real-time messaging application built with the MERN stack. It features low-latency chat, real-time user presence tracking, and secure media sharing.

## ✨ Features

- **Real-time Messaging**: Instant communication powered by Socket.io.
- **User Presence**: Dynamic "Online" status and "Last Seen" timestamps.
- **Secure Authentication**: JWT-based auth with HTTP-only cookie storage.
- **Image Sharing**: Full integration with Cloudinary for media uploads.
- **Modern UI**: Responsive design built with Tailwind CSS and DaisyUI.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Zustand
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Real-time**: Socket.io
- **Media**: Cloudinary API

## 📦 Getting Started

### Prerequisites
- Node.js installed
- Local MongoDB running on port 27017

### Installation
1. Clone the repository.
2. Inside `/backend`, create a `.env` file with `MONGODB_URI`, `JWT_SECRET`, and Cloudinary credentials.
3. Run `npm install` in both `/frontend` and `/backend` directories.

### Running the App
- **Backend**: `cd backend && npm run dev`
- **Frontend**: `cd frontend && npm run dev`