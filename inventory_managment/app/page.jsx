
import { getData } from "@/lib/getData";
import Link from "next/link";
const HomePage = async () => {
  const products = (await getData("https://fakestoreapi.com/products")) ?? [];
  return (
    <div className=" px-2 py-2">
      <h2 className="text-2xl font-bold p-4">Redux Toolkit</h2>
      <h1 className="text-3xl font-bold underline text-blue-600">Hello, Next.js!</h1>
    </div>
  );
};
export default HomePage;
