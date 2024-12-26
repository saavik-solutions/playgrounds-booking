import LoginForm from "@/features/auth/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | React Sports Club",
  description: "Login to your account at React Sports Club to manage your bookings and profile.",
  openGraph: {
    title: "Login | React Sports Club",
    description: "Access your React Sports Club account to manage bookings, view schedules, and more.",
    url: "https://www.reactsportsclub.com/login",
    images: [
      {
        url: "https://www.reactsportsclub.com/images/login-og-image.png",
        width: 1200,
        height: 630,
        alt: "Login Page - React Sports Club",
      },
    ],
    siteName: "React Sports Club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login | React Sports Club",
    description: "Access your React Sports Club account to manage bookings, view schedules, and more.",
    images: ["https://www.reactsportsclub.com/images/login-og-image.png"],
  },
};

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      {/* Adding structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Login | React Sports Club",
            description:
              "Login to your account at React Sports Club to manage your bookings and profile.",
            url: "https://www.reactsportsclub.com/login",
            image: "https://www.reactsportsclub.com/images/login-og-image.png",
          }),
        }}
      />
    </>
  );
}
