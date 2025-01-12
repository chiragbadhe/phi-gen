import React, { useState } from "react";
import { Lightbulb, Sparkles, Link } from "lucide-react";
import Button from "../components/Button";

interface IdeaFormProps {
  rawIdea: string;
  onRawIdeaChange: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const IdeaForm: React.FC<IdeaFormProps> = ({
  rawIdea,
  onRawIdeaChange,
  onGenerate,
  isLoading,
}) => {
  const [ideaType, setIdeaType] = useState<"suggestion" | "random">(
    "suggestion"
  );

  const handleGenerate = () => {
    // Clear input if generating random idea
    if (ideaType === "random") {
      onRawIdeaChange("");
    }
    onGenerate();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-4">
        <label
          htmlFor="idea-input"
          className="block text-gray-700 font-medium mb-2"
        >
          Describe your credential idea
        </label>
        <p className="text-gray-600 text-sm mb-4">
          Enter a brief description or link related to your credential idea.
          We&apos;ll help format it into a structured proposal. You can also generate
          random ideas!
        </p>
        <textarea
          id="idea-input"
          value={rawIdea}
          onChange={(e) => onRawIdeaChange(e.target.value)}
          placeholder="Enter your idea description or paste relevant links here..."
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 min-h-[150px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          disabled={isLoading}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-600 text-sm">
          <Lightbulb className="w-4 h-4 mr-2" />
          <span>AI will help structure your idea</span>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => {
              setIdeaType("suggestion");
              handleGenerate();
            }}
            isDisabled={!rawIdea.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <Link className="w-4 h-4" />
            {isLoading && ideaType === "suggestion"
              ? "Generating..."
              : "Generate from Input"}
          </Button>
          <Button
            onClick={() => {
              setIdeaType("random");
              handleGenerate();
            }}
            isDisabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {isLoading && ideaType === "random"
              ? "Generating..."
              : "Generate Random"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IdeaForm;
