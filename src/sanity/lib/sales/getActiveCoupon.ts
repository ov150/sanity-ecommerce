import { defineQuery } from "next-sanity"
import { CouponCode } from "./couponCodes"
import { sanityFetch } from "../live";

export const getActiveCoupon = async (couponCode: CouponCode) => {
    const ACTIVE_COUPON_CODE_QUERY = defineQuery(
        `
            *[ _type == "sales" && isActive == true && counponCode == $couponCode ] | order(validForm desc)[0]
        `
    );
    try {
        const activeSale = await sanityFetch({
            query: ACTIVE_COUPON_CODE_QUERY,
            params: {
                couponCode,
            },
        })
        return activeSale ? activeSale.data : null;
    } catch (error) {
        console.error("Error fetching active sales by coupon code: ", error);
        return null;
    }
};