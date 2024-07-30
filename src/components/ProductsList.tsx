import { useShopping } from "@/hooks";
import { IProduct } from "@/types";
import { useMemo } from "react";

const Product: React.FC<{ data: IProduct }> = ({ data }) => {
  return (
    <div className="border shadow-md">
      <div className="">
        <img
          className="w-full aspect-1/2 object-cover"
          src="https://react-shopping-cart-67954.firebaseapp.com/static/media/10686354557628304-1-product.00bf8ca2603352e0cfad.webp"
          alt=""
        />
      </div>
      <h6 className="min-h-[calc(2*1.5rem)] leading-6 text-center relative after:block after:absolute after:bg-yellow-600 after:w-10 after:h-0.5 after:left-1/2 after:-translate-x-1/2 after:bottom-0">
        {data.title}
      </h6>
      <p className="text-center text-2xl py-3">
        {data.currencyFormat}
        {data.price}
      </p>
      <button className="border text-white bg-gray-900 leading-10 py-1 w-full">
        Add to cart
      </button>
    </div>
  );
};

const ProductsList = () => {
  const { products, sizes } = useShopping();
  const showProducts = useMemo(() => {
    const selectedSizes = sizes.filter((item) => item.selected);
    if (selectedSizes.length) {
      return products.filter((pro) =>
        selectedSizes.some((size) => pro.availableSizes.includes(size.value))
      );
    }
    return products;
  }, [products, sizes]);
  return (
    <div className="container px-2 mx-auto">
      <div className="leading-6">{showProducts.length} Product(s) found</div>
      <div className="grid grid-cols-2 gap-4">
        {showProducts.map((item) => (
          <Product key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
