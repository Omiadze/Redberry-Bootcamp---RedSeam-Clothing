import "./App.css";
import Layout from "./layout";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spin } from "antd";
import AuthGuard from "./components/route-guard/auth";

const LazyLoginPage = lazy(() => import("./pages/login"));
const LazyRegisterPage = lazy(() => import("./pages/registration"));
const LazyHomePage = lazy(() => import("./pages/home"));
const LazyProductDetailPage = lazy(() => import("./pages/detailed-product"));
const LazyCheckoutPage = lazy(() => import("./pages/checkout"));
const LazyOrderPage = lazy(() => import("./pages/order-success"));

function App() {
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="products" replace />} />

          <Route path="products" element={<LazyHomePage />} />
          <Route path="products/:id" element={<LazyProductDetailPage />} />
          <Route path="checkout" element={<LazyCheckoutPage />} />

          <Route
            path="login"
            element={
              <AuthGuard>
                <LazyLoginPage />
              </AuthGuard>
            }
          />
          <Route
            path="register"
            element={
              <AuthGuard>
                <LazyRegisterPage />
              </AuthGuard>
            }
          />
        </Route>
        <Route path="order-success" element={<LazyOrderPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
