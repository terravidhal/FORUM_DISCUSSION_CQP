import React, { useState } from 'react';
import { PlusCircle, User } from 'lucide-react';
import { ForumCard } from './ForumCard';
import { SearchBar } from './SearchBar';
import { Pagination } from './Pagination';
import UserProfil  from '../dashboard/thisComponents/User';
import { useSubjects } from '@/api/services2';



// const MOCK_DISCUSSIONS = [
//   {
//     title: "Getting Started with React and TypeScript",
//     author: "607f1f77bcf86cd799439011", // Remplacez par un ObjectId réel de l'auteur
//     Comments: [], // Remplacer par des ObjectIds de commentaires si nécessaire
//     tags: ["informatics, electronics"], // Catégorie "React" mappée sur "informatics"
//     content: "Hello everyone! I'm new to React and TypeScript and would love some guidance on best practices for starting a new project...",
//     ratings: [], // Ajouter des évaluations si nécessaire
//     isDeleted: false
//   },
//   {
//     title: "State Management Patterns in 2024",
//     author: "607f1f77bcf86cd799439012", // Remplacez par un ObjectId réel de l'auteur
//     Comments: [], // Remplacer par des ObjectIds de commentaires si nécessaire
//     tags: ["informatics"], // Catégorie "Architecture" mappée sur "informatics"
//     content: "Let's discuss modern state management approaches. What are you using in your projects and why?",
//     ratings: [], // Ajouter des évaluations si nécessaire
//     isDeleted: false
//   },
//   {
//     title: "Tailwind CSS Tips and Tricks",
//     author: "607f1f77bcf86cd799439013", // Remplacez par un ObjectId réel de l'auteur
//     Comments: [], // Remplacer par des ObjectIds de commentaires si nécessaire
//     tags: ["electronics"], // Catégorie "CSS" mappée sur "electronics"
//     content: "Share your favorite Tailwind CSS tricks and productivity boosters. Here are some of mine...",
//     ratings: [], // Ajouter des évaluations si nécessaire
//     isDeleted: false
//   },
//   {
//     title: "Web Performance Optimization",
//     author: "607f1f77bcf86cd799439014", // Remplacez par un ObjectId réel de l'auteur
//     Comments: [], // Remplacer par des ObjectIds de commentaires si nécessaire
//     tags: ["performance"], // Catégorie "Performance" mappée sur "performance"
//     content: "What strategies are you using to optimize your web applications? Let's share some insights...",
//     ratings: [], // Ajouter des évaluations si nécessaire
//     isDeleted: false
//   }
// ];


const ForumHomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const subjectsPerPage = 2;
  const {
    allSubjects,
    createSubjectMutation,
    voteSubjectMutation,
    deleteSubjectMutation,
    isOpenFormSubject,
    setIsOpenFormSubject,
    OneSubject,
    setIsLoadedSubject,
    isLoadedSubject,
    isLoadedDetailsSubject,
    setIsLoadedDetailsSubject,
  } = useSubjects();

  console.log("++++++++++++allSubjects", allSubjects);

  // Filtrage des sujets par recherche dans titre ou tags
  const filteredSubjects = allSubjects?.filter((subject:any) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const matchesTitle = subject.title.toLowerCase().includes(lowerCaseQuery);
    const matchesTags = subject.tags.some((tag:any) =>
      tag.toLowerCase().includes(lowerCaseQuery)
    );
    return matchesTitle || matchesTags;
  });

  // Calcul des pages totales
  const totalPages = Math.ceil(filteredSubjects?.length / subjectsPerPage);

  // Sujets affichés pour la page actuelle
  const displayedSubjects = filteredSubjects?.slice(
    (currentPage - 1) * subjectsPerPage,
    currentPage * subjectsPerPage
  );

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
          {displayedSubjects?.map((subject:any) => (
            <ForumCard key={subject.id} {...subject} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ForumHomePage;

