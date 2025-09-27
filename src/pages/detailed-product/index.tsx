import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Select,
  Typography,
  Image,
  Breadcrumb,
  Spin,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "./query";
import { useAddToCart } from "../../react-query/mutation";
import ButtonCart from "../../assets/buttonCart.svg";
import { useAuthContext } from "../../context/auth/hooks";

const { Title, Text } = Typography;
const { Option } = Select;

// Color mapping for display colors
const getColorHex = (colorName: string): string => {
  const colorMap: { [key: string]: string } = {
    Yellow: "#FDE047",
    Green: "#22C55E",
    Purple: "#8B5CF6",
    Pink: "#F8BBD9",
    Blue: "#3B82F6",
    Red: "#EF4444",
    Black: "#1F2937",
    White: "#F9FAFB",
    Gray: "#6B7280",
    Orange: "#F97316",
    "Navy Blue": "#001F54",
    Brown: "#8B4513",
    Olive: "#808000",
  };
  return colorMap[colorName] || "#6B7280";
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { user } = useAuthContext();

  const addToCartMutation = useAddToCart();

  // Fetch product data
  const { data: product, isLoading } = useProduct(Number(id));

  // Set default selections safely
  useEffect(() => {
    if (product?.available_colors?.length) {
      setSelectedColor(product.available_colors[0]);
      setSelectedImageIndex(0);
    }
    if (product?.available_sizes?.length && !selectedSize) {
      setSelectedSize(product.available_sizes[0]);
    }
  }, [product, selectedSize]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    if (!user) {
      // Redirect to login page
      navigate("/login");
      return;
    }

    console.log("Added to cart:", {
      productId: id,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });

    const body = { color: selectedColor, size: selectedSize, quantity };
    const productId = Number(id);
    addToCartMutation.mutate({ productId, body });
  };

  // Handle color click
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const index = product.available_colors.indexOf(color);
    if (index !== -1) setSelectedImageIndex(index);
  };

  // Handle image click
  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    const color = product.available_colors[index];
    if (color) setSelectedColor(color);
  };

  return (
    <div className="sm:w-[90%] mx-auto mt-8 mb-20">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            title: (
              <span onClick={() => navigate("/")} className="cursor-pointer">
                Listing
              </span>
            ),
          },
          { title: "Product" },
        ]}
        className="!mb-12"
      />

      <Row gutter={[32, 32]}>
        {/* Left side - Images */}
        <Col xs={24} md={12}>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              {product.images?.map((img, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 cursor-pointer border-2 rounded-lg overflow-hidden ${
                    selectedImageIndex === index
                      ? "border-[#FF4000]"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    preview={false}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1">
              <Image
                src={product.images?.[selectedImageIndex]}
                alt={product.name}
                className="w-full rounded-lg"
                style={{ maxHeight: "600px", objectFit: "cover" }}
              />
            </div>
          </div>
        </Col>

        {/* Right side - Product details */}
        <Col xs={24} md={12}>
          <div className="space-y-6">
            {/* Product title and price */}
            <div>
              <Title level={2} className="!mb-2 !text-3xl !font-semibold">
                {product.name}
              </Title>
              <Title level={2} className="!text-3xl !font-semibold !mb-6">
                $ {product.price}
              </Title>
            </div>

            <div>
              <Text className="block mb-3 !text-[16px] !font-normal">
                Color: {selectedColor}
              </Text>
              <div className="flex gap-4  items-center">
                {product.available_colors?.map((color) => (
                  <div
                    key={color}
                    className={`relative cursor-pointer ${
                      selectedColor === color ? "p-1" : ""
                    }`}
                    onClick={() => handleColorChange(color)}
                    title={color}
                  >
                    {selectedColor === color && (
                      <div className="absolute inset-0 rounded-full border-2 border-[#E1DFE1]"></div>
                    )}

                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: getColorHex(color) }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="flex flex-col gap-2">
              <p className="!text-[16px] !font-normal">Size: {selectedSize}</p>
              <div className="flex gap-1">
                {product.available_sizes?.length ? (
                  product.available_sizes.map((size) => (
                    <Button
                      key={size}
                      type="default"
                      onClick={() => setSelectedSize(size)}
                      className={`!w-[70px] !color-blue ${
                        selectedSize === size
                          ? "!bg-[#F8F6F7] !border-blue !border-[1px] hover:!text-black"
                          : "!bg-white !border-gray-300 hover:!text-black !border-[1px]"
                      }`}
                      style={{ borderWidth: "2px" }}
                    >
                      {size}
                    </Button>
                  ))
                ) : (
                  <span>Unavailable</span>
                )}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <Text className="block mb-3 !text-[16px] !font-normal">
                Quantity
              </Text>
              <Select
                value={quantity}
                style={{ width: 70 }}
                onChange={setQuantity}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <Option key={num} value={num}>
                    {num}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Add to cart button */}
            <Button
              type="primary"
              size="large"
              onClick={handleAddToCart}
              disabled={!product.available_sizes?.length}
              className={`w-full !h-12 !text-base !text-white !rounded-[10px] ${
                !product.available_sizes?.length
                  ? "!bg-gray-400 !cursor-not-allowed"
                  : "!bg-primary hover:!bg-orange-600"
              }`}
            >
              <img src={ButtonCart} alt="" />
              {!product.available_sizes?.length
                ? "Currently Unavailable"
                : "Add to cart"}
            </Button>

            {/* Product details */}
            <div className="pt-10 mt-10 border-t border-gray-200">
              <div className="flex justify-between items-center mb-7">
                <h1 className="!text-xl !font-medium !text-dark-blue">
                  Details
                </h1>
                {product.brand?.image && (
                  <div className=" flex justify-center items-center">
                    <img
                      src={product.brand.image}
                      alt={product.brand.name}
                      className="h-8 opacity-60"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-7">
                <Text className="!text-[16px] !text-blue !font-normal">
                  Brand: {product.brand?.name}
                </Text>
                <Text className="block !text-[16px] !text-blue !font-normal">
                  {product.description}
                </Text>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailPage;
