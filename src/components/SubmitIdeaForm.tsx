import { useState } from "react";
import {
  Loader2,
  Type,
  FileText,
  ListChecks,
  CheckCircle2,
  Link,
} from "lucide-react";

interface FormData {
  name: string;
  description: string;
  criteria: string;
  verification_process: string;
  links: string;
  type: string;
}

interface SubmitIdeaFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}

const INITIAL_FORM_DATA: FormData = {
  name: "",
  description: "",
  criteria: "",
  verification_process: "",
  links: JSON.stringify({
    Etherscan: "https://etherscan.io/",
    DexTools: "https://www.dextools.io/",
  }),
  type: "",
};

export default function SubmitIdeaForm({
  onSubmit,
  isSubmitting,
}: SubmitIdeaFormProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [linkTags, setLinkTags] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "links") {
      const lastChar = value[value.length - 1];
      if (lastChar === ",") {
        const newLink = value.slice(0, -1).trim();
        try {
          new URL(newLink);
          setLinkTags([...linkTags, newLink]);
          const linksObject = parseLinks([...linkTags, newLink].join(","));
          setFormData((prev) => ({
            ...prev,
            links: JSON.stringify(linksObject),
          }));
          e.target.value = "";
          return;
        } catch {
          // Invalid URL, do nothing
        }
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const parseLinks = (linksStr: string) => {
    const links: Record<string, string> = {};
    linksStr.split(",").forEach((link) => {
      try {
        const url = new URL(link.trim());
        links[url.hostname] = url.toString();
      } catch {
        // Skip invalid URLs
      }
    });
    return links;
  };

  const removeLink = (linkToRemove: string) => {
    const newTags = linkTags.filter((link) => link !== linkToRemove);
    setLinkTags(newTags);
    const linksObject = parseLinks(newTags.join(","));
    setFormData((prev) => ({
      ...prev,
      links: JSON.stringify(linksObject),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      type: "submitted",
    });
  };

  return (
    <div className="bg-white p-8 rounded-xl max-w-2xl mx-auto border">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Type className="h-4 w-4" />
            Name of Your Idea
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter a concise name for your idea"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            rows={4}
            placeholder="Describe your idea in detail"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <ListChecks className="h-4 w-4" />
            Criteria
          </label>
          <textarea
            name="criteria"
            value={formData.criteria}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            rows={3}
            placeholder="List the criteria for your idea"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Verification Process
          </label>
          <textarea
            name="verification_process"
            value={formData.verification_process}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            rows={3}
            placeholder="Describe how this idea can be verified"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Link className="h-4 w-4" />
            Related Links
          </label>
          <div className="space-y-2">
            <input
              type="text"
              name="links"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Add links and press comma to add them"
            />
            <div className="flex flex-wrap gap-2">
              {linkTags.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                >
                  <span>{new URL(link).hostname}</span>
                  <button
                    type="button"
                    onClick={() => removeLink(link)}
                    className="hover:text-blue-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-8"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
              Submitting...
            </span>
          ) : (
            "Submit Idea"
          )}
        </button>
      </form>
    </div>
  );
}
