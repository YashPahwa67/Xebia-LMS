// "Get In Touch" contact form — replaces the accordion in the Contact section.
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { contactSchema } from "@/features/contact/contactSchema";
import TextField from "@/components/ui/TextField";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema), mode: "onBlur" });

  const onSubmit = async (values) => {
    // Mock send (no backend). Simulate latency + prevent duplicate submits.
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Thanks! Your message has been sent.");
    reset();
    return values;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-2xl bg-white p-6 shadow-card dark:bg-night-surface sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField
          variant="stacked"
          id="firstName"
          label="First Name"
          placeholder="Enter First Name"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <TextField
          variant="stacked"
          id="lastName"
          label="Last Name"
          placeholder="Enter Last Name"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
        <TextField
          variant="stacked"
          id="contactEmail"
          type="email"
          label="Email"
          placeholder="Enter your Email"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextField
          variant="stacked"
          id="phone"
          label="Phone"
          placeholder="Enter Phone Number"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <TextField
        variant="stacked"
        id="subject"
        label="Subject"
        placeholder="Enter your Subject"
        error={errors.subject?.message}
        className="mt-5"
        {...register("subject")}
      />

      <TextArea
        id="message"
        label="Message"
        placeholder="Enter your Message here..."
        rows={5}
        error={errors.message?.message}
        className="mt-5"
        {...register("message")}
      />

      <Button
        type="submit"
        variant="emerald"
        disabled={isSubmitting}
        className="mt-6 w-full !py-4 text-base"
      >
        {isSubmitting ? <Spinner /> : "Send Your Message"}
      </Button>
    </form>
  );
}
