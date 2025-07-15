import { z } from "zod";

export const otpSchema = z.object({
  step: z.enum(["send", "verify"]),
  countryCode: z.string().nonempty("Select country code"),
  phoneNumber: z.string()
    .min(5, "Too short")
    .max(15, "Too long")
    .regex(/^\d+$/, "Numbers only"),
  otp: z.string().optional(), // optional by default
}).refine((data) => {
  if (data.step === "verify") {
    return data.otp !== undefined && data.otp.length === 6;
  }
  return true;
}, {
  path: ["otp"],
  message: "Enter 6‑digit OTP when verifying",
});

export type OtpSchema = z.infer<typeof otpSchema>;
