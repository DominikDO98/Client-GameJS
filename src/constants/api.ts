export const API_URL = import.meta.env.VITE_API_URL;
export const CLIENT_ULR = import.meta.env.VITE_CLIENT_URL;
export const HEADERS = {
  "access-control-allow-origin": `${CLIENT_ULR}`,
  "content-type": "application/json",
};
