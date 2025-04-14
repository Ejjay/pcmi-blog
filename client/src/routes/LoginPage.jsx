import { SignIn, useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isSignedIn, getToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const createUserInDatabase = async () => {
      if (isSignedIn) {
        try {
          const token = await getToken();
          // Create user in your database
          const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({}),
          });

          if (!response.ok) {
            console.error("Failed to create user in database");
          } else {
            // User created or already exists, redirect to home
            navigate("/");
          }
        } catch (error) {
          console.error("Error creating user:", error);
          setError("Error creating user. Please try again.");
        }
      }
    };

    createUserInDatabase();
  }, [isSignedIn, getToken, navigate]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)] flex-col">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <SignIn 
        signUpUrl="/register"
        redirectUrl="/"
        appearance={{
          elements: {
            formButtonPrimary: {
              cursor: "pointer"
            }
          }
        }}
      />
    </div>
  );
};

export default LoginPage;