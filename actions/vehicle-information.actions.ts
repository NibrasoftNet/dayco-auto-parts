"use server";

import axios from "axios";
/* eslint-disable @typescript-eslint/no-explicit-any */
export const listVehicleEngineTypes = async (
  modelId: number,
  manuId: number,
) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://tecdoc-catalog.p.rapidapi.com/types/list-vehicles-types/${modelId}/manufacturer-id/${manuId}/lang-id/6/country-filter-id/250/type-id/1`,
      headers: {
        "x-rapidapi-host": "tecdoc-catalog.p.rapidapi.com",
        "x-rapidapi-key": "634b15956cmsh1ab18d741e086a4p12c1d0jsna4ee8534cd4c",
      },
    };

    const { data } = await axios.request(config);
    console.log("Response:", JSON.stringify(data, null, 2));
    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      return error.response.data;
    }
    return error;
  }
};
