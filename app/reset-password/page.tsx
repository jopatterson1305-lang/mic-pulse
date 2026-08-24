import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "Reset password — MIC Pulse", description: "Reset your MIC Pulse reader account password." };
export default function ResetPasswordPage() { return <AuthForm mode="reset" />; }
