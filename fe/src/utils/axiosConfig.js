import axios from "axios";
import { Hypnosis } from "react-cssfx-loading";
import { useState } from "react";
import { toast } from "react-toastify";

var displayLoading = false;
function AxiosLoading() {
  //   const [isLoading, setIsLoading] = useState(false);
  //   setDisplayLoading = setIsLoading;
  //   displayLoading = isLoading;
  return (
    <>
      {displayLoading && (
        <div className="loading-overlay">
          <Hypnosis color="var(--gold)" width="35px" height="35px" />
        </div>
      )}
    </>
  );
}

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    // console.log("Call API: " + config.url);
    displayLoading = true; //setDisplayLoading(true);
    config.headers.Authorization = localStorage.token;
    return config;
  },
  function (error) {
    // Do something with request error
    displayLoading = false; //setDisplayLoading(false);
    return toast.error(error.message);
  }
);
instance.interceptors.response.use(
  async function (response) {
    setTimeout(() => (displayLoading = false), 500);
    if (response.headers.get("Authorization")) {
      response.data = {
        ...response.data,
        Authorization: response.headers.get("Authorization"),
      };
    }

    response.data = {
      ...response.data,
    };

    //toast message
    if (response.config.method !== "get")
      if (response.data.status && response.data.message !== "") {
        toast.success(response.data.message);
      } else {
        if (!response.data.status && response.data.message !== "") {
          toast.error(response.data.message);
        }
      }
    //token hết hạn thì rediect về trang đăng nhập
    if (response.data.message && response.data.message.includes("Token")) {
      window.location.href = "/login";
    }
    return response.data;
  },
  function (error) {
    displayLoading = false; //setDisplayLoading(false);
    console.log(error);
    return toast.error(error.message);
  }
);

export { instance as axios, AxiosLoading, displayLoading };
