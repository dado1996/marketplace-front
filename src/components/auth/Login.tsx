import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { loginService } from "../../services/authServices";
import { useUser } from "../../hooks/UserContext";
import { useState } from "react";
import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import { AxiosError } from "axios";
import Container from "@mui/material/Container";

type Inputs = {
  email: string;
  password: string;
};

function Login({ setIsLogin }: { setIsLogin: (value: boolean) => void }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login } = useUser();
  const [errorLogin, setErrorLogin] = useState("");
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      const result = await loginService(email, password);
      if (result.status !== 200) {
        setErrorLogin(result.data.message);
      }
      login(result.data.data);
      localStorage.setItem("token", result.data.token);
    } catch (error) {
      console.error(error);
      setErrorLogin(
        (
          (error as AxiosError).response?.data as {
            status: number;
            message: string;
          }
        ).message
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{ display: "flex", flexDirection: "column", padding: 5 }}
            gap={3}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: "The name of the product is required",
              }}
              render={({ field }) => (
                <TextField
                  id="email"
                  label="Email"
                  helperText={errors.email?.message}
                  {...field}
                />
              )}
            />
            <Controller
              rules={{
                required: true,
              }}
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  helperText={errors.password?.message}
                  {...field}
                />
              )}
            />
            <Button variant="outlined" type="submit">
              Login
            </Button>
          </Box>
        </form>
        <Link
          sx={{ cursor: "pointer" }}
          variant="body2"
          onClick={() => setIsLogin(false)}
        >
          Don't have an account?
        </Link>
        <Snackbar
          open={errorLogin !== ""}
          autoHideDuration={6000}
          onClose={() => setErrorLogin("")}
          message={errorLogin}
        />
      </Box>
    </Container>
  );
}

export default Login;
