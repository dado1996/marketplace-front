import Box from "@mui/material/Box";
import { useState } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Box>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Register setIsLogin={setIsLogin} />
      )}
    </Box>
  );
}

export default Auth;
