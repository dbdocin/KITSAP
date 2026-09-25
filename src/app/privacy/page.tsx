import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContactEmail, LegalPage, LegalSection } from "@/components/sections/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How KITSAP handles the information you send through kitsap.work.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const analyticsOn: boolean = siteConfig.features.analytics;

  return (
    <LegalPage title="PRIVACY POLICY">
      <LegalSection title="Who we are">
        <p>
          {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) runs {siteConfig.domain}, a website
          for our video editing and creative services. You can reach us about anything in this
          policy at <ContactEmail />.
        </p>
      </LegalSection>

      <LegalSection title="What the quote form collects">
        <p>When you send a project request, we collect what you type into the form:</p>
        <ul>
          <li>Your name and email address (required)</li>
          <li>Your phone or WhatsApp number, company or brand, and website or social profile (optional)</li>
          <li>The service you want and your project description (required)</li>
          <li>
            Project type, number of videos, estimated video length, budget and timeline (optional)
          </li>
          <li>Reference links and any additional information you choose to add (optional)</li>
        </ul>
        <p>
          The form does not upload files. If you share links to footage or references, we only
          receive the links.
        </p>
      </LegalSection>

      <LegalSection title="Why we collect it">
        <p>
          We use this information to read your request, reply with next steps or a quote, and
          communicate with you about your project. We do not sell your personal information.
        </p>
      </LegalSection>

      <LegalSection title="How it is sent and who handles it">
        <p>
          Your request is sent by email to us through an email delivery provider. That provider
          processes your details on our behalf to deliver the message and may keep delivery logs.
          The website is hosted on a third-party platform, which may record technical information
          such as your IP address in server logs.
        </p>
        {analyticsOn ? (
          <p>
            This site uses Vercel Analytics to count page views in aggregate. It does not set
            cookies and does not use advertising trackers. [Have this description checked against
            the provider&apos;s current documentation.]
          </p>
        ) : (
          <p>This site does not currently use advertising cookies or analytics.</p>
        )}
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>
          [To be decided.] We keep your request for as long as we need it to respond and, if a
          project goes ahead, for the length of the work and any period the law requires. Requests
          that do not lead to a project are deleted after [retention period].
        </p>
      </LegalSection>

      <LegalSection title="Your choices and rights">
        <p>
          You can ask us for a copy of the personal information we hold about you, ask us to
          correct it, or ask us to delete it. To do any of these, email <ContactEmail /> from the
          address you used on the form. We will respond within [response time].
        </p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          We take reasonable steps to protect your information, including validating what the form
          receives and keeping our email credentials off the public site. No method of transmission
          or storage is completely secure, so we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>This website is not aimed at children, and we do not knowingly collect their information.</p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          We may update this policy from time to time. The current version is always the one on this
          page. [Add a &ldquo;last updated&rdquo; date when this is finalised.]
        </p>
      </LegalSection>
    </LegalPage>
  );
}
