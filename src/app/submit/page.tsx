"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SubmitIdeaForm from "@/components/SubmitIdeaForm";
import ErrorMessage from "@/components/ErrorMessage";
import useCredIdeas from "@/hooks/useCredIdeas";
import IdeaList from "@/components/IdeasList";
import { PenSquare, Lightbulb } from "lucide-react";

interface FormData {
  name: string;
  description: string;
  criteria: string;
  verification_process: string;
  links: string;
  type: string;
}

export default function SubmitPage() {
  const router = useRouter();
  const {
    credIdeas,
    error: hookError,
    isLoading,
    isSubmitting,
    submitCredIdea,
  } = useCredIdeas("submitted");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await submitCredIdea(formData);

      if (result.success) {
        router.push("/");
      } else {
        setError("Failed to submit idea. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const errorMessage = error || hookError || null;

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <PenSquare className="text-yellow-500 w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Submit Your Cred Ideas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your idea for a Phi Protocol Cred! Submit unique Web3 creds
            that verify on-chain achievements and actions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <SubmitIdeaForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
          <aside className="max-h-[900px] overflow-y-auto">
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Recently Submitted Ideas
              </h2>
            </div>
            <IdeaList ideas={credIdeas} isLoading={isLoading} columns={1} />
          </aside>
        </div>
      </div>
    </main>
  );
}
