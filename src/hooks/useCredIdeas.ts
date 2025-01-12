import { useState, useEffect, useCallback } from "react";

interface CredIdea {
  name: string;
  description: string;
  criteria: string;
  verification_process: string;
  links: string;
  type: string;
  created_at: string;
}

function useCredIdeas(filterType?: string) {
  const [credIdeas, setCredIdeas] = useState<CredIdea[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCredIdeas = useCallback(async () => {
    try {
      const url = filterType
        ? `/api/cred-ideas?type=${filterType}`
        : "/api/cred-ideas";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch ideas");
      const data = await response.json();
      setCredIdeas(data);
    } catch (err) {
      setError("Failed to load ideas. Please try again later.");
      console.error("Error fetching cred ideas:", err);
    } finally {
      setIsLoading(false);
    }
  }, [filterType]);

  useEffect(() => {
    fetchCredIdeas();
  }, [filterType, fetchCredIdeas]);

  const submitCredIdea = async (credIdeaData: Omit<CredIdea, "created_at">) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const submitResponse = await fetch("/api/cred-ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credIdeaData),
      });

      if (!submitResponse.ok) {
        throw new Error("Failed to submit idea");
      }

      // Refresh the ideas list after successful submission
      await fetchCredIdeas();

      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(`Failed to submit idea: ${errorMessage}`);
      console.error("Error submitting cred idea:", err);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    credIdeas,
    error,
    isLoading,
    isSubmitting,
    submitCredIdea,
    refreshIdeas: fetchCredIdeas,
  };
}

export default useCredIdeas;
