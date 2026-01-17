import AppProviders from "@/components/providers/AppProviders";

export default function AuthLayout({ children }) {
  return <AppProviders>{children}</AppProviders>;
}
