import { databaseService } from "@/services/databaseService";
import { useQuery } from "@tanstack/react-query";

const fetchUserProfile = (userId: string) =>
  databaseService.getUserProfile(userId).then((res) => {
    let userProfile = null;
    if (res.documents?.[0]) {
      const profile = res.documents[0];
      userProfile = {
        id: profile.$id,
        name: profile.name,
        userId: profile.userId,
        bio: profile.bio || "",
        profilePicture: profile.profilePicture || "",
        photoId: profile.photoId || "",
      };
    }

    return userProfile;
  });

const useProfile = (userId: string) =>
  useQuery({
    queryKey: ["userProfile"],
    queryFn: () => fetchUserProfile(userId),
    refetchOnWindowFocus: true,
  });

export default useProfile;
