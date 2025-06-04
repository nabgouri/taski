import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "react-toastify";

export default function useSubmit() {
  const authHeader = useAuthHeader();

  async function fetcher(event, endpoint, method, formData, onSuccess) {
    event.preventDefault();

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        const errorMessage =
          result.error || "An error occurred. Please try again.";

        return { success: false, error: errorMessage };
      }

      if (onSuccess && typeof onSuccess === "function") {
        onSuccess(result);
      }

      toast.success("Operation completed successfully!");
      return { success: true };
    } catch (error) {
      console.error("Error submitting task:", error);

      const errorMessage = "Network error. Please try again later.";

      return { success: false, error: errorMessage };
    }
  }

  return fetcher;
}
