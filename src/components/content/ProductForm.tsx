import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { registerProductService } from "../../services/productServices";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

type Inputs = {
  name: string;
  sku: string;
  amount: string;
  price: string;
};

function ProductForm() {
  const [errorsProduct, setErrorsProduct] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      sku: "",
      amount: "0",
      price: "5",
    },
  });
  const onSubmit = async ({ name, sku, amount, price }: Inputs) => {
    setErrorsProduct("");
    try {
      const result = await registerProductService(
        name,
        sku,
        parseInt(amount),
        parseFloat(price)
      );
      if (result.status !== 201) {
        setErrorsProduct(result.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create a new Product
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name of the product */}
          <Controller
            name="name"
            control={control}
            rules={{ required: "The name of the product is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          {/* SKU of the product */}
          <Controller
            name="sku"
            control={control}
            rules={{ required: "The SKU of the product is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="SKU"
                fullWidth
                margin="normal"
                error={!!errors.sku}
                helperText={errors.sku?.message}
              />
            )}
          />

          {/* Amount of the product */}
          <Controller
            name="amount"
            control={control}
            rules={{
              required: "The amount of the product is required",
              min: {
                value: 1,
                message: "The amount of the product must be at least 1",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Amount"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            )}
          />

          {/* Price of the product */}
          <Controller
            name="price"
            control={control}
            rules={{
              required: "The name of the product is required",
              min: {
                value: 1.0,
                message: "The minimum price should be 1.0",
              },
              max: {
                value: 999999999.0,
                message: "You cannot assign a price this high",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Price"
                fullWidth
                margin="normal"
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="outlined" color="primary" fullWidth>
              Register
            </Button>
          </Box>
        </form>
        <Snackbar open={errorsProduct !== ""} autoHideDuration={6000} />
      </Box>
    </Container>
  );
}

export default ProductForm;
