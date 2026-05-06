import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="bg-[#FFFDF0] min-h-screen flex items-center justify-center p-4">
      <AuthForm type="login" />
    </div>
  );
}
