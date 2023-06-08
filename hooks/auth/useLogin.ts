import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services";

interface LoginData {
  email: string;
  password: string;
}

const useLogin = () =>
  useMutation({
    // login with email and password
    mutationFn: (data: LoginData) =>
      authService.login(data.email, data.password).then((res) => res),
  });

export default useLogin;
