import HandEye from "../../assets/HandEye.svg";
import UserIcon from "../../assets/user.svg";
import CartIcon from "../../assets/cartIcon.svg";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  onCartClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const navigate = useNavigate();
  return (
    <div className="z-50  overflow-hidden  sticky top-0 left-0 w-full   bg-white shadow-[0px_-2px_4px_rgba(0,0,0,0.1)] ">
      <div className=" w-full sm:w-[90%]  mx-auto p-0    h-20 flex items-center justify-between gap-4 ">
        <div
          className="flex hover:cursor-pointer gap-1.5"
          onClick={() => navigate("/")}
        >
          <img src={HandEye} alt="" />
          <p className="text-[16px] font-semibold ">RedSeam Clothing</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onCartClick}>
            <img src={CartIcon} alt="Cart" />
          </button>
          <div className="flex">
            {" "}
            <img src={UserIcon} alt="" />
            Log in
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
