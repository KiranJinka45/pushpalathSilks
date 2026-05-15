import AuthForm from "@/components/AuthForm";

export default function SignupPage() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      <AuthForm type="signup" />
    </div>
  );
}
