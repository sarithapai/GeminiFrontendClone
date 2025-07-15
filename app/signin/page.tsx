import { OtpForm } from "@/components/OtpForm";
import { LOGIN_VIA_OTP } from "@/utils/strings";

export default function SignInPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">{LOGIN_VIA_OTP}</h1>
      <OtpForm />
    </main>
  );
}
