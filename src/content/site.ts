/**
 * Single source of truth for site content.
 *
 * Every claim on the site must be true and provable (brief, section 3).
 * Items marked CONFIRM are working drafts that the client must verify or
 * replace before launch. Nothing here should state a figure that cannot be
 * backed up.
 */

export const site = {
  name: "HealthHands",
  url: "https://healthhands.in",
  city: "Kolkata",
  phone: "+91 98302 40859",
  phoneHref: "tel:+919830240859",
  whatsappNumber: "919830240859",
  email: "info@healthhands.in",
  address: {
    street: "4/88, Vidyasagar Colony, Garia",
    locality: "Kolkata",
    region: "West Bengal",
    postalCode: "700047",
    country: "IN",
  },
  // CONFIRM: opening hours for enquiries and home visits.
  hours: "Mon to Sat, 7:00 am to 8:00 pm. Sunday, 7:00 am to 1:00 pm.",
  // CONFIRM: the response time the team commits to (brief, sections 5 and 6).
  responseMinutes: 30,
  // CONFIRM: Google review link from the Google Business Profile.
  googleReviewUrl: "https://g.page/r/healthhands/review",
  social: [
    { label: "Facebook", href: "https://facebook.com/healthhands" },
    { label: "Instagram", href: "https://instagram.com/healthhands" },
    { label: "YouTube", href: "https://youtube.com/@healthhands" },
  ],
} as const;

