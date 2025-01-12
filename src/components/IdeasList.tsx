import IdeaCard from "./IdeaCard";

interface CredIdea {
  name: string;
  description: string;
  criteria: string;
  verification_process: string;
  links: string;
  type: string;
  created_at: string;
}

interface IdeaListProps {
  ideas: CredIdea[];
  isLoading?: boolean;
  columns?: number;
}

export default function IdeaList({ ideas, isLoading, columns }: IdeaListProps) {
  if (isLoading) {
    return (
      <div className={`grid grid-cols-${columns} gap-6`}>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow rounded-lg animate-pulse border"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (ideas.length === 0) {
    return <p className="text-center text-gray-500">No ideas submitted yet.</p>;
  }

  return (
    <div className={`grid grid-cols-${columns} gap-6`}>
      {ideas.map((idea, index) => (
        <IdeaCard key={index} idea={idea} />
      ))}
    </div>
  );
}
