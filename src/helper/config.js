// config.js
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  backendServer: isProduction
    ? "https://final-project-server-cd99c81ac602.herokuapp.com/" // Backend server address for production
    : "http://localhost:3000", // Backend server address for development
};

export default config;
