import { useState, useEffect } from "react";
import axios from "axios";

function Hello() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [greetName, setGreetName] = useState(""); // State for the greeting message
  const [loading, setLoading] = useState(false); // State for the loading indicator

  const baseUrl = import.meta.env.VITE_BASE_URL; // Access base URL from environment variable

  // Reset form values on component mount
  useEffect(() => {
    setName("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous error message
    setError("");
    setGreetName(""); // Clear the previous greeting message
    setLoading(true); // Show the loading indicator

    if (!name) {
      setError("Please enter a name.");
      setLoading(false); // Stop loading
      return;
    }

    axios
      .post(`${baseUrl}/hello`, { name })
      .then((response) => {
        const result = response.data;
        if (result.message === `Hello, ${name}!`) {
          setGreetName(result.message); // Set the greeting message
          setName(""); // Reset the input field
        } else {
          setError(result.message); // Display server message as error
        }
      })
      .catch((err) => {
        console.log(err);

        // Handle different error scenarios
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else if (err.request) {
          setError("Network Error: Please try again later");
        } else {
          setError("An unexpected error occurred");
        }
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-yellow-600 min-h-screen w-screen overflow-hidden">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md mx-2">
        {/* Display the error message if it exists */}
        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Display the greeting message if it exists */}
        {greetName && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 flex items-center justify-between"
            role="alert"
          >
            <span>{greetName}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div className="relative">
              {/* Input field with icon */}
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.828 10.172a4 4 0 010 5.656m-3.656-5.656a4 4 0 010 5.656m5.656-7.778a6 6 0 000 8.486m-8.486 0a6 6 0 000-8.486"
                  />
                </svg>
              </span>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                autoComplete="off"
                name="name"
                className="w-full pl-10 pr-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name} // Bind to the correct state
                onKeyDown={(e) => {
                  if (e.key === " ") {
                    e.preventDefault(); // Prevent the space key from working
                  }
                }}
                onChange={(e) => {
                  setName(e.target.value.replace(/\s/g, "")); // Remove all spaces
                }}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-full text-white py-2 rounded-lg transition duration-300 transform focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 hover:scale-105"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Hello;
