// config.js
const isProduction = process.env.NODE_ENV === "production";

//change to process.env.REACT_APP_CURR_ENV

// if testing front-end in development for back-end server connections.

const config = {
  backendServer: isProduction
    ? "https://final-project-server-cd99c81ac602.herokuapp.com" // Backend server address for production
    : "http://192.168.1.79:3000",
  // : "http://localhost:3000", // Backend server address for development
};

export default config;
