import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "GradeTrack", description: "A calmer way to see your progress." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
