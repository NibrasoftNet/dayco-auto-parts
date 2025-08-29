"use server";

import axios from "axios";





export const articlesPartsCategoryV2Action = async (
  vehicleId: number,
  manuId: number,
  typeId: number,
) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://tecdoc-catalog.p.rapidapi.com/category/type-id/${typeId}/products-groups-variant-2/${vehicleId}/lang-id/6`,
      headers: {
        "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      },
    };

    const { data } = await axios.request(config);
    console.log("Response:", JSON.stringify(data, null, 2));
    return data;
  }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    console.error("Error:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      return error.response.data;
    }
    return error;
  }
};

  export const vehiclePartsCategoryV3 = async ({
    vehicleId,
    manuId,
  }: {
  vehicleId: number;
  manuId: number;
}) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://tecdoc-catalog.p.rapidapi.com/category/category-products-groups-variant-3/${vehicleId}/manufacturer-id/${manuId}/lang-id/6/country-filter-id/250/type-id/1`,
      headers: {
        "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      },
    };

    const { data } = await axios.request(config); // ✅ use await properly
    console.log("Response:", JSON.stringify(data, null, 2));
    return data;
  }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    console.error("Error:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      return error.response.data;
    }
    return error;
  }
};