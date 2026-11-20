import type { Metadata } from "next";
import { ContentIcon } from "@/components/icons";
import { CtaBand, Eyebrow, PageHeader, Section } from "@/components/layout";
import { PageTransition } from "@/components/page-transition";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { site, trustPoints } from "@/content/site";

export const metadata: Metadata = {
  title: "About HealthHands: Home Healthcare Team in Garia, Kolkata",
  description:
    "Meet the HealthHands home healthcare team in Garia, Kolkata. Our story, our staff and the licences and accreditations behind our home services.",
  alternates: { canonical: "/about" },
};

// CONFIRM: replace with real staff names, roles, qualifications and photos.
const team = [
  {
    role: "Care coordinator",
    detail: "Takes your call, plans the visit and follows up afterwards.",
  },
  {
    role: "Nurses",
    detail:
      "GNM or B.Sc Nursing qualified. Injections, dressings and post-surgery care.",
  },
  {
    role: "Phlebotomists",
    detail: "Trained in home sample collection and safe sample transport.",
  },
  {
    role: "Physiotherapists",
    detail: "BPT or MPT qualified. Recovery, pain and mobility programmes.",
  },
];

// CONFIRM: list only licences and accreditations that can be shown on request.
const credentials = [
  "Clinical establishment registration (West Bengal)",
  "Partner laboratory accreditation details",
  "Biomedical waste disposal agreement",
  "Staff registration with the West Bengal Nursing Council",
];

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="About us"
        title="A home healthcare team from Garia"
        intro={`HealthHands brings everyday medical care to homes across South ${site.city}. We started with home blood collection and equipment rental, and now offer nursing, vaccination and physiotherapy at home.`}
      />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Our approach</Eyebrow>
            <h2 className="text-3xl md:text-4xl">
              Planned care, not emergency care
            </h2>
            <div className="mt-5 space-y-4 text-lg text-muted-foreground">
              <p>
                Many families in Kolkata care for an older parent at home.
                Getting to a lab or clinic means arranging transport, waiting
                and often taking a day off work. We bring that care to the home
                instead.
              </p>
              <p>
                We focus on planned services: tests, vaccines, nursing,
                physiotherapy and equipment. We do not run an ambulance or
                emergency service. In an emergency, call 112.
              </p>
            </div>
          </div>
          <ul className="divide-y rounded-lg border">
            {trustPoints.map((t) => (
              <li key={t.title} className="flex items-start gap-4 p-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-secondary text-primary">
                  <ContentIcon
                    name={t.icon}
                    className="size-[1.125rem]"
                    strokeWidth={1.75}
                  />
                </span>
                <span>
                  <span className="block font-semibold">{t.title}</span>
                  <span className="mt-1 block text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {t.body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-muted">
        <Eyebrow>Team</Eyebrow>
        <h2 className="text-3xl md:text-4xl">Who visits your home</h2>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          We share the name and role of the team member before each visit.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <li key={m.role}>
              <Card className="h-full gap-0 rounded-lg py-0 shadow-none ring-1 ring-foreground/10">
                <div className="grid aspect-[4/3] place-items-center rounded-t-lg border-b bg-muted text-sm text-muted-foreground">
                  Photo to follow
                </div>
                <CardHeader className="gap-1.5 px-5 py-5">
                  <CardTitle className="font-heading text-lg">
                    {m.role}
                  </CardTitle>
                  <CardDescription className="text-[0.9375rem] leading-relaxed">
                    {m.detail}
                  </CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
          <div>
            <Eyebrow>Licences and accreditations</Eyebrow>
            <h2 className="text-3xl md:text-4xl">Documents we can show you</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ask for a copy of any of these before you book.
            </p>
          </div>
          <ul className="divide-y border-y">
            {credentials.map((c) => (
              <li key={c} className="flex items-center gap-3 py-4">
                <ContentIcon
                  name="shield"
                  className="size-5 shrink-0 text-primary"
                  strokeWidth={1.75}
                />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand />
    </PageTransition>
  );
}
