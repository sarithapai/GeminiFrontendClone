import { OtpForm } from "@/components/OtpForm";

export default function SignInPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Login via OTP</h1>
      <OtpForm />
    </main>
  );
}
