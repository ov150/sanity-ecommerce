// import Image from "next/image";

import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export const dynamic = "force-static";
export const relatidate = 60;

export default async function Home() {
  const products = await getAllProducts(); 
  const categories = await getAllCategories();
  return (
    <div>
      <BlackFridayBanner />
    <div className="flex flex-col tems-center justify-top min-h-screen bg-gray-100 p-4">
      <ProductsView products={products} categories={categories}/>
    </div>
    </div>
  );
}
