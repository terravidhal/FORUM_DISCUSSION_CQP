import React, { useState } from "react";

const ToggleView: React.FC = () => {
  // État pour basculer entre la vue grille et liste
  const [isGridView, setIsGridView] = useState<boolean>(false);

  return (
    <div className="flex items-center space-x-2">
      <span className="font-semibold text-gray-700">View</span>
      <div className="flex">
        {/* Bouton Vue Liste */}
        <button
          className={`p-2 border rounded-l-md transition-colors duration-300 ${
            !isGridView
              ? "bg-blue-900 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
          onClick={() => setIsGridView(false)}
          aria-label="List View"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            {/* Icône Liste */}
            <div className="space-y-1">
              <div className="w-4 h-0.5 bg-current"></div>
              <div className="w-4 h-0.5 bg-current"></div>
              <div className="w-4 h-0.5 bg-current"></div>
            </div>
          </div>
        </button>

        {/* Bouton Vue Grille */}
        <button
          className={`p-2 border rounded-r-md transition-colors duration-300 ${
            isGridView
              ? "bg-blue-900 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
          onClick={() => setIsGridView(true)}
          aria-label="Grid View"
        >
          <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
            {/* Icône Grille */}
            <div className="w-2 h-2 bg-current"></div>
            <div className="w-2 h-2 bg-current"></div>
            <div className="w-2 h-2 bg-current"></div>
            <div className="w-2 h-2 bg-current"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ToggleView;
