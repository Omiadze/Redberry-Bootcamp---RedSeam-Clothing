import { useNavigate } from "react-router-dom";
import SuccessSvg from "../../assets/success.svg";
import { Button } from "antd";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center gap-24 items-center flex-col h-screen py-[20%]">
      <div>
        <img src={SuccessSvg} alt="" />
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-5xl font-bold">Congrats!</h1>
        <p>Your order is placed successfully!</p>
      </div>
      <div>
        <Button
          onClick={() => navigate("/")}
          className="!bg-primary !text-white !w-56 !h-12"
        >
          Continue shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
