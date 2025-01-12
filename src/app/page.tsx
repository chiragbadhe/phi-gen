"use client";
import IdeaList from "@/components/IdeasList";
import useCredIdeas from "@/hooks/useCredIdeas";
import { Lightbulb } from "lucide-react";

export default function Home() {
  const { credIdeas, isLoading } = useCredIdeas();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Lightbulb className="text-yellow-500 w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Phi Protocol Cred Ideas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share and discover ideas for Web3 creds. Together we can build
            meaningful digital badges and achievements that recognize real
            accomplishments.
          </p>
        </div>
        <IdeaList ideas={credIdeas} isLoading={isLoading} />
      </div>
    </div>
  );
}
