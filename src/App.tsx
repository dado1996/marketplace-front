import Home from "./pages/Home";
import { UserProvider } from "./hooks/UserContext";

function App() {
  return (
    <UserProvider>
      <Home />
    </UserProvider>
  );
}

export default App;
