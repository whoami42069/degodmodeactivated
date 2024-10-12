import React, { useState } from 'react';
import { MessageSquarePlus } from 'lucide-react';

interface TweetUploadProps {
  canUploadTweet: boolean;
  onTweetUpload: (tweetContent: string) => void;
  setCanUploadTweet: (value: boolean) => void;
  darkMode: boolean;
}

const TweetUpload: React.FC<TweetUploadProps> = ({ canUploadTweet, onTweetUpload, setCanUploadTweet, darkMode }) => {
  const [tweetContent, setTweetContent] = useState('');
  const [showUploadBox, setShowUploadBox] = useState(false);

  const handleTweetSubmit = () => {
    if (tweetContent.trim()) {
      onTweetUpload(tweetContent);
      setTweetContent('');
      setShowUploadBox(false);
    }
  };

  return (
    <div className="relative mb-4">
      <button
        onClick={() => setShowUploadBox(!showUploadBox)}
        className={`px-4 py-2 rounded-full flex items-center ${
          darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors duration-300`}
      >
        <MessageSquarePlus size={20} className="mr-2" />
        Upload Tweet
      </button>
      {showUploadBox && (
        <div className={`absolute top-full left-0 mt-2 p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <textarea
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
            placeholder="What's happening?"
            className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
            rows={3}
          />
          <button
            onClick={handleTweetSubmit}
            className={`mt-2 px-4 py-2 rounded-full ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors duration-300`}
          >
            Tweet
          </button>
        </div>
      )}
    </div>
  );
};

export default TweetUpload;