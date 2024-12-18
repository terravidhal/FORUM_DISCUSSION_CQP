import React, { useState } from 'react';
import { PlusCircle, User } from 'lucide-react';
import { ForumCard } from './ForumCard';
import { SearchBar } from './SearchBar';
import { Pagination } from './Pagination';
import UserProfil  from '../dashboard/thisComponents/User';



const MOCK_DISCUSSIONS = [
  {
    id: 1,
    title: "Getting Started with React and TypeScript",
    author: "Sarah Johnson",
    replies: 23,
    lastActivity: "2h ago",
    category: "React",
    excerpt: "Hello everyone! I'm new to React and TypeScript and would love some guidance on best practices for starting a new project..."
  },
  {
    id: 2,
    title: "State Management Patterns in 2024",
    author: "Mike Chen",
    replies: 45,
    lastActivity: "4h ago",
    category: "Architecture",
    excerpt: "Let's discuss modern state management approaches. What are you using in your projects and why?"
  },
  {
    id: 3,
    title: "Tailwind CSS Tips and Tricks",
    author: "Emma Wilson",
    replies: 32,
    lastActivity: "1d ago",
    category: "CSS",
    excerpt: "Share your favorite Tailwind CSS tricks and productivity boosters. Here are some of mine..."
  },
  {
    id: 4,
    title: "Web Performance Optimization",
    author: "Alex Kumar",
    replies: 56,
    lastActivity: "2d ago",
    category: "Performance",
    excerpt: "What strategies are you using to optimize your web applications? Let's share some insights..."
  }
];

const ForumHomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  return (

    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Discussion Forum</h1>
        </div>

        <div className="flex items-center space-x-4 mb-8">
          <div className="flex-1">
            <SearchBar onSearch={setSearchQuery} />
          </div>
          
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <PlusCircle className="h-5 w-5 mr-2" />
            New Subject
          </button>
          
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <UserProfil />
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {MOCK_DISCUSSIONS.map((discussion) => (
            <ForumCard key={discussion.id} {...discussion} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default ForumHomePage;