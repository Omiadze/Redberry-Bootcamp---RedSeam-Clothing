import "./App.css";
import Layout from "./layout";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import { Spin } from "antd";

const LazyLoginPage = lazy(() => import("./pages/login"));

function App() {
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        ksajdkadkj
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LazyLoginPage />} />{" "}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
