import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header, Footer } from "./components";
import authServises from "./appwrite/Auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLooading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authServises
      .getCorentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLooading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          TODO: <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
