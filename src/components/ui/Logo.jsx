// Xebia logo image (real brand asset).
import logo from "@/assets/images/logo.png";

export default function Logo({ className = "h-8" }) {
  return <img src={logo} alt="Xebia" className={`${className} w-auto object-contain`} />;
}
