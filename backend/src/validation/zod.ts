// set up zod validation in ts
import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, '1 minimum character').max(255, 'Title is too long'),
});

export const loginSchema = z.object({
  username: z.string().min(1, 'Username: 1 minimum character').max(255, 'Username is too long'),
  password: z.string().min(1, 'Password: 1 minimum character').max(255, 'Password is too long'),
});
