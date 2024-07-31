import { useEffect, useMemo } from "react";
import { useShopping, useShoppingDispatch } from "./hooks";
import { getProducts } from "@/api";
import ProductsFilter from "@/components/ProductsFilter";
import ProductsList from "./components/ProductsList";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const { sizes } = useShopping();
  const dispatch = useShoppingDispatch();
  const checkedSizes = useMemo(
    () => sizes.filter((size) => size.selected),
    [sizes]
  );
  useEffect(() => {
    getProducts().then(({ data: { products } }) => {
      products = products.map((product: any) => {
        return {
          ...product,
          img: "https://react-shopping-cart-67954.firebaseapp.com/static/media/10686354557628304-1-product.00bf8ca2603352e0cfad.webp",
        };
      });
      dispatch({
        type: "products:set",
        payload: products,
      });
      // 默认添加购物车
      products.forEach((product: any) => {
        dispatch({
          type: "shoppingCart:add",
          payload: {
            key: `${product.id}-${product.sku}-${product.availableSizes[0]}`,
            productId: product.id,
            quantity: 1,
            size: product.availableSizes[0],
          },
        });
      });
    });
  }, [checkedSizes, dispatch]);
  return (
    <div>
      <ProductsFilter />
      <ProductsList />
      <ShoppingCart />
    </div>
  );
}

export default App;
