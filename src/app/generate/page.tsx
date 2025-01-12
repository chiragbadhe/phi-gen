"use client";
import IdeaForm from "@/components/IdeaForm";
import ErrorMessage from "@/components/ErrorMessage";
import { useGenerateIdea } from "@/hooks/useGenerateIdea";
import { Sparkles, Lightbulb } from "lucide-react";
import IdeaList from "@/components/IdeasList";
import useCredIdeas from "@/hooks/useCredIdeas";

export default function GeneratePage() {
  const { rawIdea, setRawIdea, isLoading, error, handleGenerateIdea } =
    useGenerateIdea();

  const { credIdeas, isLoading: isLoadingCredIdeas } =
    useCredIdeas("generated");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Sparkles className="text-yellow-500 w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Generate Ideas For Creds
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Use AI to help structure and format your creds ideas. Enter a
            description or get inspiration from randomly generated ideas.
          </p>
        </div>
        {error && (
          <div className="mx-auto mb-8">
            <ErrorMessage message={error} />
          </div>
        )}
        <div className="mx-auto">
          <IdeaForm
            rawIdea={rawIdea}
            onRawIdeaChange={setRawIdea}
            onGenerate={handleGenerateIdea}
            isLoading={isLoading}
          />
        </div>
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Recently Generated Ideas
            </h2>
          </div>
          <div className="">
            <IdeaList
              ideas={credIdeas}
              isLoading={isLoadingCredIdeas}
              columns={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
