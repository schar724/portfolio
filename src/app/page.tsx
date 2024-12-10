"use client";

import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  MinusIcon,
  PaintBrushIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowPathIcon,
  CheckIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/20/solid";
import { cn } from "./utils";
import {
  BoltIcon,
  CircleStackIcon,
  Cog8ToothIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  PhoneIcon,
  RocketLaunchIcon,
  ServerStackIcon,
} from "@heroicons/react/16/solid";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

const features = [
  {
    name: "Web APIs",
    description:
      "Design and develop RESTful and SQL-based APIs tailored to your business needs, ensuring scalability and reliability.",
    icon: Cog8ToothIcon, // Represents API functionality and integration
  },
  {
    name: "Serverless Architectures",
    description:
      "Build cost-efficient, highly available solutions using serverless platforms like AWS Lambda and Firebase Functions.",
    icon: CloudArrowUpIcon, // Represents cloud services
  },
  {
    name: "SQL Database Services",
    description:
      "Set up, optimize, and maintain SQL databases to securely manage your data and ensure high performance.",
    icon: CircleStackIcon, // Represents databases and data management
  },
  {
    name: "Websites",
    description:
      "Create fast, responsive websites that provide a professional online presence for your business.",
    icon: ComputerDesktopIcon, // Represents websites
  },
  {
    name: "Web and Mobile Applications",
    description:
      "Develop custom web and mobile applications with modern technologies like React & Next.js.",
    icon: DevicePhoneMobileIcon, // Represents mobile and web applications
  },
  {
    name: "PWA Development",
    description:
      "Build progressive web apps (PWAs) that work seamlessly across devices, offering app-like experiences.",
    icon: RocketLaunchIcon, // Represents innovation and app delivery
  },
  {
    name: "CI/CD Pipelines",
    description:
      "Set up continuous integration and deployment pipelines to automate your development workflow and accelerate delivery.",
    icon: ArrowPathIcon, // Represents automation and continuous processes
  },
  {
    name: "Frontend Development",
    description:
      "Design and develop interactive, user-friendly interfaces using React, TypeScript, and Tailwindcss.",
    icon: PaintBrushIcon, // Represents design and frontend development
  },
  {
    name: "Cloud Infrastructure",
    description:
      "Deploy and manage cloud infrastructure with GCP to power your web applications and services.",
    icon: ServerStackIcon, // Represents cloud servers
  },
  {
    name: "Performance Optimization",
    description:
      "Audit and optimize your website or application to improve loading times, responsiveness, and overall performance.",
    icon: BoltIcon, // Represents speed and optimization
  },
];

const tiers = [
  {
    name: "Starter Website",
    id: "tier-starter",
    href: "#",
    priceStarting: "$800",
    description:
      "A simple, professional website to get your business online quickly.",
    features: [
      "3 pages (Home, About, Contact)",
      "Mobile-friendly design",
      "Basic SEO setup",
      "Delivered in 7 days",
      "30-day support after launch",
    ],
    featured: false,
  },
  {
    name: "Business Website",
    id: "tier-business",
    href: "#",
    priceStarting: "$1100",
    description:
      "A more robust website for businesses looking to grow and scale their online presence.",
    features: [
      "Up to 5 pages",
      "Mobile-friendly design",
      "Basic blog integration",
      "Advanced SEO setup",
      "Delivered in 7 days",
      "30-day support after launch",
    ],
    featured: true,
  },
  {
    name: "Add-Ons",
    id: "tier-addons",
    href: "#",
    description: "Prices vary",
    features: [
      "Extra pages",
      "E-commerce/Online Store",
      "Scheduling/Booking System",
      "Custom contact forms",
      "Email Campaigns",
      "Google Analytics integration",
      "Social media feed integration",
      "Multilingual website support",
      "Ongoing maintenance plans",
    ],
    featured: false,
  },
];

