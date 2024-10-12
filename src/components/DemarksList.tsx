import React from 'react';
import { Tweet } from '../types';
import { Bookmark } from 'lucide-react';

interface DemarksListProps {
  demarks: Tweet[];
  darkMode: boolean;
}

const DemarksList: React.FC<DemarksListProps> = ({ demarks, darkMode }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-green-50 to-blue-50 text-green-600'} p-6 rounded-lg shadow-lg`}>
      <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center">
        <Bookmark className="mr-2" />
        Your Demarks
      </h2>
      {demarks.length === 0 ? (
        <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>You haven't demarked any tweets yet.</p>
      ) : (
        <ul className="space-y-4">
          {demarks.map((tweet) => (
            <li key={tweet.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow`}>
              <div className="flex items-center mb-2">
                <img src={tweet.author.profilePicture} alt={tweet.author.name} className="w-10 h-10 rounded-full mr-3" />
                <span className="font-semibold">{tweet.author.name}</span>
              </div>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-800'}>{tweet.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DemarksList;