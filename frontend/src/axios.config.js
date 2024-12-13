import axios from "axios";

const baseURL =
  import.meta.env.MODE !== "development"
    ? "http://localhost:8080" // Backend URL for local development
    : "http://educonnect-backend.ap-southeast-1.elasticbeanstalk.com"; // Production backend URL

axios.defaults.baseURL = baseURL;

console.log(`Base URL: ${axios.defaults.baseURL}`);
