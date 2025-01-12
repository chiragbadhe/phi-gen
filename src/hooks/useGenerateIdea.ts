import { useState } from "react";

interface CredIdea {
  name: string;
  description: string;
  criteria: string;
  verification_process: string;
  links: string;
  type: string;
  created_at: string;
}

export function useGenerateIdea() {
  const [rawIdea, setRawIdea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateIdea = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Generate the idea
      const generateResponse = await fetch("/api/generateIdea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawIdea }),
      });

      if (!generateResponse.ok) {
        throw new Error("Failed to generate idea. Please try again.");
      }

      const { formattedIdea }: { formattedIdea: CredIdea } =
        await generateResponse.json();

      // Save the generated idea
      const saveResponse = await fetch("/api/cred-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedIdea),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save idea. Please try again.");
      }

      setRawIdea("");
      // Reload the page to show the new idea
      window.location.reload();
    } catch (error) {
      console.error("Error generating/saving idea:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    rawIdea,
    setRawIdea,
    isLoading,
    error,
    handleGenerateIdea,
  };
}
