"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const vehicleDecodeAction = async (vin: string) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://tecdoc-catalog.p.rapidapi.com/vin/tecdoc-vin-check/${vin}`,
      headers: {
        "x-rapidapi-host": "tecdoc-catalog.p.rapidapi.com",
        "x-rapidapi-key": "634b15956cmsh1ab18d741e086a4p12c1d0jsna4ee8534cd4c",
      },
    };
    //"776988775dmsh1b39d3f7260ce67p12ca2fjsnbbb250661f77"
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
