// Auth API service. Falls back to a mock when no backend is available (USE_MOCK_API).
import { api } from "@/services/axios";
import { USE_MOCK_API } from "@/config/env";

function mockLogin({ email }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Any non-empty password is accepted in mock mode except "wrong".
      if (email.includes("blocked")) {
        reject(new Error("This account is suspended. Contact your admin."));
        return;
      }
      // Derive a role from the email prefix so every portal is testable.
      const prefix = email.split("@")[0].toLowerCase();
      const role = prefix.includes("admin")
        ? "ADMIN"
        : prefix.includes("manager")
          ? "MANAGER"
          : prefix.includes("organiser") || prefix.includes("organizer")
            ? "ORGANISER"
            : prefix.includes("trainer")
              ? "TRAINER"
              : "LEARNER";
      resolve({
        token: "mock-jwt-token",
        user: { name: email.split("@")[0], email, role },
      });
    }, 700);
  });
}

export const authService = {
  async login(credentials) {
    if (USE_MOCK_API) return mockLogin(credentials);
    const { data } = await api.post("/auth/login", credentials);
    return data;
  },

  async loginWithGoogle() {
    if (USE_MOCK_API) {
      return new Promise((resolve) =>
        setTimeout(
          () => resolve({ token: "mock-google-token", user: { name: "Khushpreet", email: "khushpreet@xebia.com", role: "Learner" } }),
          700
        )
      );
    }
    const { data } = await api.post("/auth/google");
    return data;
  },
};
