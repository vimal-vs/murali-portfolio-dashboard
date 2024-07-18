import { Route, Routes } from "react-router-dom";

import NavbarLayout from "./components/layouts/NavbarLayout";
import BlankLayout from "./components/layouts/BlankLayout";

import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import Podcasts from "./pages/Podcasts";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavbarLayout />}>
          {/* <Route path="*" element={<div>Error Page</div>} /> */}

          <Route path="/blogs" element={<Blogs />} />
          <Route path="/podcasts" element={<Podcasts />} />
        </Route>

        <Route path="/" element={<BlankLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}