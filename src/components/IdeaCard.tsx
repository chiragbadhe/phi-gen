import {
  Award,
  CheckCircle2,
  ExternalLink,
  Calendar,
  FileText,
  Tag,
} from "lucide-react";

interface CredIdea {
  name: string;
  description: string;
  criteria: string;
  verification_process: string;
  links: string;
  type: string;
  created_at: string;
}

interface IdeaCardProps {
  idea: CredIdea;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const formattedDate = new Date(idea.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Parse JSON string to object if it's in JSON format
  let linksObject = {};
  try {
    linksObject = idea.links ? JSON.parse(idea.links) : {};
  } catch {
    // If parsing fails, treat as comma-separated URLs
    const links = idea.links
      ? idea.links
          .split(",")
          .map((link) => {
            try {
              const url = new URL(link.trim());
              return url.toString();
            } catch {
              return null;
            }
          })
          .filter(Boolean)
      : [];
    links.forEach((link) => {
      if (link) {
        (linksObject as Record<string, string>)[new URL(link).hostname] = link;
      }
    });
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 border ">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 rounded-md">
            <Award className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            {idea.name}
          </h3>
        </div>
        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium flex items-center gap-1">
          <Tag className="w-3 h-3" />
          {idea.type}
        </span>
      </div>

      <div className="space-y-3">
        <div className="group">
          <div className="flex items-center gap-1.5 mb-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <h4 className="font-medium text-sm text-gray-700">Description</h4>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed pl-5 whitespace-pre-line">
            {idea.description}
          </p>
        </div>

        <div className="group">
          <div className="flex items-center gap-1.5 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <h4 className="font-medium text-sm text-gray-700">Criteria</h4>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed pl-5 whitespace-pre-line">
            {idea.criteria}
          </p>
        </div>

        <div className="group">
          <div className="flex items-center gap-1.5 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <h4 className="font-medium text-sm text-gray-700">
              Verification Process
            </h4>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed pl-5 whitespace-pre-line">
            {idea.verification_process}
          </p>
        </div>

        {Object.keys(linksObject).length > 0 && (
          <div className="group">
            <div className="flex items-center gap-1.5 mb-2">
              <ExternalLink className="w-4 h-4 text-blue-600" />
              <h4 className="font-medium text-sm text-gray-700">Links</h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pl-5">
              {Object.entries(linksObject).map(([name, url], index) => (
                <a
                  key={index}
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-blue-50 rounded-md text-sm text-blue-600 hover:text-blue-700 transition-colors group"
                >
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="truncate">{name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-3 mt-3 border-t border-gray-100">
          <Calendar className="w-3 h-3" />
          <time dateTime={idea.created_at}>Posted {formattedDate}</time>
        </div>
      </div>
    </div>
  );
}
