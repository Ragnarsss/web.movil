import { entryType } from "../common/enum";
import { BASE_URL } from "../utils/config";

// AUTH
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

export async function fetchRefreshAuth(refreshToken: string) {
  try {
    const url = `${BASE_URL}auth/update-jwt`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const result = await response.json();
    const token = result.data.accessToken;

    return token;
  } catch (error) {
    throw error;
  }
}

//USERS

//fetch all users
export async function fetchAllUsers() {
  try {
    const url = `${BASE_URL}users`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

//fetch user data
export async function fetchUserData(email: string) {
  try {
    const url = `${BASE_URL}user`;

    const requestBody = JSON.stringify({ email });

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

//TIME CARDS

//fetch all time cards
export async function fetchAllTimeCards(token: string) {
  try {
    const url = `${BASE_URL}timecard/timecards`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

//fetch time cards from specific user
export async function fetchTimeCards(token: string) {
  try {
    const url = `${BASE_URL}timecard/getUserCards`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

//TIME CARD ENTRY

//fetch time card entry
export async function fetchTimeEntries(token: string) {
  try {
    const url = `${BASE_URL}timecard/getUserCards`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    // Assuming you want to collect all entries from each time card
    const allEntries = result.data.flatMap((timeCard: any) => timeCard.entries);

    return allEntries;
  } catch (error) {
    throw error;
  }
}

//MARKING

//mark entry
export async function markEntry(
  token: string,
  entry: entryType,
  entryId: number
) {
  try {
    const url = `${BASE_URL}timecardentry/marking`;

    const requestBody = JSON.stringify({ flag: entry, id: entryId });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: requestBody,
    });

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}
