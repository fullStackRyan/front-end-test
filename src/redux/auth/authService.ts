import axios from "axios";
import { User } from "../../types/Types";

const API_URL = "https://run.mocky.io/v3/3669c83a-9ba1-4424-b08f-a8ef6d699966";

const login = async (userData: User) => {
  const response = await axios.post(API_URL, userData);
  if (response.status === 200) {
    const user = true;
    sessionStorage.setItem("token", JSON.stringify(response.data?.token));
    return user;
  } else if (response.status === 401) {
    console.log("Unauthorized");
    return null;
  }
};

const logout = () => sessionStorage.removeItem("token");

const authService = {
  logout,
  login,
};

export default authService;
