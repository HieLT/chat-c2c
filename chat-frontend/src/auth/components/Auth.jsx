import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96">
        {isLogin ? (
          <div>
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            <Login onLogin={onLogin} />
            <p className="text-sm text-center mt-4">
              Don't have an account?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
            <Register />
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
