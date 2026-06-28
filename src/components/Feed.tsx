import { useState, useEffect } from 'react';
import { PostCard } from './PostCard';
import { PostForm } from './PostForm';
import { initialPosts, currentUser } from '../data';
import { Post } from '../types';

export function Feed() {
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('orizon_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialPosts;
      }
    }
    return initialPosts;
  });

  useEffect(() => {
    localStorage.setItem('orizon_posts', JSON.stringify(posts));
  }, [posts]);

  const handleNewPost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: currentUser,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
      shares: 0,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="w-full flex flex-col items-center py-6">
      <PostForm onPost={handleNewPost} />
      <div className="space-y-6 w-full flex flex-col items-center">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
