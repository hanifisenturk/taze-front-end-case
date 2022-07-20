import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (endPoint, handleData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(endPoint);

      if (!response.ok) {
        throw new Error("Request has been failed!");
      }

      const data = await response.json();

      handleData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return [isLoading, error, sendRequest];
};

export default useHttp;
