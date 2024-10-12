import React, { useState } from 'react';
import { Tweet } from '../types';
import { ThumbsUp, X, MessageCircle, ArrowLeft, ArrowRight, Bookmark } from 'lucide-react';

interface TweetCardProps {
  tweet: Tweet;
  onLike: (tweetId: string) => void;
  onDemark: (tweetId: string) => void;
  onPass: () => void;
  onComment: (tweetId: string, comment: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  darkMode: boolean;
}

const TweetCard: React.FC<TweetCardProps> = ({ tweet, onLike, onDemark, onPass, onComment, onNext, onPrevious, darkMode }) => {
  const [comment, setComment] = useState('');

  const handleComment = () => {
    if (comment.trim()) {
      onComment(tweet.id, comment);
      setComment('');
    }
  };

  const timeLeft = () => {
    const msLeft = 24 * 60 * 60 * 1000 - (Date.now() - tweet.createdAt);
    const hoursLeft = Math.floor(msLeft / (60 * 60 * 1000));
    const minutesLeft = Math.floor((msLeft % (60 * 60 * 1000)) / (60 * 1000));
    return `${hoursLeft}h ${minutesLeft}m`;
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'} rounded-lg shadow-md p-6 max-w-md w-full transition-all duration-300 border-2`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img src={tweet.author.profilePicture} alt={tweet.author.name} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h3 className="font-bold text-lg">{tweet.author.name}</h3>
          </div>
        </div>
        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Expires in: {timeLeft()}
        </span>
      </div>
      <p className="mb-6 text-lg">{tweet.content}</p>
      <div className="flex justify-between mb-6">
        <button onClick={onPass} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors duration-300">
          <X size={24} />
        </button>
        <button onClick={() => onLike(tweet.id)} className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors duration-300">
          <ThumbsUp size={24} />
        </button>
        <button onClick={() => onDemark(tweet.id)} className={`${darkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} text-white p-3 rounded-full transition-colors duration-300`}>
          <Bookmark size={24} />
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors duration-300">
          <Bookmark size={24} />
        </button>
      </div>
      <div className="mb-6 flex items-center">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className={`flex-grow p-3 border rounded-lg mr-3 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <button onClick={handleComment} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors duration-300">
          <MessageCircle size={24} />
        </button>
      </div>
      <div className="flex justify-between">
        <button onClick={onPrevious} className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} p-3 rounded-lg transition-colors duration-300`}>
          <ArrowLeft size={24} />
        </button>
        <button onClick={onNext} className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} p-3 rounded-lg transition-colors duration-300`}>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default TweetCard;