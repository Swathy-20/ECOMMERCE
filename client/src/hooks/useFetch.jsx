import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axioInstance";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(url, { withCredentials: true });
      const extractedData = response?.data?.data || response?.data || null;
      setData(extractedData);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [url]);

  return [data, isLoading, error, fetchData];
};
