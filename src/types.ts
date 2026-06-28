export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  cover?: string;
  bio?: string;
  badges?: string[];
  level?: number;
  xp?: number;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  video?: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  shares: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
}
