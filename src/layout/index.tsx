import Header from "../components/header";

import MainContainer from "../components/main-container";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
};

export default Layout;
