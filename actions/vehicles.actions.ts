"use server";

import axios from "axios";





export const fetchManufacturersAction = async (typeId: number) => {
  try {
    console.log("Fetching manufacturers for typeId:", typeId);
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://tecdoc-catalog.p.rapidapi.com/manufacturers/list/type-id/${typeId}`,
      headers: {
        "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      },
    };

    const { data } = await axios.request(config);
    console.log("Manufacturers:", JSON.stringify(data, null, 2));
    return data;
  }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    console.error("Error fetching manufacturers:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      return error.response.data;
    }
    return error;
  }
};

export const fetchModelsAction = async (
  manufacturerId: number,
  typeId: number,
) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://tecdoc-catalog.p.rapidapi.com/models/list/type-id/${typeId}/manufacturer-id/${manufacturerId}/lang-id/6/country-filter-id/250`,
      headers: {
        "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      },
    };

    const { data } = await axios.request(config);
    console.log("Models:", JSON.stringify(data, null, 2));
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching models:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      return error.response.data;
    }
    return error;
  }
};

export const fetchVehicleDetailsAction = async (
  vehicleId: number,
  typeId: number,
) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://tecdoc-catalog.p.rapidapi.com/types/type-id/${typeId}/vehicle-type-details/${vehicleId}/lang-id/6/country-filter-id/250`,
      headers: {
        "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      },
    };

    const { data } = await axios.request(config);
    console.log("Vehicle:", JSON.stringify(data, null, 2));
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching Vehicle:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      return error.response.data;
    }
    return error;
  }
};
