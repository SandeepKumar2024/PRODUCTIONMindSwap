import axios from "axios";


const login = async (userData) => {
  const res = await axios.post(`/api/auth/login`, userData);

  if (res.data) {
    localStorage.setItem("userId", JSON.stringify(res.data?.user?._id));
    localStorage.setItem("token", JSON.stringify(res.data?.token));
 


    // document.cookie = `token=${res.data.token}; path=/;`;
  }

  return res.data;
};

//logout
const logout = async () => {
  await axios.get(`/api/auth/logout`);

  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("googleId");
 
  // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

const authService = {
  login,
  logout,
};

export default authService;