import { useEffect, useMemo } from "react";
import { useShopping, useShoppingDispatch } from "./hooks";
import { getProducts } from "@/api";
import SizeSelector from "@/components/SizeSelector";
import ProductsList from "./components/ProductsList";

function App() {
  const { sizes } = useShopping();
  const dispatch = useShoppingDispatch();
  const checkedSizes = useMemo(
    () => sizes.filter((size) => size.selected),
    [sizes]
  );
  useEffect(() => {
    getProducts().then(({ data: { products } }) => {
      dispatch({
        type: "products:set",
        payload: products,
      });
    });
  }, [checkedSizes, dispatch]);
  return (
    <div>
      <SizeSelector />
      <ProductsList />
    </div>
  );
}

export default App;
