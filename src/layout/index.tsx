import Header from "../components/header";

import MainContainer from "../components/main-container";
import { Outlet, useSearchParams } from "react-router-dom";
import CartDrawer from "../pages/cart-drawer";

const Layout: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isCartOpen = searchParams.get("cart") === "open";

  const openCart = () => {
    setSearchParams({ cart: "open" });
  };

  const closeCart = () => {
    searchParams.delete("cart");
    setSearchParams(searchParams);
  };
  return (
    <>
      <Header onCartClick={openCart} />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <CartDrawer open={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default Layout;
