import type { RowDataPacket } from "mysql2";
import type { Languages } from "../enums/languages.enum.js";

export default interface Movie extends RowDataPacket {
  id?: number;
  original_title: string;
  english_title: string;
  submittedAt?: Date;
  youtubeUrl: string;
  coverImage: string;
  duration: number;
  isHybrid: boolean;
  language: Languages;
  originalSynopsis: string;
  englishSynopsis: string;
  creativeProcess: string;
  iaTools: string;
  hasSubs: boolean;
  srt: string | null;
  status: 'draft' | 'published' | 'archived';
}
