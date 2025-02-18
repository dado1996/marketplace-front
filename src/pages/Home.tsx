import Auth from "../components/Auth";
import Content from "../components/Content";
import { useUser } from "../hooks/UserContext";

function Home() {
  const { user } = useUser();
  return <div>{user ? <Content /> : <Auth />}</div>;
}

export default Home;
