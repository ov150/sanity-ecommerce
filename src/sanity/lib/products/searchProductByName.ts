import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const searchProductByName = async (searchParam: string) =>{
    const PRODUCT_SEARCH_BY_NAME_QUERY = defineQuery(
        `
            *[ _type == "product" && name match $searchParam] | order(name asc)
        `
    );
    try {
        const products = await sanityFetch({
            query: PRODUCT_SEARCH_BY_NAME_QUERY,
            params:{
                searchParam: `${searchParam}`
            }
        })
        return products.data || [];
    } catch (error) {
        console.error("Error fetching products by name : ", error);
        return [];
    }
}