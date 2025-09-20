import React, { useState } from "react";
import { Card, Row, Col, Select, Pagination, Spin } from "antd";
import { useProducts } from "./react-query/query";

const { Meta } = Card;

const sortOptions = [
  { label: "New products first", value: "-created_at" },
  { label: "Price, low to high", value: "price" },
  { label: "Price, high to low", value: "-price" },
];

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string>("-created_at");

  const { data, isLoading } = useProducts({
    page,
    sort,
    "filter[price_from]": undefined,
    "filter[price_to]": undefined,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="sm:w-[90%] mx-auto mt-20 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <div className="flex justify-between items-center mb-6 gap-2">
          <div>
            {data && (
              <p className="text-gray-600">
                Showing {(data.meta.current_page - 1) * data.meta.per_page + 1}–
                {Math.min(
                  data.meta.current_page * data.meta.per_page,
                  data.meta.total
                )}{" "}
                of {data.meta.total} results
              </p>
            )}
          </div>

          <Select
            value={sort}
            style={{ width: 200 }}
            options={sortOptions}
            onChange={(val) => {
              setPage(1);
              setSort(val);
            }}
          />
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {data?.data.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              cover={
                <img
                  alt={product.name}
                  src={product.cover_image || "https://via.placeholder.com/300"}
                />
              }
            >
              <Meta title={product.name} description={`$${product.price}`} />
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
