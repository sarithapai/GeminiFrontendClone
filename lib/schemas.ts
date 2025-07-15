import { z } from "zod";
import {
  OTP_STEP_SEND,
  OTP_STEP_VERIFY,
  OTP_ERR_COUNTRY_CODE,
  OTP_ERR_TOO_SHORT,
  OTP_ERR_TOO_LONG,
  OTP_ERR_NUMBERS_ONLY,
  OTP_ERR_6_DIGIT,
} from "@/utils/strings";

export const otpSchema = z.object({
  step: z.enum([OTP_STEP_SEND, OTP_STEP_VERIFY]),
  countryCode: z.string().nonempty(OTP_ERR_COUNTRY_CODE),
  phoneNumber: z.string()
    .min(5, OTP_ERR_TOO_SHORT)
    .max(15, OTP_ERR_TOO_LONG)
    .regex(/^\d+$/, OTP_ERR_NUMBERS_ONLY),
  otp: z.string().optional(), // optional by default
}).refine((data) => {
  if (data.step === OTP_STEP_VERIFY) {
    return data.otp !== undefined && data.otp.length === 6;
  }
  return true;
}, {
  path: ["otp"],
  message: OTP_ERR_6_DIGIT,
});

export type OtpSchema = z.infer<typeof otpSchema>;