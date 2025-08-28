"use server";

import axios from "axios";

export const listVehicleEngineTypes = async (
  modelId: number,
  manuId: number,
  typeId: number,
) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://tecdoc-catalog.p.rapidapi.com/types/list-vehicles-types/${modelId}/manufacturer-id/${manuId}/lang-id/6/country-filter-id/250/type-id/${typeId}`,
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