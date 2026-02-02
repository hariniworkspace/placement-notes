import API from "./api";

/* ================= GET PROFILE ================= */
export const getProfile = async () => {
  const { data } = await API.get("/api/users/me");
  return data;
};
