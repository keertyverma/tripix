import { databaseService } from "@/services/databaseService";
import { useQuery } from "@tanstack/react-query";

const fetchUserProfile = (userId: string) =>
  databaseService.getUserProfile(userId).then((res) => {
    return res.documents?.[0] || [];
  });

const useProfile = (userId: string) =>
  useQuery({
    queryKey: ["userProfile"],
    queryFn: () => fetchUserProfile(userId),
    refetchOnWindowFocus: false,
  });

export default useProfile;
