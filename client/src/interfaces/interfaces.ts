export interface ForumCardProps {
  title: string;
  author: any;
  comments: string[];
  tags: string[];
  content: string;
  lastActivity: string;
  ratings: number[];
  isDeleted: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}
