import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import { useEffect, useState } from "react";
import { Product } from "../../types/ProductTypes";
import { fetchProductsService } from "../../services/productServices";
import { Typography } from "@mui/material";

function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [prices, setPrices] = useState<number[]>([1, 999999999]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const result = await fetchProductsService({
          name,
          sku,
          minPrice: prices[0],
          maxPrice: prices[1],
        });
        if (result.status !== 200) {
          console.error(result.statusText);
          return;
        }
        setProducts(result.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, [name, sku, prices]);

  return (
    <TableContainer>
      <Typography variant="h3">Products</Typography>
      <Box gap={2}>
        <TextField
          label="name"
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          label="sku"
          onChange={(event) => setSku(event.target.value)}
        />
        <Slider
          value={prices}
          onChange={(_event: Event, newValue: number | number[]) =>
            setPrices(newValue as number[])
          }
        />
      </Box>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.sku}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.amount}</TableCell>
                <TableCell>{product.price}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No products to display</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductsTable;
