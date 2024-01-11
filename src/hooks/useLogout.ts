import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store";
import { logout } from "../http/api";

const useLogout = () => {
  const { logoutUser } = useAuthStore();

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      logoutUser();
      return;
    },
  });

  return { logoutMutate };
};

export default useLogout;
