// The "WELCOME BACK!" login card (Figma hero). Uses RHF + Zod + TanStack mutation.
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { loginSchema } from "@/features/auth/loginSchema";
import { useLogin } from "@/features/auth/useLogin";
import Logo from "@/components/ui/Logo";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

export default function LoginCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema), mode: "onBlur" });

  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (values) => login.mutate(values);

  return (
    <motion.div
      id="login"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md rounded-3xl border border-white/60 bg-white/95 p-8 shadow-panel backdrop-blur-sm dark:border-velvet/60 dark:bg-night-surface/95 sm:p-10"
    >
      <div className="flex flex-col items-center text-center">
        <Logo className="h-9" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink dark:text-white">WELCOME BACK!</h1>
        <p className="mt-1.5 text-sm text-muted dark:text-white/60">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5" noValidate>
        <TextField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your Email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextField
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your Password"
          autoComplete="current-password"
          error={errors.password?.message}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="text-muted transition-colors hover:text-velvet"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          }
          {...register("password")}
        />

        <div className="-mt-1 flex justify-end">
          <a href="#reset" className="text-xs font-medium text-velvet hover:underline">
            Forgot password?
          </a>
        </div>

        <Button type="submit" variant="primary" disabled={login.isPending} className="w-full">
          {login.isPending ? <Spinner /> : "Login"}
        </Button>
      </form>

      {/* "Continue with Google" temporarily disabled.
      <div className="my-4 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-line" />
        OR
        <span className="h-px flex-1 bg-line" />
      </div>

      <Button
        variant="outline"
        className="w-full"
        disabled={login.isPending}
        onClick={() => login.mutate({ provider: "google" })}
      >
        <FcGoogle className="text-lg" /> Continue with Google
      </Button>
      */}
    </motion.div>
  );
}
