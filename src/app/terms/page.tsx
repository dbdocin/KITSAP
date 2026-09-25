import type { Metadata } from "next";
import { ContactEmail, LegalPage, LegalSection } from "@/components/sections/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using kitsap.work and requesting work from KITSAP.",
};

export default function TermsPage() {
  return (
    <LegalPage title="TERMS OF SERVICE">
      <LegalSection title="About these terms">
        <p>
          These terms cover your use of {siteConfig.domain} and any project request you send to{" "}
          {siteConfig.name}. By using the site or sending a request, you agree to them. If a
          separate written agreement is made for a project, that agreement applies to the project
          where the two differ.
        </p>
      </LegalSection>

      <LegalSection title="Our services">
        <p>
          We provide video editing and related creative services. Sending a project request does
          not create a contract. A project begins only when we and you have agreed the scope,
          timeline and fees in writing. [Confirm how agreements are recorded.]
        </p>
      </LegalSection>

      <LegalSection title="Quotes and payment">
        <p>
          [To be decided: how quotes are issued, how long they stay valid, payment schedule,
          accepted payment methods and currency.]
        </p>
      </LegalSection>

      <LegalSection title="Your footage and materials">
        <ul>
          <li>You keep ownership of the footage and materials you send us.</li>
          <li>
            You confirm that you have the rights to everything you send, including footage, music,
            images and the people or brands shown, and that we may edit it as your project requires.
          </li>
          <li>
            We are not responsible for claims that arise from materials you provide without the
            necessary rights.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Revisions and delivery">
        <p>
          [To be decided: the number of revision rounds included, how feedback is submitted, and
          how final files are delivered.] Timelines depend on the scope agreed for each project and
          on receiving your footage and feedback on time.
        </p>
      </LegalSection>

      <LegalSection title="Rights in the finished work">
        <p>
          [To be decided: when ownership or licence of the final edit passes to you, for example on
          full payment, and whether we may show the finished work in our portfolio. We will only show
          client work with permission.]
        </p>
      </LegalSection>

      <LegalSection title="Using this website">
        <p>
          Please use the site lawfully. Do not attempt to disrupt it, gain unauthorised access, or
          submit false or harmful content through the project form. The text, design and code of
          this site belong to {siteConfig.name}, except where stated otherwise. Some work shown may
          be sample content while the portfolio is being built.
        </p>
      </LegalSection>

      <LegalSection title="Limits of liability">
        <p>
          The site is provided &ldquo;as is&rdquo;. To the extent the law allows, we are not liable
          for indirect or consequential losses arising from your use of the site or our services.
          [Have this section reviewed by a lawyer, including any liability cap.]
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>[To be confirmed: governing law and where disputes will be handled.]</p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms can be sent to <ContactEmail />.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
