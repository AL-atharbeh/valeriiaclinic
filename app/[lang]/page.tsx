import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import AboutDoctor from "@/components/AboutDoctor";
import WhyUs from "@/components/WhyUs";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { isLang, LANGS, type Lang } from "@/lib/content";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;

  return (
    /* المفتاح يعيد التركيب عند تبديل اللغة، فيقع تلاشي ٢٠٠ms بدل قفزة الاتجاه */
    <div key={lang} className="lang-fade">
      <Hero lang={lang} />
      <main id="main">
        <TrustBar lang={lang} />
        <Services lang={lang} />
        <AboutDoctor lang={lang} />
        <WhyUs lang={lang} />
        <Gallery lang={lang} />
        <Location lang={lang} />
        <BookingForm lang={lang} />
      </main>
      <Footer lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
