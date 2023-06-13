import { databaseService } from "@/services/databaseService";
import { useMutation } from "@tanstack/react-query";
import { IUpdatePost } from "@/entities";

const useUpdatePost = () =>
  useMutation({
    mutationFn: (updatedPost: IUpdatePost) =>
      databaseService.updatePost(updatedPost.id, updatedPost.data),
  });

export default useUpdatePost;
