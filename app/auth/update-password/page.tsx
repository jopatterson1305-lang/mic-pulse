import type { Metadata } from "next";
import { PasswordUpdateForm } from "@/components/auth/PasswordUpdateForm";

export const metadata: Metadata = { title: "Update password — MIC Pulse", description: "Choose a new MIC Pulse reader account password." };
export default function UpdatePasswordPage() { return <PasswordUpdateForm />; }
