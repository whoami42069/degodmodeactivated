export interface Tweet {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    profilePicture: string;
  };
  likes: number;
  comments: number;
  retweets: number;
  createdAt: number; // Timestamp in milliseconds
}

export interface User {
  id: string;
  name: string;
  profilePicture: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  tweetId: string;
}