import SEOLayout from "@/components/SEOLayout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Home,
  Users,
  Eye,
  ShieldCheck,
} from "lucide-react";

export default function LettingAgents() {
  const faqs = [
    {
      question: "Why do letting agents need 3D floor plans?",
      answer:
        "Rental properties receive high volumes of enquiries but also high numbers of wasted viewings. A 3D floor plan helps prospective tenants understand the layout before booking a viewing, reducing no-shows and time spent on unsuitable viewings. For HMO properties and complex layouts, a 3D plan is particularly valuable because standard photos often fail to convey how rooms connect.",
    },
    {
      question: "Do 3D floor plans help with HMO marketing?",
      answer:
        "Yes. HMO properties (houses in multiple occupation) have complex layouts that are difficult to convey through photography alone. An isometric render shows how bedrooms relate to shared spaces, where bathrooms are positioned, and how communal areas connect. This clarity attracts more informed tenant enquiries and reduces confusion during viewings.",
    },
    {
      question: "Can I use IsoRender for student lettings?",
      answer:
        "Absolutely. Student accommodation — whether purpose-built or converted HMOs — benefits significantly from isometric floor plans. Students searching online want to understand bedroom sizes relative to each other, the position of shared facilities, and the overall layout of the property before committing to a group tenancy.",
    },
    {
      question: "What about furnished vs unfurnished rentals?",
      answer:
        "IsoRender offers both furnished and unfurnished rendering styles. For furnished rentals, choose a furnished preset to show the property as tenants will find it. For unfurnished rentals, the empty-room style shows spatial proportions without suggesting furniture that will not be provided.",
    },
    {
      question: "How does pricing work for letting agents?",
      answer:
        "The same pricing applies: Free (1 render/month), Pro (£7/render), or Agency (£49/month unlimited). Letting agents with large managed portfolios typically find the Agency plan best value, as they can render floor plans for their entire portfolio and update them when properties are reconfigured.",
    },
  ];

  const relatedPages = [
    {
      title: "3D Floor Plans for Estate Agents",
      href: "/3d-floor-plans-for-estate-agents",
      description:
        "Sales-focused guide for estate agents using IsoRender.",
    },
    {
      title: "3D Floor Plans for Rightmove & Zoopla",
      href: "/3d-floor-plans-rightmove-zoopla",
      description:
        "Portal integration guide — import listings and upload renders directly.",
    },
    {
      title: "Free Floor Plan Tool",
      href: "/free-floor-plan-tool",
      description:
        "Try IsoRender with one free render per month. No credit card needed.",
    },
    {
      title: "Floor Plan Rendering UK",
      href: "/floor-plan-rendering-uk",
      description:
        "Full pricing details and UK service information.",
    },
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "3D Floor Plans for Letting Agents — Rental Property Marketing | IsoRender",
    description:
      "Isometric 3D floor plans for letting agents. Reduce wasted viewings, market HMO layouts clearly, and attract better tenant enquiries. From £7 per render.",
    url: "https://isorender.com/3d-floor-plans-letting-agents",
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  };

  return (
    <SEOLayout
      title="3D Floor Plans for Letting Agents — Rental Property Marketing"
      metaDescription="Isometric 3D floor plans for letting agents. Reduce wasted viewings, market HMO layouts clearly, and improve tenant enquiry quality. From £7 per render."
      breadcrumbs={[{ label: "For Letting Agents" }]}
      faqs={faqs}
      relatedPages={relatedPages}
      schemaMarkup={schemaMarkup}
    >
      <article className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
          3D Floor Plans for Letting Agents
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          The rental market moves fast. A well-located two-bedroom flat in a
          major UK city can receive dozens of enquiries within hours of listing.
          For letting agents, the challenge is not generating interest — it is
          filtering that interest into qualified viewings. A 3D floor plan for
          letting agents gives prospective tenants a clear understanding of the
          rental property layout before they book a viewing, reducing no-shows
          and wasted time for everyone involved.
        </p>

        {/* The Problem with Rental Viewings */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          The Problem with Rental Viewings
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Letting agents routinely conduct 5–10 viewings per property before
          securing a tenancy. Many of those viewings end with the prospective
          tenant saying some version of: "It's smaller than I expected" or "I
          didn't realise the bedrooms were next to each other" or "The layout
          doesn't work for us."
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          These are layout problems — issues that a floor plan would have
          communicated instantly. Standard listing photographs show individual
          rooms in isolation. They rarely convey how rooms connect, how large
          they are relative to each other, or how the overall property flows.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Isometric 3D floor plans solve this by showing the complete property
          layout in a single, intuitively readable image. When tenants can see
          the layout before viewing, the viewings that do happen are more
          productive — leading to faster lets and less dead time for your team.
        </p>

        {/* Benefits */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Benefits for Letting Agents
        </h2>
        <div className="space-y-6 mb-8">
          <div className="flex gap-4">
            <Eye className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Reduce wasted viewings</h3>
              <p className="text-muted-foreground leading-relaxed">
                When tenants understand the layout before visiting, they
                self-select out if the property does not suit their needs. This
                means fewer viewings per let, less staff time spent on
                non-starters, and a more efficient lettings operation.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">
                Attract higher-quality enquiries
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Tenants who book a viewing after seeing a 3D floor plan are
                making a more informed decision. They already know the layout
                works for them. This leads to higher offer-to-viewing ratios and
                faster tenancy agreements.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Home className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">
                Differentiate your agency
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Most letting agents do not include floor plans in rental
                listings. Adding a 3D isometric render immediately sets your
                listings apart on Rightmove and Zoopla. Landlords notice —
                better marketing materials help you win and retain management
                instructions.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">
                Support remote lettings
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Corporate relocations, overseas tenants, and time-poor
                professionals increasingly want to secure rental properties with
                minimal physical viewings. A 3D floor plan — combined with
                photography and a video tour — can give a tenant enough
                confidence to agree terms without a second visit.
              </p>
            </div>
          </div>
        </div>

        {/* HMO Layouts */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          HMO and Multi-Let Property Marketing
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          HMO properties present a particular marketing challenge. A converted
          Victorian house with six bedrooms, two shared bathrooms, and a
          communal kitchen has a complex layout that is nearly impossible to
          communicate through photography alone.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Prospective tenants — often students or young professionals — need to
          understand:
        </p>
        <ul className="space-y-2 mb-6">
          {[
            "Which bedroom is theirs (size comparison between rooms)",
            "Where the shared bathroom is relative to their bedroom",
            "How the communal kitchen and living areas connect",
            "Whether there is an en-suite or if they share facilities",
            "The position of the property entrance and any outdoor space",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground leading-relaxed mb-6">
          An isometric 3D floor plan communicates all of this in a single image.
          For agents managing multiple HMO properties, IsoRender's Agency plan
          (£49/month unlimited) means every property in the portfolio can have a
          professional floor plan render without individually costing each one.
        </p>

        {/* Tenant Expectations */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Tenant Expectations Are Rising
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The Renters' Reform Bill and increased regulatory scrutiny are raising
          standards across the lettings industry. Tenants are better informed
          and more demanding about the quality of marketing materials and
          pre-tenancy information.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Floor plans are increasingly expected by tenants, particularly in
          urban markets where rental demand is high and properties are
          competitive. Agents who provide clear, professional floor plan
          visualisations demonstrate a higher standard of service — both to
          tenants and to landlords evaluating which agent to instruct.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The Propertymark Code of Practice also recommends that letting agents
          provide accurate and comprehensive property information. Floor plans
          contribute to this obligation and reduce the risk of complaints from
          tenants who feel the property was misrepresented.
        </p>

        {/* Property Types */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Rental Property Types We Support
        </h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {[
            {
              title: "Flats and apartments",
              desc: "Studio, one-bed, two-bed, and three-bed flats — including purpose-built blocks, converted properties, and mansion flats.",
            },
            {
              title: "Houses",
              desc: "Terraced, semi-detached, and detached houses available for family lettings. Show the full layout including gardens and garage access.",
            },
            {
              title: "HMOs",
              desc: "Multi-let properties with shared facilities. Show bedroom sizes, bathroom positions, and communal area relationships clearly.",
            },
            {
              title: "Student accommodation",
              desc: "Cluster flats, shared houses, and studio-based schemes. Help student groups understand who gets which room.",
            },
            {
              title: "Build-to-rent units",
              desc: "Purpose-built rental apartments in managed developments. Support marketing teams with consistent renders across all unit types.",
            },
            {
              title: "Serviced accommodation",
              desc: "Furnished rental units and corporate lets. The furnished rendering style shows the property as the tenant will find it on move-in day.",
            },
          ].map((item, i) => (
            <div key={i} className="border border-border rounded-lg p-5">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center mt-10">
          <h2 className="text-xl font-bold tracking-tight mb-2">
            Add 3D floor plans to your rental listings
          </h2>
          <p className="text-muted-foreground mb-4">
            Upload a floor plan or paste a Rightmove/Zoopla URL. Your first
            render is free — no credit card, no commitment.
          </p>
          <Link href="/generate">
            <Button size="lg" className="gap-2">
              Try IsoRender Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </article>
    </SEOLayout>
  );
}
