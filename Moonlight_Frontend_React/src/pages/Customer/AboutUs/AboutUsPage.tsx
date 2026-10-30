import { AboutProject } from "./sections/AboutProject";
import { AboutUs } from "./sections/AboutUs";

function AboutUsPage() {
  return (
    <main className="bg-gradient-to-b from-base-soft via-base to-base flex flex-col items-center justify-center">
      <div className="animate-fade-in">
        <AboutUs />
        <AboutProject />
      </div>
    </main>
  );
}

export default AboutUsPage;
