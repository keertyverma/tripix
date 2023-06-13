import { databaseService } from "@/services/databaseService";
import { useMutation } from "@tanstack/react-query";

const useDeletePost = () =>
  useMutation({
    mutationFn: (id: string) => databaseService.deletePostById(id),
  });

export default useDeletePost;
