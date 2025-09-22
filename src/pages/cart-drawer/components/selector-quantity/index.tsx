import React from "react";
import { Button } from "antd";

import MinusIcon from "../minus-icon";
import PlusIcon from "../plus-icon";

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  min = 1,
  max = 10,
  onChange,
  disabled = false,
}) => {
  const handleDecrement = () => {
    if (value > min && !disabled) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max && !disabled) onChange(value + 1);
  };

  return (
    <div className="flex items-center w-20 rounded-full border border-gray-200">
      <Button
        type="text"
        size="small"
        icon={
          <MinusIcon color={disabled || value <= min ? "#d9d9d9" : "#666"} />
        }
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        className="!w-full !border-none !shadow-none !bg-transparent !rounded-none flex items-center justify-center"
      />
      <div className="flex items-center justify-center px-2 text-center font-medium text-gray-800">
        {value}
      </div>
      <Button
        type="text"
        size="small"
        icon={
          <PlusIcon color={disabled || value >= max ? "#d9d9d9" : "#666"} />
        }
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        className="!w-full !border-none !shadow-none !bg-transparent !rounded-none flex items-center justify-center"
      />
    </div>
  );
};

export default QuantitySelector;
