import axiosInstance from "@/config/axios.config";

export enum TMethods {
  post = 'post',
  get = 'get',
  patch = 'patch',
  delete = 'delete',
  put = 'put'
}

// Updated apiCall to handle FormData automatically
const apiCall = async <T>(
  method: TMethods,
  url: string,
  data?: T,
  options?: { headers?: object }
) => {
  const isFormData = data instanceof FormData;

  const res = await axiosInstance({
    method,
    url,
    data,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options?.headers,
    },
  });

  return res.data;
};
export default apiCall;
