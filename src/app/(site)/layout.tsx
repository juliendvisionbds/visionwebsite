import { GoogleAnalytics } from "@next/third-parties/google";
import BookingWidget from "@/components/BookingWidget";
import ExitPopup from "@/components/ExitPopup";

// Le site public. L'admin et l'espace partenaires (src/app/admin, src/app/portail) n'ont ni widgets ni mesure d'audience.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      {children}
      <BookingWidget />
      <ExitPopup />
      <GoogleAnalytics gaId="G-N9YJ1N4HPF" />
    </>
  );
}
