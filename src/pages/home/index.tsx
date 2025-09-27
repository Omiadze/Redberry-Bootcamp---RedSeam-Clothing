import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Pagination,
  Spin,
  Dropdown,
  Button,
  Form,
  InputNumber,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useProducts } from "./react-query/query";
import FilterSvg from "../../assets/filter.svg";
import { useNavigate } from "react-router-dom";

const sortOptions = [
  { label: "New products first", value: "-created_at" },
  { label: "Price, low to high", value: "price" },
  { label: "Price, high to low", value: "-price" },
];

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string>("-created_at");
  const [priceFrom, setPriceFrom] = useState<number | undefined>(undefined);
  const [priceTo, setPriceTo] = useState<number | undefined>(undefined);
  const navigate = useNavigate();

  const { data, isLoading } = useProducts({
    page,
    sort,
    "filter[price_from]": priceFrom,
    "filter[price_to]": priceTo,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin
          className="!text-primary"
          size="large"
          style={{ color: "#FF4000" }}
        />
      </div>
    );
  }

  const filterContent = (
    <div className="p-4 w-96 h-40 bg-white border-[1px] border-[#E1DFE1] rounded-lg">
      <h4 className="font-semibold mb-3">Select price</h4>
      <Form
        layout="vertical"
        onFinish={(values) => {
          setPage(1);
          setPriceFrom(values.priceFrom);
          setPriceTo(values.priceTo);
        }}
      >
        <div className="flex gap-2 mb-3">
          <Form.Item name="priceFrom" className="flex-1 !w-44">
            <InputNumber placeholder="From" min={0} className="!w-44" />
          </Form.Item>
          <Form.Item name="priceTo" className="flex-1 !w-44">
            <InputNumber placeholder="To" min={0} className="!w-44" />
          </Form.Item>
        </div>
        <div className="flex justify-end">
          <Button
            className="!w-32 !bg-primary !text-white"
            type="primary"
            htmlType="submit"
            block
          >
            Apply
          </Button>
        </div>
      </Form>
    </div>
  );

  const sortContent = (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] p-2">
      <div className="px-3 py-2 border-b border-gray-100">
        <h4 className="font-semibold text-base text-black">Sort by</h4>
      </div>
      <div className="py-1">
        {sortOptions.map((option) => (
          <div
            key={option.value}
            className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 hover:text-black"
            onClick={() => {
              setPage(1);
              setSort(option.value);
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );

  const getCurrentSortLabel = () => {
    const currentOption = sortOptions.find((option) => option.value === sort);
    return currentOption ? currentOption.label : "Sort by";
  };

  return (
    <div className="sm:w-[90%] mx-auto mt-20 mb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-dark-blue text-[42px] font-semibold">Products</h1>

        <div className="flex justify-between items-center mb-6 gap-4">
          {data && (
            <div className="border-r-[1px] border-[#E1DFE1] pr-5">
              <p className="text-blue text-xs font-normal">
                Showing {(data.meta.current_page - 1) * data.meta.per_page + 1}–
                {Math.min(
                  data.meta.current_page * data.meta.per_page,
                  data.meta.total
                )}{" "}
                of {data.meta.total} results
              </p>
            </div>
          )}

          <Dropdown popupRender={() => filterContent} trigger={["click"]}>
            <Button type="link" className="!text-black flex items-center gap-2">
              <img src={FilterSvg} alt="" />
              <p className="text-blue text-[16px] font-normal">Filter</p>
            </Button>
          </Dropdown>

          <Dropdown popupRender={() => sortContent} trigger={["click"]}>
            <Button
              type="link"
              className="!text-black flex items-center gap-2 border border-gray-300 rounded px-3 py-1 hover:border-gray-400"
            >
              <span className="text-[16px] font-normal">
                {getCurrentSortLabel()}
              </span>
              <DownOutlined className="text-gray-600 text-xs" />
            </Button>
          </Dropdown>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {data?.data.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              className="!border-none card-style"
              hoverable
              onClick={() => navigate(`/products/${product.id}`)}
              cover={
                <div className="border-[1px] border-[#E1DFE1] rounded-lg border-b-0">
                  <img
                    alt={product.name}
                    src={
                      product.cover_image || "https://via.placeholder.com/300"
                    }
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              }
            >
              <div className="pt-3 pb-3 pl-0.5">
                <h1 className="text-lg font-medium text-[#10151F]">
                  {product.name}
                </h1>
                <p className="text-lg font-medium text-[#10151F]">{`$${product.price}`}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="flex justify-center mt-8">
        <Pagination
          current={data?.meta.current_page}
          total={data?.meta.total}
          pageSize={10}
          onChange={(p) => setPage(p)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default HomePage;
