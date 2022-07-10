export interface Todo {
  id: number;
  title: string;
  isClosed: boolean;
  closedDate?: Date;
  description?: string;
}
