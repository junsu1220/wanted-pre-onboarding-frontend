import axios from "axios";

// axios 기본 주소 세팅
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// 로컬스토리지의 토큰유무를 판별
const getToken = async () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    return `Bearer ${token}`;
  } else {
    return null;
  }
};

// intercepter를 통한 header 설정
api.interceptors.request.use(async (config) => {
  config.headers["Content-Type"] = "application/json; charset=utf-8";
  config.headers["X-Requested-With"] = "XMLHttpRequest";
  config.headers["Accept"] = "*/*";
  config.headers["authorization"] = await getToken();
  return config;
});

// 인증 관련 axios API 통신
export const signinApi = async (email, password) => {
  return api.post("/auth/signin", { email, password });
};
export const signupApi = async (email, password) => {
  return api.post("/auth/signup", { email, password });
};

export default api;
