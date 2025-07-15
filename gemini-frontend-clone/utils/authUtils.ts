import { ca } from "zod/locales";

export const getAuthInfo = () => {
  try {
    const auth = localStorage.getItem("auth");
    return auth ? JSON.parse(auth) : null;
  }
  catch (error) {
    console.error("Error retrieving auth info from local storage:", error);
    return null;
  }
}

export const setAuthInfo = (auth: { countryCode: string; phoneNumber: string }) => {
  try {
    localStorage.setItem("auth", JSON.stringify(auth));
  }
  catch (error) {
    console.error("Error setting auth info in local storage:", error);
  } 
}