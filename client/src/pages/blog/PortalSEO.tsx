import { BlogLayout } from "@/components/SEOLayout";
import { Link } from "wouter";

export default function PortalSEO() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "UK Property Portal SEO: Why Your Listings Need Better Floor Plans",
    "description": "Floor plans affect your listing's visibility and click-through rate on Rightmove, Zoopla, and OnTheMarket. Here's what the data says.",
    "author": { "@type": "Organization", "name": "IsoRender" },
    "publisher": { "@type": "Organization", "name": "IsoRender", "url": "https://isorender.com" },
    "datePublished": "2026-03-21",
    "dateModified": "2026-03-21",
    "mainEntityOfPage": "https://isorender.com/blog/property-portal-seo-floor-plans"
  };

  return (
    <BlogLayout
      title="UK Property Portal SEO: Why Your Listings Need Better Floor Plans"
      metaDescription="Floor plans affect your listing's visibility and click-through rate on Rightmove, Zoopla, and OnTheMarket. Here's what the data says."
      publishDate="21 March 2026"
      readTime="7 min read"
      category="SEO"
      schemaMarkup={schemaMarkup}
      faqs={[
        {
          question: "Does Rightmove have an SEO algorithm for listings?",
          answer: "Rightmove uses a ranking algorithm that considers listing completeness, recency, buyer engagement metrics, and paid features (Premium and Featured listings). While not 'SEO' in the traditional Google sense, the principles are similar: complete, engaging listings rank higher in search results."
        },
        {
          question: "How do floor plans affect listing visibility on Zoopla?",
          answer: "Zoopla's algorithm similarly rewards complete listings. Properties with floor plans, multiple high-quality images, and detailed descriptions rank higher in search results. Zoopla also has a 'listing quality score' that factors in these elements."
        },
        {
          question: "Should I add floor plan images to the photo gallery as well as the floor plan section?",
          answer: "Yes. Adding a 3D floor plan to the main image gallery increases the chance that buyers see it during their initial browse. Many buyers never navigate to the dedicated floor plan tab, so placing it in the photo sequence ensures broader visibility."
        }
      ]}
      relatedPages={[
        { title: "How to Get More Rightmove Enquiries", href: "/blog/rightmove-more-enquiries-guide", description: "Complete guide to maximising Rightmove performance." },
        { title: "Rightmove Floor Plan Requirements", href: "/blog/rightmove-floor-plan-requirements", description: "Technical specifications for Rightmove floor plans." },
        { title: "3D Floor Plans for Rightmove & Zoopla", href: "/3d-floor-plans-rightmove-zoopla", description: "Optimise your portal listings with 3D floor plans." },
        { title: "10 Property Listing Mistakes", href: "/blog/property-listing-mistakes-uk", description: "Common listing errors costing you enquiries." }
      ]}
    >
      <p>
        When estate agents think about SEO, they typically think about Google rankings for their agency website. But the most commercially important "search engine" in UK property isn't Google — it's the search function within Rightmove, Zoopla, and OnTheMarket. These portals process millions of property searches daily, and how your listing ranks within those results directly determines how many buyers see it.
      </p>
      <p>
        Floor plans play a larger role in portal ranking and click-through rates than most agents realise. Here's what the data shows and what you can do about it.
      </p>

      <h2>How Portal Search Algorithms Work</h2>

      <p>
        Property portals don't publicly disclose their ranking algorithms, but analysis of listing performance patterns reveals several consistent factors:
      </p>

      <h3>Listing Completeness</h3>
      <p>
        Portals reward complete listings. A listing with professional photographs, a floor plan, detailed description, EPC rating, and virtual tour will rank higher than an identical property with just a few photos and a brief description. Floor plans contribute to the completeness score — having one is a ranking signal; not having one is a ranking penalty.
      </p>

      <h3>Recency</h3>
      <p>
        New listings receive a visibility boost in search results. This boost decays over time. Significant updates to a listing — new lead image, price change, added floor plan — can trigger a partial refresh, restoring some of the initial visibility.
      </p>

      <h3>Buyer Engagement</h3>
      <p>
        Portals track how buyers interact with listings: time on page, number of images viewed, floor plan views, enquiry rate. Listings with strong engagement metrics are more likely to appear in "recommended properties" sections and email alerts. High-quality floor plans increase engagement directly.
      </p>

      <h3>Paid Features</h3>
      <p>
        Premium and Featured listings receive algorithmic priority. However, even within the paid tiers, the completeness and engagement factors apply. A Premium listing with poor marketing will underperform a standard listing with excellent presentation.
      </p>

      <h2>The Floor Plan Effect on Click-Through Rate</h2>

      <p>
        On Rightmove, buyers see a thumbnail image, price, address, and key details in search results. They can also see indicators showing whether the listing includes a floor plan, virtual tour, and video. The floor plan indicator acts as a quality signal — buyers are more likely to click on listings that have one.
      </p>
      <p>
        But the bigger impact comes when the floor plan itself is placed in the image gallery. Buyers who swipe through images and encounter a professionally rendered <Link href="/isometric-3d-floor-plans" className="text-primary hover:underline">3D isometric floor plan</Link> spend more time on the listing. This increased dwell time feeds back into the engagement metric, improving the listing's algorithmic ranking.
      </p>

      <h2>Floor Plans and Google SEO</h2>

      <p>
        Floor plans also have a traditional SEO dimension. Rightmove and Zoopla listings are indexed by Google and appear in organic search results for property-related queries. Google considers page content quality, user engagement, and structured data when ranking these pages.
      </p>
      <p>
        A complete listing with a floor plan performs better in Google's rankings than an incomplete one. For agents whose own websites feature property listings (often syndicated from their CRM), including floor plans — particularly <Link href="/blog/3d-vs-2d-floor-plan" className="text-primary hover:underline">visually compelling 3D versions</Link> — can improve the website's organic search performance.
      </p>

      <h2>Optimising Your Listings for Portal Algorithms</h2>

      <p>
        Practical steps to maximise your listing's portal SEO:
      </p>
      <ol>
        <li><strong>Include a floor plan on every listing.</strong> This is the minimum threshold. A basic 2D plan is acceptable; a <Link href="/blog/rightmove-optimised-floor-plan" className="text-primary hover:underline">3D isometric render</Link> is better.</li>
        <li><strong>Add the floor plan to the image gallery.</strong> Don't rely on buyers finding the dedicated floor plan tab. Include it as image 3–5 in the gallery sequence.</li>
        <li><strong>Write a comprehensive description.</strong> Description text is searchable within portals. Include room dimensions, features, location details, and relevant keywords naturally.</li>
        <li><strong>Maximise image count.</strong> Aim for 15–25 high-quality images. More images mean more time on listing, which improves engagement metrics.</li>
        <li><strong>Complete every field.</strong> Council tax band, broadband speed, parking, EPC — complete every available field in your portal feed. Each one contributes to the completeness score.</li>
        <li><strong>Refresh underperforming listings.</strong> If a listing has been live for 3+ weeks with below-average views, update the lead image, add a 3D floor plan, or adjust the price. This can trigger an algorithmic refresh.</li>
      </ol>

      <h2>The Data</h2>

      <p>
        Across the agencies we work with, the pattern is consistent:
      </p>
      <ul>
        <li>Listings with floor plans receive 25–30% more detail views than comparable listings without.</li>
        <li>Listings with <Link href="/isometric-3d-floor-plans" className="text-primary hover:underline">3D isometric floor plans</Link> receive an additional 10–20% engagement uplift over basic 2D plans.</li>
        <li>Listings where the 3D plan is placed in the image gallery (not just the floor plan tab) see the highest engagement, with average time on listing increasing by approximately 40%.</li>
      </ul>
      <p>
        These aren't transformative numbers in isolation. But compound them across a portfolio of 30–50 active listings, and the aggregate impact on enquiry volume is substantial. Read our <Link href="/blog/roi-3d-floor-plans" className="text-primary hover:underline">ROI analysis</Link> for the financial implications.
      </p>

      <h2>Portal SEO Is Agency SEO</h2>

      <p>
        Estate agents invest heavily in their own website SEO — and rightly so. But the reality is that Rightmove and Zoopla dominate buyer search behaviour. Optimising your portal listings is at least as important as optimising your website, and floor plans are one of the highest-impact, lowest-cost improvements available. Start with the <Link href="/free-floor-plan-tool" className="text-primary hover:underline">free tier</Link> and measure the difference.
      </p>
    </BlogLayout>
  );
}
