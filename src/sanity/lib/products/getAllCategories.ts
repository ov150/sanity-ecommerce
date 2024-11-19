// import {defineQuery} from "next-sanity"
// import { sanityFetch } from "../live"


// export const getAllCategories = async () =>{
//     const ALL_CATEGORIES_QUERY = defineQuery(
//         `
//             *[ _type == "category ] | order(name asc)
//         `
//     );
//     try {
//         const categories = await sanityFetch({
//             query: ALL_CATEGORIES_QUERY,
//         })
//         return categories.data || [];
//     } catch (error) {
//         console.error("Error fetching all categories: ", error);
//         return []
//     }
// }

import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';

export const getAllCategories = async () => {
  // Fixed GROQ query syntax
  const ALL_CATEGORIES_QUERY = defineQuery(
    `
      *[_type == "category"] | order(name asc)
    `
  );

  try {
    const categories = await sanityFetch({
      query: ALL_CATEGORIES_QUERY,
    });
    return categories.data || [];
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }
};