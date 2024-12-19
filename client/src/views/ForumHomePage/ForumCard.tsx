import { MessageSquare, Clock } from "lucide-react";
import { ForumCardProps } from "@/interfaces/interfaces";




export function ForumCard({
  title,
  author,
  comments,
  tags,
  content,
  lastActivity,
  ratings,
  isDeleted,
}: ForumCardProps) {
  if (isDeleted) {
    return null; // Ne pas afficher le composant si le post est supprimé
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap space-x-2 mb-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="mt-2 text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
            {title}
          </h3>
          <p className="mt-2 text-gray-600 line-clamp-2">{content}</p>
          <p className="mt-2 text-sm text-gray-500">Posted by {author?.name}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-1" />
            <span>{comments?.length} comments</span>{" "}
            {/* Affiche le nombre de commentaires */}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{lastActivity}</span>{" "}
            {/* Vous pouvez formater cette date si nécessaire */}
          </div>
        </div>
      </div>
    </div>
  );
}
