export interface Category {
  id: string;
  name: string;
  description: string;
  created_at: string;
  is_private: boolean;
  is_locked: boolean;
}

export interface CategoryWithTopics extends Category {
  topics: Topic[];
  total_topics: number;
  page: number;
  per_page: number;
  total_pages: number;
}