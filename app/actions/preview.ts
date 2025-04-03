'use server';
import { getLinkPreview } from 'link-preview-js';

export async function getPreview(url: string) {
  await getLinkPreview(url, { followRedirects: 'follow' });
}
