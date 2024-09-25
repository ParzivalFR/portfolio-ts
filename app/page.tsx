import CoffeeTime from "@/components/CoffeeTime";
import ContactMe from "@/components/ContactMe";
import { EasterEggAlert } from "@/components/EasterEggAlert";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InfiniFloat from "@/components/InfiniFloat";
import Projects from "@/components/Projects";
import Qualities from "@/components/Qualities";
import SectionHome from "@/components/SectionHome";
import Skills from "@/components/Skills";
import Spacing from "@/components/Spacing";
import TypeWrite from "@/components/TypeWrite";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-svh">
        <Spacing size={20} />
        <EasterEggAlert />
        <CoffeeTime>
          Le code, c’est ma tasse de thé… ou plutôt, ma tasse de café !
        </CoffeeTime>
        <Spacing size={20} />
        <TypeWrite />
        <SectionHome />
        <Spacing size={40} />
        <Separator className="w-2/3 h-px m-auto bg-current rounded" />
        <Spacing size={100} />
        <InfiniFloat />
        <Spacing size={100} />
        <Separator className="w-2/3 h-[0.5px] m-auto bg-current rounded" />
        <Spacing size={100} />
        <Skills />
        <Spacing size={100} />
        <Separator className="w-2/3 h-[0.5px] m-auto bg-current rounded" />
        <Spacing size={50} />
        <Qualities />
        <Spacing size={50} />
        <Separator className="w-2/3 h-[0.5px] m-auto bg-current rounded" />
        <Spacing size={50} />
        <Projects />
        <Spacing size={50} />
        <Separator className="w-2/3 h-[0.5px] m-auto bg-current rounded" />
        <Spacing size={50} />
        <ContactMe />
        <Spacing size={50} />
      </main>
      <Footer />
    </>
  );
}
