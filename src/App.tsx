import "./App.css";
import Layout from "./layout";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spin } from "antd";
import AuthGuard from "./components/route-guard/auth";

const LazyLoginPage = lazy(() => import("./pages/login"));
const LazyRegisterPage = lazy(() => import("./pages/registration"));
const LazyHomePage = lazy(() => import("./pages/home"));

function App() {
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* redirect / → /products */}
          <Route index element={<Navigate to="products" replace />} />

          {/* products route */}
          <Route path="products" element={<LazyHomePage />} />

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
      </Routes>
    </Suspense>
  );
}

export default App;
