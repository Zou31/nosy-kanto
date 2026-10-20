export type SearchResult = {
  id: string;
  title: string;
  type: string;
};

export function search(query: string): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  return [];
}
