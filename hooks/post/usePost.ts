import usePosts from "./usePosts";

const usePost = (id: string) => {
  const { data: posts } = usePosts();
  return posts?.find((post) => post.id === id);
};

export default usePost;
