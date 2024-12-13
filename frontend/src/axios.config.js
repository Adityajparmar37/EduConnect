import axios from "axios";

axios.defaults.baseURL =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3500"
    : "http://educonnect-backend.ap-southeast-1.elasticbeanstalk.com/";
