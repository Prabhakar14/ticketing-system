export interface StatusColumnModel {
  id: string;
  name: string;
  statusId: string;
  tickets: Array<TicketModel>;
}

export interface TicketModel {
  id: number;
  key: string;
  title: string;
  description: string;
  statusId: string;
  comments?: Array<CommentModel>
}

export interface CommentModel {
  commentText: string,
  date: string;
}