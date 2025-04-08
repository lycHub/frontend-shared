import { Route, Routes } from "react-router";
import Root from "./pages/root";
import Home from "./pages/home";
import User from "./pages/user";
import Login from "./pages/login";
import NotFound from "./pages/not-found";
import Breeds from "./pages/breeds";
import Breed from "./pages/breeds/breed";

function App() {
  // const loadedData = useStore(preLoadStore, (state) => state.data);
  // console.log({ loadedData });
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="user" element={<User />} />
        <Route path="breeds" element={<Breeds />} />
        <Route path="breeds/:id" element={<Breed />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
