import { useNavigate } from "react-router-dom";
import SuccessSvg from "../../assets/success.svg";
import { Button } from "antd";
import MarkX from "../../assets/x-mark.svg";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div
        onClick={() => navigate("/")}
        className="flex justify-end w-full pt-10 pr-10 hover:cursor-pointer"
      >
        <img src={MarkX} alt="" />
      </div>
      <div className="flex justify-center gap-24 items-center flex-col h-screen ">
        <div>
          <img src={SuccessSvg} alt="" />
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-5xl font-bold">Congrats!</h1>
          <p>Your order is placed successfully!</p>
        </div>
        <div>
          <Button
            type="primary"
            onClick={() => navigate("/")}
            className="!bg-primary !text-white !w-56 !h-12 !rounded-[10px]"
          >
            Continue shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
