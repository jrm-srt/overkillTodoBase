export interface Todo {
  id: number | null;
  title: string;
  isClosed: boolean;
  creationDate: Date;
  closingDate?: Date;
  description?: string;
}
