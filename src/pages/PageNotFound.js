import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h1>No Page Found</h1>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default PageNotFound;
