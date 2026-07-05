import { Outlet } from "react-router";
import MainContent from "../components/main-content";
import MainHeader from "../components/main-header";

const MainLayout = () => {
  return (
    <>
      <MainHeader />
      <MainContent>
        <Outlet />
      </MainContent>
    </>
  );
};

export default MainLayout;
