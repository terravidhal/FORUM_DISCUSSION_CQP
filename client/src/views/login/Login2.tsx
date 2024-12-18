import { useLogin } from "@/api/services";
import Form from "./Form";
import SubmitButton from "./SubmitButton";
import { toast } from "sonner";

export default function Login2() {
  const { loginMutation } = useLogin();

  const handleSubmitLogin = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) {
      toast.error("please fill all required fields");
      return;
    }
    loginMutation({ email, password });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
        </div>
        <Form values={handleSubmitLogin}>
          <SubmitButton>Sign in</SubmitButton>
        </Form>
      </div>
    </div>
  );
}
