'use server';

import { updateNumberOfLikes } from './prisma-db';
import { revalidatePath } from 'next/cache';

export async function likeMedia(mediaId, currentLikes, photographerId) {
  const newLikes = currentLikes + 1;
  await updateNumberOfLikes(mediaId, newLikes);
  revalidatePath(`/photographer/${photographerId}`);
  return newLikes;
}