
# Task Generator

It generates user stories, engineering tasks, and risks using Google's Gemini AI. Plan your projects faster with AI-powered task generation.

## Tech Stack

**Frontend:**
- React vite
- Tailwind CSS
- JavaScript

**Backend:**
- Node.js
- Express.js
- Google Generative AI (Gemini API)
- dotenv

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key ([get one free here](https://ai.google.dev))


## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Mohandinkar/Task-generator.git
cd Task-generator
```

### 2. Set up Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Set up Frontend

```bash
cd ../frontend
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`