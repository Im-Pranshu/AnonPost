# Anonymous

**Anonymous** is a React-based web application that enables users to post content anonymously, interact through comments and replies, and verify registration via email. Built with Firebase for backend support, this platform offers a secure and private user experience.

## Features

- **Anonymous Posting**: Users can create posts with titles and descriptions without revealing their identity.
- **Real-Time Interaction**: Users can comment on posts and reply to existing comments.
- **Email Verification**: Ensures secure access through email-based account verification.
- **Firebase Integration**: Leveraging Firebase for authentication, Firestore database, and hosting.

## Technologies Used

- **Frontend**: ReactJS, CSS, Vite
- **Backend**: Firebase (Authentication, Firestore, Hosting)
- **Others**: React Router for routing, Remix standard for form handling

## Project Structure
.
├── public
│   ├── index.html
├── src
│   ├── assets
│   │   ├── add-post.png
│   │   ├── hamburger.png
│   │   ├── right-arrow.png
│   │   ├── rocket.png
│   │   └── success.png
│   ├── components
│   │   ├── Button.jsx
│   │   └── Protected.jsx
│   ├── routes
│   │   ├── AccountCreated.jsx
│   │   ├── CreatePost.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Error_page.jsx
│   │   ├── Index.jsx
│   │   ├── PostDescription.jsx
│   │   ├── Posts.jsx
│   │   ├── Root.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   └── VerifyEmail.jsx
│   ├── firebaseConfig.js
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vercel.json
└── vite.config.js


## Installation and Setup

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** and **npm**: Make sure Node.js and npm are installed on your machine. [Download Node.js](https://nodejs.org/)

### Setup Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/Anonymous.git
   cd Anonymous
2. **Install Dependencies**: Install all required dependencies.
   npm install
3. **Firebase Configuration**: This project uses Firebase for backend services like authentication and database. Set up a Firebase project and replace Firebase configuration 
   details in src/firebaseConfig.js if you plan to run this locally. Ensure these details are kept private in production.
4. **Start the Development Server**: Run the project on a local server
   This will start the development server, accessible at http://localhost:3000 or anyother.

### Contributing: 
    Feel free to fork the repository, create a branch, and submit a pull request. Contributions are welcome!

### License
    This project is licensed under the MIT License. See the LICENSE file for details.
