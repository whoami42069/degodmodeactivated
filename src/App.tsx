import React, { useState, useEffect } from 'react';
import TweetCard from './components/TweetCard';
import { Tweet, User, Comment } from './types';
import DehubPage from './components/DehubPage';
import LikedCommentedSection from './components/LikedCommentedSection';
import Header from './components/Header';
import { Sun, Moon, Disc } from 'lucide-react';

// Mock data for tweets
const mockTweets: Tweet[] = [
  {
    id: '1',
    content: 'This is the oldest tweet!',
    author: {
      id: 'user1',
      name: 'John Doe',
      profilePicture: 'https://source.unsplash.com/random/100x100?face',
    },
    likes: 10,
    comments: 5,
    retweets: 3,
    createdAt: Date.now() - 1000 * 60 * 60 * 23, // 23 hours ago
  },
  {
    id: '2',
    content: 'This is a middle tweet!',
    author: {
      id: 'user2',
      name: 'Jane Smith',
      profilePicture: 'https://source.unsplash.com/random/100x100?face',
    },
    likes: 15,
    comments: 7,
    retweets: 4,
    createdAt: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
  },
  {
    id: '3',
    content: 'This is the newest tweet!',
    author: {
      id: 'user3',
      name: 'Bob Johnson',
      profilePicture: 'https://source.unsplash.com/random/100x100?face',
    },
    likes: 20,
    comments: 10,
    retweets: 5,
    createdAt: Date.now() - 1000 * 60 * 30, // 30 minutes ago
  },
];

function App() {
  const [tweets, setTweets] = useState<Tweet[]>(mockTweets);
  const [currentTweetIndex, setCurrentTweetIndex] = useState(0);
  const [likedTweets, setLikedTweets] = useState<Tweet[]>([]);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [demarks, setDemarks] = useState<Tweet[]>([]);
  const [showDehub, setShowDehub] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [discoMode, setDiscoMode] = useState(false);
  const [isDeGodMode, setIsDeGodMode] = useState(false);

  useEffect(() => {
    if (discoMode) {
      const interval = setInterval(() => {
        document.body.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
      }, 1000);
      return () => clearInterval(interval);
    } else {
      document.body.style.backgroundColor = '';
    }
  }, [discoMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTweets(prevTweets => prevTweets.filter(tweet => now - tweet.createdAt < 24 * 60 * 60 * 1000));
      setLikedTweets(prevLiked => prevLiked.filter(tweet => now - tweet.createdAt < 24 * 60 * 60 * 1000));
      setDemarks(prevDemarks => prevDemarks.filter(tweet => now - tweet.createdAt < 24 * 60 * 60 * 1000));
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setDiscoMode(false);
  };

  const toggleDiscoMode = () => {
    setDiscoMode(!discoMode);
    if (!discoMode) {
      setDarkMode(false);
    }
  };

  const toggleDehub = () => {
    setShowDehub(!showDehub);
  };

  const handleLike = (tweetId: string) => {
    const likedTweet = tweets.find(tweet => tweet.id === tweetId);
    if (likedTweet && !likedTweets.some(tweet => tweet.id === tweetId)) {
      setLikedTweets([...likedTweets, likedTweet]);
    }
  };

  const handleDemark = (tweetId: string) => {
    const demarkedTweet = tweets.find(tweet => tweet.id === tweetId);
    if (demarkedTweet && !demarks.some(tweet => tweet.id === tweetId)) {
      setDemarks([...demarks, demarkedTweet]);
    }
  };

  const handlePass = () => {
    setCurrentTweetIndex((prevIndex) => (prevIndex + 1) % tweets.length);
  };

  const handleComment = (tweetId: string, commentContent: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content: commentContent,
      author: { id: 'currentUser', name: 'Current User', profilePicture: '' },
      tweetId: tweetId,
    };
    setUserComments([...userComments, newComment]);
  };

  const handleNext = () => {
    setCurrentTweetIndex((prevIndex) => (prevIndex + 1) % tweets.length);
  };

  const handlePrevious = () => {
    setCurrentTweetIndex((prevIndex) => (prevIndex - 1 + tweets.length) % tweets.length);
  };

  const handleDeGodModeLogin = () => {
    // Simulating a login process
    setTimeout(() => {
      setIsDeGodMode(true);
    }, 1000);
  };

  const handleOldest = () => {
    setCurrentTweetIndex(0); // Show the oldest tweet (first in the array)
  };

  const handleNewest = () => {
    setCurrentTweetIndex(tweets.length - 1); // Show the newest tweet (last in the array)
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex flex-col items-center py-8 px-4 transition-colors duration-300`}>
      <header className="mb-8 flex flex-col items-center w-full max-w-4xl">
        <div className="flex justify-between w-full mb-4">
          <button
            onClick={handleDeGodModeLogin}
            className={`px-4 py-2 rounded-full ${
              isDeGodMode
                ? "bg-yellow-500 text-black"
                : darkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-300 text-black"
            } transition-colors duration-300`}
          >
            {isDeGodMode ? "DeGod Mode Activated" : "Log in for DeGod mode"}
          </button>
          <div className="flex space-x-2">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-300">
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button onClick={toggleDiscoMode} className={`p-2 rounded-full ${discoMode ? 'bg-purple-500' : 'hover:bg-gray-700'} transition-colors duration-300`}>
              <Disc size={24} />
            </button>
          </div>
        </div>
        <Header darkMode={darkMode} />
        <div className="flex items-center justify-center w-full mt-4 space-x-4">
          <button
            onClick={handleOldest}
            className="px-6 py-3 rounded-full font-semibold bg-white text-black hover:bg-gray-200 transition-colors duration-300"
          >
            Oldest
          </button>
          <button
            onClick={handleNewest}
            className="px-6 py-3 rounded-full font-semibold bg-white text-black hover:bg-gray-200 transition-colors duration-300"
          >
            Newest
          </button>
          <button
            onClick={toggleDehub}
            className={`px-6 py-3 rounded-full font-semibold transition-colors ${
              showDehub
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            {showDehub ? "Back to Tweets" : "View Dehub"}
          </button>
        </div>
      </header>
      {showDehub ? (
        <DehubPage tweets={tweets} demarks={demarks} darkMode={darkMode} />
      ) : (
        <>
          {tweets.length > 0 ? (
            <TweetCard
              tweet={tweets[currentTweetIndex]}
              onLike={handleLike}
              onDemark={handleDemark}
              onPass={handlePass}
              onComment={handleComment}
              onNext={handleNext}
              onPrevious={handlePrevious}
              darkMode={darkMode}
            />
          ) : (
            <p className="text-center text-xl">No tweets available at the moment.</p>
          )}
          <LikedCommentedSection
            likedTweets={likedTweets}
            userComments={userComments}
            darkMode={darkMode}
          />
        </>
      )}
    </div>
  );
}

export default App;