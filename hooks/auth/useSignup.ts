import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

const useSignup = () =>
  useMutation({
    // create user
    mutationFn: (data: SignupData) =>
      authService
        .createAccount(data.email, data.password, data.name)
        .then((res) => res),
  });

export default useSignup;
