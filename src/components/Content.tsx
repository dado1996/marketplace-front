import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useState } from "react";
import { useUser } from "../hooks/UserContext";
import ProductsTable from "./content/ProductsTable";
import ProductForm from "./content/ProductForm";

function Content() {
  const { user } = useUser();
  console.log(user);
  const [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="basic tab"
        >
          <Tab label="Products" />
          {user?.type === "salesman" && <Tab label="Register Product" />}
        </Tabs>
      </Box>
      <div role="tabpanel" hidden={currentTab !== 0}>
        <ProductsTable />
      </div>
      {user?.type === "salesman" && (
        <div role="tabpanel" hidden={currentTab !== 1}>
          <ProductForm />
        </div>
      )}
    </Box>
  );
}

export default Content;
