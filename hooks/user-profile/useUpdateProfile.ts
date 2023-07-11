import { databaseService } from "@/services/databaseService";
import { useMutation } from "@tanstack/react-query";
import { IUpdateProfile } from "@/entities";

const useUpdateProfile = () =>
  useMutation({
    mutationFn: (toUpdateProfile: IUpdateProfile) =>
      databaseService.updateProfile(toUpdateProfile.id, toUpdateProfile.data),
  });

export default useUpdateProfile;
