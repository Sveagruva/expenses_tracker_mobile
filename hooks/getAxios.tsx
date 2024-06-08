import axios from "axios";
import Constants from "expo-constants/src/Constants";

export function getAxios(token: string | null) {
  const instance = axios.create({
    baseURL: Constants.expoConfig?.extra?.backendEndpoint,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (token !== null)
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return instance;
};
