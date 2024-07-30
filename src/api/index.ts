import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://react-shopping-cart-67954.firebaseio.com/",
});

// 获取商品列表
export const getProducts = () =>
  axiosInstance({
    method: "get",
    url: "/products.json",
  });
