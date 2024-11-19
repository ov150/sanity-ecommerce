import "server-only";

import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client";

// Ensure you have the required environment variable set
const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}

// Configure Sanity Live content with proper API versioning
export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    // Ensure you're using the correct API version
    apiVersion: '2023-10-01', // Replace with your desired Sanity API version
    useCdn: false, // Live content should fetch the latest data, so disable CDN
  }),
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0, // Ensures fresh data on each request
  },
});
