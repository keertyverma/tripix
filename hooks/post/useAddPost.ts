import { databaseService } from "@/services/databaseService";
import { useMutation } from "@tanstack/react-query";

export interface IAddPost {
  userId: string;
  username: string;
  title: string;
  description: string;
  date: string;
  city: string;
  country: string;
  photoUrl: string;
}

const useAddPost = () =>
  useMutation({
    mutationFn: (newPost: IAddPost) =>
      databaseService.createPost(newPost).then((res) => {
        return res;
      }),
  });

export default useAddPost;
