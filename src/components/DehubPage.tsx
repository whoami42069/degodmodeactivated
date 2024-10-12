import React from 'react';
import { Tweet } from '../types';
import Dehub from './Dehub';
import DemarksList from './DemarksList';

interface DehubPageProps {
  tweets: Tweet[];
  demarks: Tweet[];
  darkMode: boolean;
}

const DehubPage: React.FC<DehubPageProps> = ({ tweets, demarks, darkMode }) => {
  const getMostLiked = () => [...tweets].sort((a, b) => b.likes - a.likes).slice(0, 10);
  const getMostCommented = () => [...tweets].sort((a, b) => b.comments - a.comments).slice(0, 10);
  const getMostRetweeted = () => [...tweets].sort((a, b) => b.retweets - a.retweets).slice(0, 10);

  return (
    <div className="w-full max-w-4xl px-4 space-y-8">
      <Dehub
        mostLiked={getMostLiked()}
        mostCommented={getMostCommented()}
        mostRetweeted={getMostRetweeted()}
        darkMode={darkMode}
      />
      <DemarksList demarks={demarks} darkMode={darkMode} />
    </div>
  );
};

export default DehubPage;