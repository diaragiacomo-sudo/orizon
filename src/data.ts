import { User, Post, QuizQuestion } from './types';

export const currentUser: User = {
  id: 'u1',
  name: 'Mario Rossi',
  username: 'mariorossi',
  avatar: 'https://i.pravatar.cc/150?u=mario',
  cover: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=2000&q=80',
  bio: 'Appassionato di tecnologia e fotografia. 📸💻',
  badges: ['Nuovo Utente', 'Fotografo'],
  level: 5,
  xp: 1200,
};

export const initialPosts: Post[] = [
  {
    id: 'p1',
    author: {
      id: 'u2',
      name: 'Giulia Bianchi',
      username: 'giulia_b',
      avatar: 'https://i.pravatar.cc/150?u=giulia',
      badges: ['Moderatore']
    },
    content: 'Oggi è una giornata bellissima per imparare qualcosa di nuovo! ☀️ Che progetti avete per il weekend?',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    likes: 24,
    comments: [
      {
        id: 'c1',
        author: { id: 'u3', name: 'Luca Neri', username: 'lucan', avatar: 'https://i.pravatar.cc/150?u=luca' },
        content: "Io andrò a fare un'escursione in montagna! ⛰️",
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        likes: 3
      }
    ],
    shares: 2
  },
  {
    id: 'p2',
    author: {
      id: 'u4',
      name: 'Orizon Official',
      username: 'orizon_app',
      avatar: 'https://i.pravatar.cc/150?u=orizon',
      badges: ['Ufficiale']
    },
    content: 'Benvenuti su Orizon! Siamo felici di annunciare il lancio della nostra nuova piattaforma. Esplora, connettiti e condividi le tue passioni! 🚀',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    likes: 156,
    comments: [],
    shares: 12
  }
];

export const trendingTags = [
  { tag: 'OrizonLaunch', posts: '5.4K' },
  { tag: 'Fotografia', posts: '2.2K' },
  { tag: 'TechNews', posts: '1.1K' },
  { tag: 'Weekend', posts: '900' },
  { tag: 'SviluppoWeb', posts: '450' },
];

export const suggestedFriends = [
  { id: 's1', name: 'Sara Verdi', username: 'sara_v', avatar: 'https://i.pravatar.cc/150?u=sara', mutual: 12 },
  { id: 's2', name: 'Alessandro M.', username: 'ale_m', avatar: 'https://i.pravatar.cc/150?u=ale', mutual: 8 },
  { id: 's3', name: 'Elena B.', username: 'ele_b', avatar: 'https://i.pravatar.cc/150?u=elena', mutual: 5 },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Qual è il pianeta più grande del nostro sistema solare?',
    options: ['Terra', 'Marte', 'Giove', 'Saturno'],
    correctOptionIndex: 2
  },
  {
    id: 'q2',
    question: 'Chi ha dipinto la Gioconda?',
    options: ['Michelangelo', 'Leonardo da Vinci', 'Raffaello', 'Caravaggio'],
    correctOptionIndex: 1
  },
  {
    id: 'q3',
    question: 'In che anno è stato lanciato il World Wide Web al pubblico?',
    options: ['1989', '1991', '1995', '1998'],
    correctOptionIndex: 1
  }
];
