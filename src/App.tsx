import "./App.css";
import Layout from "./layout";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spin } from "antd";

// Lazy load pages
const LazyLoginPage = lazy(() => import("./pages/login"));
const LazyRegisterPage = lazy(() => import("./pages/registration")); // <- add this

function App() {
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LazyLoginPage />} />
          <Route path="register" element={<LazyRegisterPage />} />{" "}
          {/* <- add this */}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
