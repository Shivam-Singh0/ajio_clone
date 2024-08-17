import {
  Card,
  CardHeader,
  CardBody,
  Tooltip,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useGetSingleProductQuery } from "../../redux/apis/productsApiSlice";
import { Link } from "react-router-dom";

export function ProductCard({ product = null, id = null }) {
  const { data, isLoading, error } = useGetSingleProductQuery(id, { skip: !id });

  if (isLoading) {
    return <Spinner className="h-16 w-16 text-gray-900/50 mx-auto mt-5" />;
  }

  if (error) {
    return <Typography color="red" className="text-center">Error loading product</Typography>;
  }

  if (!product && data) {
    product = data;
  }

  let price = product.price;
  price = Math.round(price * 83.93);

  return (
    <Link
      to={`/product/${product.id}`}
      className="w-full md:w-1/2 lg:w-1/3 p-2 hover:scale-105 transition duration-300"
      state={{ product }}
    >
      <Card className="lg:w-90 w-full rounded-xl shadow-xl">
        <CardHeader shadow={false} floated={false} className="h-96">
          <img
            src={product.image}
            alt="card-image"
            className="h-full w-full object-fit rounded-xl"
          />
        </CardHeader>
        <CardBody>
          <div className="text-center">
            <Tooltip content={product.title}>
              <Typography
                color="blue-gray"
                className="font-medium mb-2 max-h-[28px] overflow-hidden"
              >
                {product.title}
              </Typography>
            </Tooltip>
            <Typography className="font-medium bg-green-600 text-white rounded inline p-2">
              {product.rating.rate}&#9733; | {product.rating.count}K
            </Typography>
            <Typography color="blue-gray" className="font-medium mt-2">
              &#8377;{price}
            </Typography>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
