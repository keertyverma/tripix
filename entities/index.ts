export interface IPost {
  id: string;
  title: string;
  description: string;
  userId: string;
  username: string;
  date: string;
  city: string;
  country: string;
  photoUrl: string;
}

export interface Country {
  code: string;
  name: string;
}
