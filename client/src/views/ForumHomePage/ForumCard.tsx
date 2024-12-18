import React from 'react';
import { MessageSquare, Clock } from 'lucide-react';

interface ForumCardProps {
  title: string;
  author: string;
  replies: number;
  lastActivity: string;
  category: string;
  excerpt: string;
}

export function ForumCard({ title, author, replies, lastActivity, category, excerpt }: ForumCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
            {category}
          </span>
          <h3 className="mt-2 text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
            {title}
          </h3>
          <p className="mt-2 text-gray-600 line-clamp-2">{excerpt}</p>
          <p className="mt-2 text-sm text-gray-500">Posted by {author}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-1" />
            <span>{replies} replies</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{lastActivity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}