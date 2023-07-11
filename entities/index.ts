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

export interface IUpdatePost {
  id: string;
  data: {
    title: string;
    description: string;
    date: string;
    city: string;
    country: string;
  };
}

export interface IUpdateProfile {
  id: string;
  data: {
    bio?: string;
    profilePicture?: string | null;
    photoId?: string;
  };
}

export interface IAddProfile {
  name: string;
  userId: string;
}