export function whatsappLink(
  message = "Hello, I would like to book a home visit.",
) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export type IconName =
  | "drop"
  | "syringe"
  | "nurse"
  | "physio"
  | "equipment"
  | "scan"
  | "shield"
  | "report"
  | "clock"
  | "badge";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  icon: IconName;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  what: string;
  whoFor: string[];
  included: string[];
  delivery: string;
  // CONFIRM: all prices.
  pricing: { label: string; price: string; note?: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "home-blood-tests",
    name: "Home Blood Tests",
    shortName: "Blood tests",
    icon: "drop",
    summary:
      "A trained phlebotomist collects your sample at home. Reports arrive on WhatsApp and email.",
    seoTitle: "Home Blood Test in Kolkata | Sample Collection at Home",
    seoDescription:
      "Book a home blood test in Kolkata. A trained phlebotomist collects your sample at home in Garia, Jadavpur, Tollygunge and nearby areas. Digital reports.",
    what: "We send a trained phlebotomist to your home to collect a blood or urine sample. The sample goes to our partner laboratory and the report is sent to you digitally. You do not need to travel or wait in a queue.",
    whoFor: [
      "Older adults who find it hard to visit a lab",
      "Patients who need regular tests, such as sugar, thyroid or kidney function",
      "Families who want a full-body check-up for a parent",
      "Anyone who prefers an early-morning fasting sample at home",
    ],
    included: [
      "Home visit by a trained phlebotomist",
      "Single-use, sealed needles and tubes opened in front of you",
      "Sample transport to the laboratory in temperature-controlled boxes",
      "Digital report on WhatsApp and email",
    ],
    delivery:
      "Choose a time slot. For fasting tests, we usually book between 7:00 am and 9:00 am. The visit takes about 10 to 15 minutes.",
    pricing: [
      {
        label: "Home collection visit",
        price: "From ₹100",
        note: "Waived on orders above ₹999",
      },
      { label: "Basic health check", price: "From ₹799" },
      { label: "Full-body check-up", price: "From ₹1,999" },
    ],
    faqs: [
      {
        q: "Do I need to fast before the test?",
        a: "Some tests, such as fasting sugar and lipid profile, need 8 to 12 hours of fasting. We will tell you when you book.",
      },
      {
        q: "When will I get my report?",
        a: "Most routine reports arrive within 24 hours. We will tell you the expected time for your specific tests.",
      },
      {
        q: "Can you collect samples from more than one person in a visit?",
        a: "Yes. Tell us how many people need tests when you book, so we can bring enough kits.",
      },
    ],
  },
  {
    slug: "home-vaccination",
    name: "Home Vaccination",
    shortName: "Vaccination",
    icon: "syringe",
    summary:
      "Adult vaccines such as flu, pneumonia and hepatitis B, given at home by a trained nurse.",
    seoTitle: "Home Vaccination in Kolkata | Adult Vaccines at Home",
    seoDescription:
      "Adult vaccination at home in Kolkata. Flu, pneumonia, hepatitis B and other vaccines given by a trained nurse, with cold-chain storage and a vaccination record.",
    what: "A trained nurse brings the vaccine to your home, checks your details and gives the dose. The vaccine is stored and carried in a cold chain from our facility to your door.",
    whoFor: [
      "Adults over 50 who need flu or pneumonia vaccines",
      "People with diabetes, heart, lung or kidney conditions",
      "Anyone due for a hepatitis B, tetanus or travel vaccine",
      "People who cannot easily travel to a clinic",
    ],
    included: [
      "Pre-vaccination check of your history and current medicines",
      "Vaccine carried in a monitored cold box",
      "Observation for 15 minutes after the dose",
      "Written vaccination record and a reminder for the next dose",
    ],
    delivery:
      "We confirm the vaccine is in stock and suitable for you before the visit. Please keep any prescription from your doctor ready.",
    pricing: [
      { label: "Home visit and administration", price: "From ₹300" },
      {
        label: "Vaccine cost",
        price: "At MRP",
        note: "Depends on the vaccine",
      },
    ],
    faqs: [
      {
        q: "Do I need a prescription?",
        a: "For most adult vaccines we recommend a prescription from your doctor. We can tell you what is needed when you call.",
      },
      {
        q: "What if I have a reaction?",
        a: "The nurse stays for 15 minutes after the dose and carries basic first-aid. Serious reactions are rare.",
      },
      {
        q: "Will you remind me about the next dose?",
        a: "Yes. We send a WhatsApp reminder before your next dose is due.",
      },
    ],
  },
  {
    slug: "home-nursing-attendants",
    name: "Home Nursing and Attendants",
    shortName: "Nursing & attendants",
    icon: "nurse",
    summary:
      "Nurses for medical care and attendants for daily support, by the visit, by the day or round the clock.",
    seoTitle: "Home Nursing and Patient Attendants in Kolkata",
    seoDescription:
      "Home nursing and patient attendant services in Kolkata. Injections, dressings, catheter care, post-surgery care and daily support for elderly parents.",
    what: "Nurses handle medical tasks such as injections, dressings and catheter care. Attendants help with daily needs such as bathing, feeding, mobility and company. You can book a single visit or a 12 or 24 hour shift.",
    whoFor: [
      "Patients returning home after surgery or a hospital stay",
      "Elderly parents who need help with daily living",
      "Patients with long-term conditions who need regular care",
      "Families who need short-term cover while they travel or work",
    ],
    included: [
      "Matching a nurse or attendant to the patient's needs",
      "Injections, IV, dressings, catheter and stoma care (nurses)",
      "Bathing, feeding, mobility and companionship (attendants)",
      "A replacement if the assigned staff member is unavailable",
    ],
    delivery:
      "We first discuss the patient's condition and routine with you. For longer bookings, a coordinator checks in with the family regularly.",
    pricing: [
      { label: "Nursing visit (single procedure)", price: "From ₹500" },
      { label: "Attendant, 12 hour shift", price: "From ₹900 per day" },
      { label: "Nurse, 12 hour shift", price: "From ₹1,500 per day" },
    ],
    faqs: [
      {
        q: "Are your nurses qualified?",
        a: "Our nurses hold GNM or B.Sc Nursing qualifications. We can share the assigned nurse's details before the first visit.",
      },
      {
        q: "Can I change the attendant if it is not a good fit?",
        a: "Yes. Tell your coordinator and we will arrange a replacement.",
      },
      {
        q: "Do you offer 24 hour care?",
        a: "Yes, through two 12 hour shifts or a live-in attendant, depending on availability.",
      },
    ],
  },
  {
    slug: "home-physiotherapy",
    name: "Home Physiotherapy",
    shortName: "Physiotherapy",
    icon: "physio",
    summary:
      "Qualified physiotherapists for recovery after surgery, stroke, injury or long-term pain.",
    seoTitle: "Home Physiotherapy in Kolkata | Physiotherapist at Home",
    seoDescription:
      "Home physiotherapy in Kolkata for knee and hip replacement, stroke recovery, back and neck pain and elderly mobility. Qualified physiotherapists visit you at home.",
    what: "A qualified physiotherapist assesses the patient at home and plans a course of sessions. Each session includes exercises, manual therapy and advice that fits the patient's home and routine.",
    whoFor: [
      "Patients recovering from knee or hip replacement",
      "Stroke and other neurological recovery",
      "Back, neck and joint pain",
      "Older adults who want to improve balance and reduce falls",
    ],
    included: [
      "First assessment and a written plan",
      "Sessions of about 45 minutes at home",
      "Exercises you can continue between sessions",
      "Progress updates for the family and your doctor",
    ],
    delivery:
      "Most patients book a package of sessions at a regular time. You can pause or change the schedule with notice.",
    pricing: [
      { label: "Assessment and first session", price: "From ₹700" },
      { label: "Package of 10 sessions", price: "From ₹6,000" },
    ],
    faqs: [
      {
        q: "Do I need a doctor's referral?",
        a: "It helps, especially after surgery, but it is not always required. The physiotherapist will check during the assessment.",
      },
      {
        q: "Do you bring equipment?",
        a: "The physiotherapist brings basic equipment. If you need more, we can rent it to you.",
      },
      {
        q: "How many sessions will I need?",
        a: "It depends on the condition. The physiotherapist will suggest a number after the first assessment.",
      },
    ],
  },
  {
    slug: "medical-equipment",
    name: "Medical Equipment (Rent and Buy)",
    shortName: "Medical equipment",
    icon: "equipment",
    summary:
      "Oxygen concentrators, hospital beds, wheelchairs and more, delivered and set up at home.",
    seoTitle: "Medical Equipment on Rent and Sale in Kolkata",
    seoDescription:
      "Rent or buy medical equipment in Kolkata. Oxygen concentrators, hospital beds, wheelchairs, walkers and BiPAP machines delivered and set up at your home.",
    what: "We rent and sell medical equipment for use at home. We deliver, set it up, show the family how to use it, and collect rented items when you are done.",
    whoFor: [
      "Patients coming home from hospital who need a bed or oxygen",
      "Older adults who need a wheelchair, walker or commode chair",
      "Short-term needs during recovery, where buying does not make sense",
    ],
    included: [
      "Delivery and set-up at home",
      "A demonstration for the family",
      "Cleaned and checked equipment for every rental",
      "Pick-up at the end of the rental period",
    ],
    delivery:
      "Tell us what you need and for how long. We confirm stock, rent and deposit before delivery.",
    pricing: [
      { label: "Wheelchair rental", price: "From ₹50 per day" },
      { label: "Hospital bed rental", price: "From ₹150 per day" },
      { label: "Oxygen concentrator rental", price: "From ₹300 per day" },
    ],
    faqs: [
      {
        q: "Is there a security deposit?",
        a: "Yes, a refundable deposit is taken for most rentals. We tell you the amount before delivery.",
      },
      {
        q: "How fast can you deliver?",
        a: "Often on the same day within our service areas, depending on stock.",
      },
      {
        q: "What if the equipment stops working?",
        a: "Call or WhatsApp us and we will repair or replace it.",
      },
    ],
  },
  {
    slug: "diagnostics",
    name: "Diagnostics",
    shortName: "Diagnostics",
    icon: "scan",
    summary:
      "ECG at home and help booking scans, with reports explained in plain language.",
    seoTitle: "ECG at Home and Diagnostics in Kolkata",
    seoDescription:
      "Home ECG and diagnostic support in Kolkata. A technician records the ECG at home and the report is sent digitally. Help booking ultrasound and X-ray.",
    what: "A technician visits your home to record an ECG and sends the report digitally. For tests that need a centre, such as ultrasound or X-ray, we help you book a convenient slot.",
    whoFor: [
      "Patients asked by their doctor for a routine ECG",
      "Older adults who find it hard to visit a diagnostic centre",
      "Families arranging several tests for a parent at once",
    ],
    included: [
      "Home visit by a trained technician",
      "12-lead ECG recording",
      "Digital report on WhatsApp and email",
      "Help booking scans at a partner centre",
    ],
    delivery:
      "Book a time slot. The ECG takes about 15 minutes, including set-up.",
    pricing: [{ label: "ECG at home", price: "From ₹500" }],
    faqs: [
      {
        q: "Will a doctor read my ECG?",
        a: "The report is sent to you so your own doctor can review it. Ask us if you need a cardiologist's opinion.",
      },
      {
        q: "Can you do ultrasound at home?",
        a: "No. We help you book ultrasound and X-ray at a partner centre.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

// CONFIRM: the areas the team actually covers.
export const serviceAreas: { zone: string; areas: string[] }[] = [
  {
    zone: "Garia and nearby",
    areas: [
      "Garia",
      "Patuli",
      "Baishnabghata",
      "Kamalgazi",
      "Narendrapur",
      "Sonarpur",
      "Panchasayar",
    ],
  },
  {
    zone: "South Kolkata",
    areas: [
      "Jadavpur",
      "Baghajatin",
      "Santoshpur",
      "Naktala",
      "Bansdroni",
      "Tollygunge",
      "Kasba",
    ],
  },
  {
    zone: "Central south",
    areas: [
      "Gariahat",
      "Ballygunge",
      "Dhakuria",
      "Golf Green",
      "Lake Gardens",
      "Behala",
    ],
  },
];

export const allAreas = serviceAreas.flatMap((z) => z.areas);

export const steps = [
  {
    title: "Tell us what you need",
    body: "Message us on WhatsApp, call, or fill the short form. Name, phone, service and area are enough.",
  },
  {
    title: "We confirm and schedule",
    body: "We call you back, check the details, share the price in writing and fix a time that suits you.",
  },
  {
    title: "Care arrives at your door",
    body: "A trained HealthHands team member visits your home at the agreed time.",
  },
];

// CONFIRM: each point must be provable before launch.
export const trustPoints: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "badge",
    title: "Qualified staff",
    body: "Nurses, phlebotomists and physiotherapists with recognised qualifications. Ask us for details before the visit.",
  },
  {
    icon: "shield",
    title: "Safe, sealed supplies",
    body: "Single-use needles and kits are opened in front of you. Vaccines travel in a monitored cold box.",
  },
  {
    icon: "report",
    title: "Digital reports",
    body: "Reports and receipts come to your WhatsApp and email, so you can share them with your doctor.",
  },
  {
    icon: "clock",
    title: `Reply within ${site.responseMinutes} minutes`,
    body: "During working hours, a coordinator calls or messages you back quickly to confirm your booking.",
  },
];

// CONFIRM: replace with real reviews, shared with the patient's consent.
export const reviews: {
  quote: string;
  name: string;
  area: string;
  service: string;
}[] = [
  {
    quote:
      "The phlebotomist came at 7 in the morning so my mother could have her fasting test before breakfast. The report was on my phone the same evening.",
    name: "S. Banerjee",
    area: "Jadavpur",
    service: "Home blood test",
  },
  {
    quote:
      "After my father's knee replacement, the physiotherapist visited three times a week. He was walking to the balcony on his own within a month.",
    name: "A. Ghosh",
    area: "Patuli",
    service: "Home physiotherapy",
  },
  {
    quote:
      "We needed an oxygen concentrator the day Baba was discharged. It was delivered and set up that afternoon and they showed us how to clean it.",
    name: "R. Das",
    area: "Garia",
    service: "Equipment rental",
  },
  {
    quote:
      "The nurse gave both of us our flu shots at home and sent a reminder when the next one was due.",
    name: "M. & K. Sen",
    area: "Golf Green",
    service: "Home vaccination",
  },
];

export const homeFaqs = [
  {
    q: "How much does a home visit cost?",
    a: "Each service page shows a starting price. We confirm the full price in writing before the visit, so there are no surprises.",
  },
  {
    q: "How soon can someone come?",
    a: "Often the same day or the next morning, depending on the service and your area. Blood collection for fasting tests is usually booked for early morning.",
  },
  {
    q: "Which areas do you cover?",
    a: "We cover Garia and much of South Kolkata, including Jadavpur, Tollygunge, Behala and Ballygunge. See the full list on our Service Areas page.",
  },
  {
    q: "How do I get my reports?",
    a: "Reports are sent to your WhatsApp and email. You can also ask for a printed copy.",
  },
  {
    q: "Is it safe to have someone visit my home?",
    a: "Every visit is by a HealthHands staff member whose name we share with you in advance. Single-use supplies are opened in front of you.",
  },
  {
    q: "Do you provide emergency or ambulance services?",
    a: "No. HealthHands provides planned care at home. In an emergency, call 112 or go to the nearest hospital.",
  },
];
