import { CONTACT } from "@/lib/home-content";
import { BookCallButton } from "./BookCall";

export default function FinalCTA() {
  return (
    <section id="contact" className="rk-sec rk-alt text-center">
      <div className="mx-auto w-full max-w-[1120px] px-[clamp(22px,5vw,60px)]">
        <h2 className="rk-head mx-auto max-w-[15ch]">Tell us what you&apos;re trying to ship.</h2>
        <p className="rk-intro mx-auto mt-3 max-w-[42ch]">
          Thirty minutes with an engineer. You&apos;ll leave with a written view on the team
          we&apos;d recommend — either way.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3.5">
          <BookCallButton />
          <a className="rk-btn rk-btn-line" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>
        </div>
      </div>
    </section>
  );
}
