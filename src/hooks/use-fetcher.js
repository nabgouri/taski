import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useSWR from "swr";

export default function useFetcher(endpoint) {
  const authHeader = useAuthHeader();
  async function fetcher(endpoint) {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    return json;
  }
  const { data, mutate, isLoading, error } = useSWR(endpoint, fetcher);
  return {
    data,
    isLoading,
    error,
    mutate,
  };
}
