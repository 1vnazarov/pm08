import { Route, Routes } from "react-router";
import CatalogPage from "./pages/catalog";
import RegisterPage from "./pages/register";
import AuthPage from "./pages/auth";
import CartPage from "./pages/cart";
import OrdersPage from "./pages/orders";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<CatalogPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/orders" element={<OrdersPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
