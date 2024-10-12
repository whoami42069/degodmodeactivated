import React from 'react';
import { Tweet } from '../types';
import { Heart, MessageCircle, Repeat } from 'lucide-react';

interface DehubProps {
  mostLiked: Tweet[];
  mostCommented: Tweet[];
  mostRetweeted: Tweet[];
  darkMode: boolean;
}

const Dehub: React.FC<DehubProps> = ({ mostLiked, mostCommented, mostRetweeted, darkMode }) => {
  const renderTweetList = (tweets: Tweet[], title: string, icon: React.ReactNode) => (
    <div className="mb-8">
      <h3 className={`text-xl font-bold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-blue-600'}`}>
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      <ul className="space-y-4">
        {tweets.map((tweet) => (
          <li key={tweet.id} className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow`}>
            <div className="flex items-center mb-2">
              <img src={tweet.author.profilePicture} alt={tweet.author.name} className="w-10 h-10 rounded-full mr-3" />
              <span className="font-semibold">{tweet.author.name}</span>
            </div>
            <p>{tweet.content}</p>
            <div className="mt-2 flex items-center text-sm">
              <span className="mr-4"><Heart size={16} className="inline mr-1" /> {tweet.likes}</span>
              <span className="mr-4"><MessageCircle size={16} className="inline mr-1" /> {tweet.comments}</span>
              <span><Repeat size={16} className="inline mr-1" /> {tweet.retweets}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-blue-50 to-purple-50'} p-6 rounded-lg shadow-lg`}>
      <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-blue-600'}`}>Dehub</h2>
      {renderTweetList(mostLiked, "Most Liked Posts", <Heart className="text-red-500" />)}
      {renderTweetList(mostCommented, "Most Commented Posts", <MessageCircle className="text-green-500" />)}
      {renderTweetList(mostRetweeted, "Most Retweeted Posts", <Repeat className="text-blue-500" />)}
    </div>
  );
};

export default Dehub;