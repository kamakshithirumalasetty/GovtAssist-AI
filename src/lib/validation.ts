import { z } from "zod";

export const CitizenRegisterSchema = z.object({
  fullName: z.string().min(2, "Full Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender selection is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  state: z.string().min(2, "State is required"),
  district: z.string().min(2, "District is required"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be a 6-digit number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const LoginSchema = z.object({
  emailOrPhone: z.string().min(1, "Email or Mobile number is required"),
  password: z.string().min(1, "Password is required"),
});

export const ProfileUpdateSchema = z.object({
  fullName: z.string().min(2, "Full Name must be at least 2 characters"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  dob: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  state: z.string().min(2, "State is required"),
  district: z.string().min(2, "District is required"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
});

export const AdminReviewSchema = z.object({
  applicationId: z.string().min(1, "Application ID required"),
  action: z.enum(["APPROVED", "REJECTED"]),
  rejectionReason: z.string().optional(),
}).refine((data) => {
  if (data.action === "REJECTED" && (!data.rejectionReason || data.rejectionReason.trim().length < 5)) {
    return false;
  }
  return true;
}, {
  message: "Rejection reason must be provided (at least 5 characters) when rejecting an application",
  path: ["rejectionReason"],
});
