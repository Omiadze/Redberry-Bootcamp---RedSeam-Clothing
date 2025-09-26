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
import { ShoppingCartOutlined, HomeOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "./query";
import { useAddToCart } from "../../react-query/mutation";

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
              <HomeOutlined
                onClick={() => navigate("/")}
                className="cursor-pointer"
              />
            ),
          },
          {
            title: (
              <span onClick={() => navigate("/")} className="cursor-pointer">
                Listing
              </span>
            ),
          },
          { title: "Product" },
        ]}
        className="mb-6"
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
                      ? "border-blue-500"
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
              <Title level={2} className="!mb-2">
                {product.name}
              </Title>
              <Title level={2} className="!text-black !mb-6">
                $ {product.price}
              </Title>
            </div>

            {/* Color selection */}
            <div>
              <Text strong className="block mb-3">
                Color: {selectedColor}
              </Text>
              <div className="flex gap-2">
                {product.available_colors?.map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                      selectedColor === color
                        ? "border-gray-800"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: getColorHex(color) }}
                    onClick={() => handleColorChange(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div>
              <Text strong className="block mb-3">
                Size: {selectedSize}
              </Text>
              <div className="flex gap-2">
                {product.available_sizes?.length ? (
                  product.available_sizes.map((size) => (
                    <Button
                      key={size}
                      type={selectedSize === size ? "primary" : "default"}
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[40px]"
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
              <Text strong className="block mb-3">
                Quantity
              </Text>
              <Select
                value={quantity}
                style={{ width: 80 }}
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
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              disabled={!product.available_sizes?.length}
              className={`w-full !h-12 !text-base ${
                !product.available_sizes?.length
                  ? "!bg-gray-400 !cursor-not-allowed"
                  : "!bg-orange-500 hover:!bg-orange-600"
              }`}
            >
              {!product.available_sizes?.length
                ? "Currently Unavailable"
                : "Add to cart"}
            </Button>

            {/* Product details */}
            <div className="pt-6 border-t border-gray-200">
              <Title level={4} className="!mb-4">
                Details
              </Title>
              <div className="space-y-2">
                <Text>
                  <strong>Brand:</strong> {product.brand?.name}
                </Text>
                <Text className="block text-gray-600">
                  {product.description}
                </Text>
              </div>
              {product.brand?.image && (
                <div className="mt-6 flex justify-end">
                  <img
                    src={product.brand.image}
                    alt={product.brand.name}
                    className="h-8 opacity-60"
                  />
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailPage;
