import { useCallback, useEffect, useState } from "react";

async function sendHttpReq(url, config) {
  const res = await fetch(url, config);
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(res.message || "Something went wrong");
  }
  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const sendReq = useCallback(
    async function sendReq() {
      setLoading(true);
      try {
        const resData = await sendHttpReq(url, config);
        setData(resData);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
      setLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendReq();
    }
  }, [sendReq, config]);
  return {
    data,
    error,
    loading,
    sendReq,
  };
}
