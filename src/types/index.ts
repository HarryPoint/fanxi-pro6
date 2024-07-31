export type IProduct = {
  availableSizes: string[];
  currencyFormat: string;
  currencyId: string;
  description: string;
  id: number;
  installments: number;
  isFreeShipping: boolean;
  price: number;
  sku: number;
  style: string;
  title: string;
  img: string;
};

//   {
//     "availableSizes": [
//         "X",
//         "L",
//         "XL",
//         "XXL"
//     ],
//     "currencyFormat": "$",
//     "currencyId": "USD",
//     "description": "14/15 s/nº",
//     "id": 0,
//     "installments": 9,
//     "isFreeShipping": true,
//     "price": 10.9,
//     "sku": 8552515751438644,
//     "style": "White T-shirt",
//     "title": "Cropped Stay Groovy off white"
// },

export type IShoppingCartItem = {
  key: string;
  productId: number;
  quantity: number;
  size: string;
};
