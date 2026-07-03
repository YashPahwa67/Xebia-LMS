// Encapsulates login logic (mutation + redux + toast + navigation) away from UI.
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authService } from "@/services/authService";
import { setCredentials } from "@/store/slices/authSlice";

export function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload) =>
      payload.provider === "google"
        ? authService.loginWithGoogle()
        : authService.login(payload),
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      toast.success(`Welcome back, ${data.user.name}!`);
      // Route to the correct portal by role.
      const role = (data.user.role || "").toUpperCase();
      const dest =
        role === "ADMIN" ? "/admin"
        : role === "MANAGER" ? "/manager"
        : role === "ORGANISER" ? "/organiser"
        : role === "TRAINER" ? "/trainer"
        : role === "LEARNER" ? "/trainee"
        : "/app";
      navigate(dest, { replace: true });
    },
    onError: (err) => toast.error(err.message || "Login failed"),
  });
}
