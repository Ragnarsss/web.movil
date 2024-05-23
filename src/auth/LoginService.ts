import { BASE_URL } from "../utils/config";

export async function loginFetch(email: string, password: string) {
  try {
    const url = `${BASE_URL}auth/login`;
    const requestBody = JSON.stringify({ email, password });

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    });

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export async function registerFetch(
  userName: string,
  email: string,
  password: string
) {
  try {
    const url = `${BASE_URL}auth/register`;
    const requestBody = JSON.stringify({ userName, email, password });

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    }).catch((error) => {
      throw error;
    });

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}
