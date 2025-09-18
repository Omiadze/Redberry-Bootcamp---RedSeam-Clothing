import HandEye from "../../assets/HandEye.svg";
import UserIcon from "../../assets/user.svg";

const Header = () => {
  return (
    <div className="z-50  overflow-hidden  sticky top-0 left-0 w-full   bg-white shadow-[0px_-2px_4px_rgba(0,0,0,0.1)] ">
      <div className=" w-full sm:w-[90%]  mx-auto p-0  sm:px-5  h-20 flex items-center justify-between gap-4 ">
        <div className="flex">
          <img src={HandEye} alt="" />
          RedSeam Clothing
        </div>
        <div className="flex">
          <img src={UserIcon} alt="" />
          Log in
        </div>
      </div>
    </div>
  );
};

export default Header;
