import HandEye from "../../assets/HandEye.svg";
import UserIcon from "../../assets/user.svg";
import CartIcon from "../../assets/cartIcon.svg";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth/hooks";
import { Dropdown, type MenuProps, Avatar, Button, Badge } from "antd";
import ArrowDown from "../../assets/chevron-down.svg";
import { useCart } from "../../react-query/query";

type HeaderProps = {
  onCartClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const { data: cartItems } = useCart();

  const distinctProducts = cartItems?.length ?? 0;

  const menu: MenuProps["items"] = [
    {
      key: "logout",
      label: (
        <span
          onClick={() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            setUser(null);
          }}
        >
          Logout
        </span>
      ),
    },
  ];

  return (
    <div className="z-50 overflow-hidden sticky top-0 left-0 w-full bg-white shadow-[0px_-2px_4px_rgba(0,0,0,0.1)]">
      <div className="w-full sm:w-[90%] mx-auto p-0 h-20 flex items-center justify-between gap-4">
        <div
          className="flex hover:cursor-pointer gap-1.5"
          onClick={() => navigate("/")}
        >
          <img src={HandEye} alt="Logo" className="w-6 h-6" />
          <p className="text-[16px] !text-dark-blue font-semibold">
            RedSeam Clothing
          </p>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              <Avatar src={UserIcon} size={22} />
              <span>Log in</span>
            </div>
          ) : (
            <>
              <Badge
                count={distinctProducts}
                overflowCount={99}
                offset={[0, 0]}
                size="small"
                style={{ backgroundColor: "#FF4D4F" }}
              >
                <Button
                  type="text"
                  icon={<img src={CartIcon} alt="Cart" />}
                  onClick={onCartClick}
                />
              </Badge>

              <Dropdown menu={{ items: menu }} placement="bottomRight">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar src={user.avatar || UserIcon} size={42} />
                  <img src={ArrowDown} alt="" />
                </div>
              </Dropdown>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
