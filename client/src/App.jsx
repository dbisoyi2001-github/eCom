import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AdminLayout from "./components/admin-view/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import AdminFeatures from "./pages/admin-view/features";
import ShopLayout from "./components/shop-view/layout";
import NotFound from "./pages/not-found";
import ShopHome from "./pages/shop-view/home";
import ShopProducts from "./pages/shop-view/products";
import ShopAccount from "./pages/shop-view/account";
import ShopCheckout from "./pages/shop-view/checkout";

const App = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route path="/shop" element={<ShopLayout />}>
          <Route path="home" element={<ShopHome />} />
          <Route path="products" element={<ShopProducts />} />
          <Route path="account" element={<ShopAccount />} />
          <Route path="checkout" element={<ShopCheckout />} />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

export default App;
