import { databaseService } from "@/services/databaseService";
import { useQuery } from "@tanstack/react-query";

export interface IPost {
  id: string;
  title: string;
  description: string;
  userId: string;
  date: string;
  city: string;
  country: string;
  photoUrl: string;
}

const fetchPosts = () =>
  databaseService.getPosts().then((res) => {
    return res.documents?.map((post) => ({
      id: post.$id,
      title: post.title,
      description: post.description,
      userId: post.userId,
      date: post.date,
      city: post.city,
      country: post.country,
      photoUrl: post.photoUrl,
    }));
  });

const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    refetchOnWindowFocus: false,
  });

export default usePosts;
