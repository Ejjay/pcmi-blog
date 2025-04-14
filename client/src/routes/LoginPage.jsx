import { SignIn } from "@clerk/clerk-react";
import { useState } from "react";

const LoginPage = () => {
  const [error, setError] = useState(null);

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