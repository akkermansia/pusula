import * as React from "react";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Landing from "./pages/Landing";
import Create from "./pages/Create";

export default function App() {
  return (
    <BrowserRouter basename={'/pusula'}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<Landing />} />
          <Route path="/create" element={<Create />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
