import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { registerService } from "../../services/authServices";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
  type: "buyer" | "salesman" | "admin";
};

function Register({ setIsLogin }: { setIsLogin: (value: boolean) => void }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      type: "buyer" as const,
    },
  });
  const [errorsRegister, setErrorsRegister] = useState<string[]>([]);

  const onSubmit: SubmitHandler<Inputs> = async ({
    email,
    password,
    confirmPassword,
    type,
  }) => {
    try {
      const result = await registerService(
        email,
        password,
        confirmPassword,
        type
      );
      if (result.status !== 201) {
        setErrorsRegister([...errorsRegister, result.statusText]);
        return;
      }
      setIsLogin(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h2">Register</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{ display: "flex", flexDirection: "column", padding: 5 }}
          gap={3}
        >
          <Controller
            rules={{
              required: true,
            }}
            name="email"
            control={control}
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
          <Controller
            rules={{
              required: true,
            }}
            name="confirmPassword"
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
          <FormControl fullWidth>
            <InputLabel id="type-register">Type</InputLabel>
            <Controller
              rules={{
                required: true,
              }}
              name="type"
              control={control}
              render={({ field }) => (
                <Select labelId="type-register" {...field}>
                  <MenuItem value="buyer">Buyer</MenuItem>
                  <MenuItem value="salesman">Salesman</MenuItem>
                  <MenuItem value="admin">Administrator</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Button variant="outlined" type="submit">
            Register
          </Button>
          {errorsRegister.length > 0 &&
            errorsRegister.map((err, i) => (
              <Typography key={i} color="red">
                {err}
              </Typography>
            ))}
        </Box>
      </form>
      <Link
        sx={{ cursor: "pointer" }}
        variant="body2"
        onClick={() => setIsLogin(true)}
      >
        Already have an account?
      </Link>
    </Box>
  );
}

export default Register;
