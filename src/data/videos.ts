// Published YouTube videos for /learn and the homepage video slot.
//
// To add a video, append one object to VIDEOS:
//   { title: 'Video title', youtubeId: 'abc123XYZ_-', topic: 'Find leads', publishedDate: '2026-10-10' }
// - youtubeId: the 11-character ID from the URL (youtube.com/watch?v=ID)
// - topic: exactly one of TOPICS below
// - publishedDate: YYYY-MM-DD. The newest video is shown on the homepage.
// While VIDEOS is empty, /learn is not generated and the menu and homepage slot stay hidden.

export const TOPICS = ['Find leads', 'Reach them', 'Lead mistakes', 'Who buys this', 'Behind the data'] as const;
export type Topic = (typeof TOPICS)[number];

export interface Video {
  title: string;
  youtubeId: string;
  topic: Topic;
  publishedDate: string;
}

export const VIDEOS: Video[] = [];
