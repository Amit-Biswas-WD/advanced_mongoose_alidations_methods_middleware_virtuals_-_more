export interface INotes {
  title: string;
  content: string;
  category: "personal" | "group" | "single";
  pinned: boolean;
  tags: { level: string; color: string };
}
