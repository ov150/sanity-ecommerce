import { defineQuery, groq } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductByCategory = async (categorySlug: string) => {
  // Define the query string directly
//   const GET_PRODUCT_BY_SLUG_QUERY = defineQuery(`
//     *[_type == "product" && slug.current == $slug] | order(name asc) {
//       _id,
//       name,
//       price,
//       slug,
//       description,
//       image
//     }
//   `);

const GET_PRODUCT_BY_CATEGORY_QUERY = groq`*[ _type == "product" && references( *[ _type == "category" && slug.current == $categorySlug]._id)] | order(name asc)`

  try {
    // Fetching data using the query
    const products = await sanityFetch({
      query: GET_PRODUCT_BY_CATEGORY_QUERY,
      params: { categorySlug },
    });

    // Return the fetched products or an empty array if undefined
    return products?.data || [];
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return [];
  }
};











// import { defineQuery } from "next-sanity"
// import { sanityFetch } from "../live";

// export const getProductBySlug = async (slug: string) =>{
//     const GET_PRODUCT_BY_SLUG_QUERY = defineQuery(
//         `
//             *[ _type == "product" && slug.current == $slug] | order(name asc){
//        _id,
//        name,
//        price,
//        slug,
//        description,
//        image
//      }
//         `
//         [0]
//     );
//     try {
//         const products = await sanityFetch({
//             query:GET_PRODUCT_BY_SLUG_QUERY,
//             params:{slug},
//         })
//         return products.data || [];
//     } catch (error) {
//         console.error("Error fetching products by name : ", error);
//         return [];
//     }
// }


// import { sanityFetch } from "../live";

// export const getProductBySlug = async (slug: string) => {
//   const GET_PRODUCT_BY_SLUG_QUERY = `
//     *[_type == "product" && slug.current == $slug] | order(name asc) {
//       _id,
//       name,
//       price,
//       slug,
//       description,
//       image
//     }
//   `;
  
//   try {
//     const products = await sanityFetch({
//       query: GET_PRODUCT_BY_SLUG_QUERY,
//       params: { slug },
//     });
//     return products?.data || [];
//   } catch (error) {
//     console.error("Error fetching product by slug: ", error);
//     return [];
//   }
// };
