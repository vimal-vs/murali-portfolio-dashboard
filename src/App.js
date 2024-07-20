import { Navigate, Route, Routes } from "react-router-dom";

import NavbarLayout from "./components/layouts/NavbarLayout";
import BlankLayout from "./components/layouts/BlankLayout";

import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import Podcasts from "./pages/Podcasts";
import Testimonials from "./pages/Testimonials";
import Events from "./pages/Events";
import Common from "./pages/Common";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavbarLayout />}>
          <Route path="" element={<Navigate to={"/blogs"} />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="podcasts" element={<Podcasts />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="events" element={<Events />} />
          <Route path="data" element={<Common />} />
        </Route>

        <Route path="/" element={<BlankLayout />}>
          <Route path="" element={<Login />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}