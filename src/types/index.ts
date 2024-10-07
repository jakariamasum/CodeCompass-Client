export interface IUser {
  _id: string;
  fname: string;
  lname: string;
  role: string;
  email: string;
  profilePic?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IPost {
  _id: string;
  user: string;
  image?: string;
  title: string;
  content: string;
  category: string;
  isPremium: boolean;
  tags: string[];
  likes: number;
  dislikes: number;
}