const faqs = [
  {
    question: "What is the process like?",
    answer:
      "My process is simple and efficient: 1. Discovery call to understand your needs. 2. Initial quote based on your requirements. 3. Short questionnaire to gather details. 4. Project proposal outlining timeline and deliverables. 5. Build phase with close collaboration. 6. Delivery and launch, with a walkthrough to finalize.",
  },
  {
    question: "How long does it take to complete my website?",
    answer:
      "For my Starter Website package, I deliver within 7 business days once I receive all your content. Business Website timelines may extend slightly depending on complexity and features.",
  },
  {
    question: "What do I need to provide for my website?",
    answer:
      "You’ll need to provide your logo (if you have one), images/videos, text/content for each page, and any specific branding preferences (like colors or fonts). Don’t worry—I’ll guide you through it!",
  },
  {
    question: "Will my website work on mobile devices?",
    answer:
      "Absolutely! All websites I build are mobile-friendly and optimized to look great on smartphones, tablets, and desktops.",
  },
  {
    question: "Do you offer support after the website is launched?",
    answer:
      "Yes, I offer a 30-day support period to address any minor tweaks or questions. For ongoing updates or maintenance, I also provide affordable website care plans.",
  },
  {
    question: "Can I make changes to my website after it’s finished?",
    answer:
      "Yes! I design your website to be easy to update. For platforms like WordPress or Squarespace, I’ll provide a quick walkthrough so you can manage basic changes. For advanced updates, I’m always here to help.",
  },
  {
    question: "What if I don’t like the design?",
    answer:
      "I work closely with you throughout the process and ask for feedback during the Build Phase. Revisions are included, so I’ll adjust the design until it matches your vision.",
  },
  {
    question: "Do you offer e-commerce or custom features?",
    answer:
      "Yes, I can add e-commerce functionality (like online stores or payment systems) and custom features. These will be quoted separately based on your specific needs.",
  },
  {
    question: "How much does it cost to build a website?",
    answer:
      "My pricing starts at $700 for a Starter Website (3 pages) and $1000 for a Business Website (up to 5 pages). Additional features like e-commerce or extra pages are quoted separately.",
  },
  {
    question: "Will my website show up on Google?",
    answer:
      "Yes, I include basic SEO setup with all packages to help your website get indexed by search engines. For more advanced SEO strategies, I can offer additional services.",
  },
  {
    question: "Can you write the content for my website?",
    answer:
      "I recommend providing content that reflects your business and goals. However, I can provide copy and basic images for an additional fee.",
  },
];
const footerNavigation = {
  company: [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ],
};

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Extract form data from the event target
  const formData = new FormData(e.currentTarget);

  // Convert FormData to a plain object
  const data = Object.fromEntries(formData.entries());

  console.log("Form data:", data);

  try {
    const response = await fetch("https://api.vercel.app/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Send data as JSON
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Success:", result.message);
      // Handle success, e.g., reset the form or show a success message
    } else {
      const error = await response.json();
      console.error("Error:", error.error);
      // Handle server errors
    }
  } catch (err) {
    console.error("Error:", err);
    // Handle network errors
  }
};
export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="scroll-smooth">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="/profilePic.png"
                className="h-10 w-auto rounded-full"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-white"
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#140202]  px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="/profilePic.png"
                  className="h-10 w-auto rounded-full"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/25">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-800"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main>
        {/* Hero section */}
        <div className="relative isolate overflow-hidden bg-[#140202] pb-16 pt-14 sm:pb-20 h-dvh">
          <div className="absolute inset-0 -z-10 size-full object-cover" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-red-950 to-red-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              {/*
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                  Announcing our next round of funding.{" "}
                  <a href="#" className="font-semibold text-white">
                    <span aria-hidden="true" className="absolute inset-0" />
                    Read more <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              */}
              <div className="text-center">
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                  Websites Designed to Grow With Your Business
                </h1>
                <p className="mt-8 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
                  Affordable, professional websites delivered in just 7 days.
                  Perfect for small businesses ready to establish their online
                  presence.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-red-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                  >
                    Get started
                  </a>
                  <a
                    href="#pricing"
                    className="text-sm/6 font-semibold text-white"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Logo cloud */}
            <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <img
                alt="Transistor"
                src="/tfhLogo.png"
                width={158}
                height={48}
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              />
              <img
                alt="Reform"
                src="/oneUpLogo.webp"
                width={158}
                height={48}
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              />
              <img
                alt="Tuple"
                src="/coldGardenLogo.png"
                width={158}
                height={48}
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              />
              <img
                alt="SavvyCal"
                src="/lokiLogo.png"
                width={158}
                height={48}
                className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              />
              <img
                alt="Statamic"
                src="/nrcaerLogo.png"
                width={158}
                height={48}
                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              />
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-red-950 to-red-400 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>

        {/* Feature section */}
        <div id="services" className="mt-20 sm:mt-32">
          <div className="mx-auto max-w-2xl sm:text-center">
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-balance sm:text-5xl">
              Services
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
            <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <feature.icon
                      aria-hidden="true"
                      className="absolute left-1 top-1 size-5 text-red-900"
                    />
                    {feature.name}
                  </dt>{" "}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Testimonial section */}
        <div
          id="about"
          className="relative z-10 mt-20 bg-[#140202] pb-20 sm:mt-32 sm:pb-24 xl:pb-0"
        >
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <div className="absolute left-[calc(50%-19rem)] top-[calc(50%-36rem)] transform-gpu blur-3xl">
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="aspect-[1097/1023] w-[68.5625rem] bg-gradient-to-r from-red-950 to-red-400 opacity-25"
              />
            </div>
          </div>
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
            <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
              <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
                <img
                  alt=""
                  src="/profilePic.png"
                  className="absolute inset-0 size-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                />
              </div>
            </div>
            <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
              <figure className="relative isolate pt-6 sm:pt-12">
                <svg
                  fill="none"
                  viewBox="0 0 162 128"
                  aria-hidden="true"
                  className="absolute left-0 top-0 -z-10 h-32 stroke-white/20"
                >
                  <path
                    d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                    id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                  />
                  <use x={86} href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" />
                </svg>
                <blockquote className="text-xl/8 font-semibold text-white sm:text-lg">
                  <p>
                    Hello, I’m Scott, a web developer with a focus on creating
                    clean, functional, and user-centered websites and web
                    applications. With a background in computer science, I bring
                    both technical expertise and a practical approach to every
                    project. My goal is to craft digital experiences that not
                    only look great but also work seamlessly for your users.
                    <br />
                    <br />
                    Outside of web development, I’m someone who thrives on
                    creativity and exploration. I enjoy making music,
                    experimenting in the kitchen with new recipes, and diving
                    into new hobbies that keep me inspired. This curiosity and
                    passion for learning often influence my work, helping me
                    bring fresh ideas to the table and approach challenges from
                    unique perspectives. Whether you’re looking for a sleek
                    personal portfolio, an e-commerce solution, a complete
                    website overhaul, or a web/mobile application I’m here to
                    help bring your vision to life.
                  </p>
                </blockquote>
                <figcaption className="mt-8 text-base">
                  <div className="font-semibold text-white">Scott Charles</div>
                  <div className="mt-1 text-gray-400">
                    Web & Mobile Developer
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Pricing section */}
        <div
          id="pricing"
          className="relative isolate mt-32 px-6 sm:mt-56 lg:px-8"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-black to-gray-300 opacity-30"
            />
          </div>
          <div className="mx-auto max-w-2xl sm:text-center">
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-balance sm:text-5xl">
              Packages
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
            {tiers.map((tier, tierIdx) => (
              <div
                key={tier.id}
                className={cn(
                  tier.featured
                    ? "relative bg-[#140202] shadow-xl"
                    : "bg-white/60 sm:mx-8 lg:mx-0 shadow-md",
                  tier.featured
                    ? ""
                    : tierIdx === 0
                      ? "rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none"
                      : "sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl",
                  tierIdx === tiers.length - 1
                    ? "shadow-md rounded-b-3xl sm:rounded-t-none sm:rounded-tr-none lg:rounded-br-3xl lg:rounded-tl-none lg:rounded-bl-none px-20"
                    : "",
                  "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10",
                )}
              >
                <h3
                  id={tier.id}
                  className={cn(
                    tier.featured ? "text-red-800" : "text-red-900",
                    "text-base/7 font-semibold",
                  )}
                >
                  {tier.name}
                </h3>
                {tier.priceStarting && (
                  <p className="mt-4 flex items-center gap-x-2">
                    <span
                      className={cn(
                        tier.featured ? "text-gray-400" : "text-gray-500",
                        "text-base",
                      )}
                    >
                      starting at:
                    </span>

                    <span
                      className={cn(
                        tier.featured ? "text-white" : "text-gray-900",
                        "text-5xl font-semibold tracking-tight",
                      )}
                    >
                      {tier.priceStarting}
                    </span>
                  </p>
                )}

                <p
                  className={cn(
                    tier.featured ? "text-gray-300" : "text-gray-600",
                    "mt-6 text-base/7",
                  )}
                >
                  {tier.description}
                </p>
                <ul
                  role="list"
                  className={cn(
                    tier.featured ? "text-gray-300" : "text-gray-600",
                    "mt-8 space-y-2 text-sm/6 sm:mt-10",
                  )}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        aria-hidden="true"
                        className={cn(
                          tier.featured ? "text-red-800" : "text-red-900",
                          "h-6 w-5 flex-none",
                        )}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={cn(
                    tier.featured
                      ? "bg-red-800 text-white shadow-sm hover:bg-red-700 focus-visible:outline-red-700"
                      : "text-red-900 ring-1 ring-inset ring-red-700 hover:ring-red-500 focus-visible:outline-red-800",
                    "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10",
                  )}
                >
                  Get started today
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section*/}
        <div className="relative isolate overflow-hidden bg-[#140202] pb-16 pt-14 sm:pb-20 mt-36 lg:mt-56 h-dvh">
          <div className="absolute inset-0 -z-10 size-full object-cover" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-red-950 to-red-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
            <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
              <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                <h2 className="text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Get in touch
                </h2>
                <p className="mt-6 text-lg/8 text-gray-300">
                  Got a project in mind? I’m here to help. Get in touch today,
                  and let’s create something great!
                </p>
                <dl className="mt-10 space-y-4 text-base/7 text-gray-300">
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Telephone</span>
                      <PhoneIcon
                        aria-hidden="true"
                        className="h-7 w-6 text-gray-400"
                      />
                    </dt>
                    <dd>
                      <a
                        href="tel:+1 (403) 680-4131"
                        className="hover:text-white"
                      >
                        +1 (403) 680-4131
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Email</span>
                      <EnvelopeIcon
                        aria-hidden="true"
                        className="h-7 w-6 text-gray-400"
                      />
                    </dt>
                    <dd>
                      <a
                        href="mailto:hello@example.com"
                        className="hover:text-white"
                      >
                        scott.charles.dev@gmail.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              method="POST"
              className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
            >
              <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm/6 font-semibold text-white"
                    >
                      First name
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-red-700 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm/6 font-semibold text-white"
                    >
                      Last name
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-red-700 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-semibold text-white"
                    >
                      Email
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-red-700 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone-number"
                      className="block text-sm/6 font-semibold text-white"
                    >
                      Phone number
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="phone-number"
                        name="phone-number"
                        type="tel"
                        autoComplete="tel"
                        className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-red-700 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm/6 font-semibold text-white"
                    >
                      Message
                    </label>
                    <div className="mt-2.5">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-red-700 sm:text-sm/6"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-md bg-red-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
                  >
                    Send message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* FAQ section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Frequently asked questions
            </h2>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <Disclosure key={faq.question} as="div" className="pt-6">
                  <dt>
                    <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base/7 font-semibold">
                        {faq.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-6 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="size-6 [.group:not([data-open])_&]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </dt>
                  <DisclosurePanel as="dd" className="mt-2 pr-12">
                    <p className="text-base/7 text-gray-600">{faq.answer}</p>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </main>

      {/* Footer */}

      <footer className="bg-[#140202] mt-16">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col items-center space-y-6 sm:flex-row sm:justify-between sm:space-y-0">
            {/* Branding */}
            <div className="flex items-center space-x-3">
              <img
                alt="Your Name or Company"
                src="/profilePic.png"
                className="h-10 w-10 rounded-full"
              />
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-6">
              {footerNavigation.company.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm/6 text-gray-400 hover:text-white"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Scott Charles. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
