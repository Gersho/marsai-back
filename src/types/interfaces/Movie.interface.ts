export default interface Movie {
  id?: number;
  originalTitle: string;
  englishTitle: string;
  submittedAt?: Date;
  youtubeUrl: string;
  coverImage: string;
  duration: number;
  isHybrid: boolean;
  language: 'FR' | 'EN';
  originalSynopsis: string;
  englishSynopsis: string;
  creativeProcess: string;
  iaTools: string;
  hasSubs: boolean;
  srt: string | null;
  status: 'draft' | 'published' | 'archived';
}
