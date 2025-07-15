"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, OtpSchema } from "@/lib/schemas";
import { getAllCountries } from "@/lib/getCountries";
import { useRouter } from "next/navigation";
import { setAuthInfo } from "@/utils/authUtils";
import toast, { Toaster } from "react-hot-toast";

export function OtpForm() {
  const router = useRouter();
  const [countries, setCountries] = useState<{ label: string; value: string; }[]>([]);
  const [step, setStep] = useState<"send" | "verify">("send");
  const { register, handleSubmit, formState: { errors } } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: { step: "send" },
  });

  useEffect(() => { getAllCountries().then(setCountries); }, []);

  function onSend(data: OtpSchema) {
    setStep("verify");
    setTimeout(() => toast.success("OTP sent! (simulated)"), 500);
  }

  function onVerify(data: OtpSchema) {
    setTimeout(() => {
      if (data.otp === "123456") {
        setAuthInfo({
          countryCode: data.countryCode,
          phoneNumber: data.phoneNumber,
        })
        toast.success("Success!");
        router.push("/")
      } else {
        toast.error("Invalid OTP");
      }
    }, 500);
  }

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(step === "send" ? onSend : onVerify,
        (errs) => console.error("Errors:", errs)
      )} className="space-y-4 p-4">
        <div>
          <label htmlFor="countryCode">Country Code</label>
          <select id="countryCode" {...register("countryCode")} className="border p-2 w-full">
            <option value="">Select code</option>

            {countries.map((c, index) => <option key={`${c.value}+${index}}`} value={c.value}>{c.label}</option>)}
          </select>
          {errors.countryCode && <p className="text-red-500">{errors.countryCode.message}</p>}
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone</label>
          <input id="phoneNumber" type="tel" {...register("phoneNumber")} className="border p-2 w-full" />
          {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
        </div>

        {step === "verify" && (
          <div>
            <label htmlFor="otp">OTP</label>
            <input type="hidden" {...register("step")} value={step} />
            <input id="otp" type="text" {...register("otp")} className="border p-2 w-full" />
            {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
          </div>
        )}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {step === "send" ? "Send OTP" : "Verify OTP"}
        </button>
      </form>
    </>

  );
}
