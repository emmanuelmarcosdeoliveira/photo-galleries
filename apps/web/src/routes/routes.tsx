import { Route, Routes } from "react-router";
import MainLayout from "../pages/layout-main";
import PageComponents from "../pages/page-components";
import PageHome from "../pages/page-home";
import PagePhotoDetails from "../pages/page-photo-details";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<PageHome />} />
        <Route path="/fotos/:id" element={<PagePhotoDetails />} />
        <Route path="/components" element={<PageComponents />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
