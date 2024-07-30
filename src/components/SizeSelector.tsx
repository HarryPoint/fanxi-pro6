import { useShopping, useShoppingDispatch } from "@/hooks";
import classNames from "classnames";

const SizeSelector = () => {
  const { sizes } = useShopping();
  const dispatch = useShoppingDispatch();
  return (
    <div className="container px-10 mx-auto">
      <h3>Sizes:</h3>
      <div className="flex gap-3 py-4">
        {sizes.map((size) => (
          <div
            key={size.value}
            className={classNames(
              [
                "rounded-full",
                "bg-gray-200",
                "w-16",
                "aspect-square",
                "text-sm",
                "text-center",
                "flex",
                "justify-center",
                "items-center",
                "cursor-pointer",
              ],
              {
                "bg-gray-950": size.selected,
                "text-white": size.selected,
              }
            )}
            onClick={() =>
              dispatch({ type: "sizes:selected", payload: size.value })
            }
          >
            <div>{size.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
