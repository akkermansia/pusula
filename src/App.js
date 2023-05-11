import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Landing from "./pages/Landing";
import Create from "./pages/Create";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pusula" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/pusula/create" element={<Create />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
