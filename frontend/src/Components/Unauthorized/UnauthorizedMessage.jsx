import React from "react";
import { Link } from "react-router-dom";

export default function UnauthorizedMessage() {
  return (
    <Link to="/">
      <h1 className="flex items-center justify-center text-4xl font-bold text-darkPrimary ">
        Unauthorized access!
      </h1>
    </Link>
  );
}
