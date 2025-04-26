import React from "react";

const page = () => {
  return (
    <div>
      <div>
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default page;
