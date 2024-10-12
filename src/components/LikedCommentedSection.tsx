import React, { useState } from 'react';
import { Tweet, Comment } from '../types';
import { Heart, MessageCircle } from 'lucide-react';

interface LikedCommentedSectionProps {
  likedTweets: Tweet[];
  userComments: Comment[];
  darkMode: boolean;
}

const LikedCommentedSection: React.FC<LikedCommentedSectionProps> = ({ likedTweets, userComments, darkMode }) => {
  const [showLiked, setShowLiked] = useState(false);
  const [showCommented, setShowCommented] = useState(false);

  const toggleLiked = () => {
    setShowLiked(!showLiked);
    setShowCommented(false);
  };

  const toggleCommented = () => {
    setShowCommented(!showCommented);
    setShowLiked(false);
  };

  return (
    <div className="mt-8 w-full max-w-md">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={toggleLiked}
          className={`px-6 py-3 rounded-full flex items-center ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'
          } text-${darkMode ? 'white' : 'black'} transition-colors duration-300`}
        >
          <Heart size={20} className="mr-2" />
          Liked
        </button>
        <button
          onClick={toggleCommented}
          className={`px-6 py-3 rounded-full flex items-center ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'
          } text-${darkMode ? 'white' : 'black'} transition-colors duration-300`}
        >
          <MessageCircle size={20} className="mr-2" />
          Commented
        </button>
      </div>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showLiked || showCommented ? 'max-h-96' : 'max-h-0'}`}>
        {showLiked && (
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4">Liked Tweets</h3>
            <ul className="space-y-3">
              {likedTweets.map((tweet) => (
                <li key={tweet.id} className="text-sm">
                  <span className="font-medium">{tweet.author.name}:</span> {tweet.content.substring(0, 50)}...
                </li>
              ))}
            </ul>
          </div>
        )}
        {showCommented && (
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4">Your Comments</h3>
            <ul className="space-y-3">
              {userComments.map((comment) => (
                <li key={comment.id} className="text-sm">
                  {comment.content.substring(0, 50)}...
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedCommentedSection;