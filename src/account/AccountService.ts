import { updateUser } from "../interfaces/apiModels.interface";
import { BASE_URL } from "./../utils/config";

export const updateAccountFetch = async (user: updateUser) => {
  try {
    const url = `${BASE_URL}users/update/1`;
    const requestBody = JSON.stringify({ ...user });

    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    });

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
};
