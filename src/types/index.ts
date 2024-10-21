export interface IUser {
  _id: string;
  fname: string;
  lname: string;
  role: string;
  email: string;
  active: string;
  verified: string;
  following: number[];
  followers: number[];
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
  createdAt?: string;
  updatedAt?: string;
}

export interface IComment {
  _id: string;
  user: {
    fname: string;
    profilePic: string;
    _id: string;
  };
  content: string;
  post?: string;
  likes?: number;
  dislikes?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPayment {
  _id: string;
  paymentId: string;
  amount: number;
  currency: string;
  customerEmail: string;
  status: string;
  subscriptionId: string;
  productId: string;
  __v: number;
}
