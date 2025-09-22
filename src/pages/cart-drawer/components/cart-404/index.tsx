import CartErrorIcon from "../../../../assets/carterror.svg";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const CartErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center gap-14 mt-28">
      <div>
        <img src={CartErrorIcon} alt="" />
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl text-black font-bold">Ooops!</h1>
        <p>You’ve got nothing in your cart just yet...</p>
      </div>
      <Button onClick={() => navigate("/")} className="!bg-primary !text-white">
        Start shopping
      </Button>
    </div>
  );
};

export default CartErrorPage;
