import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Landing from "./pages/Landing";
import Generator from "./pages/Generator";
import NotFound from "./pages/not-found";

// SEO landing pages
import IsometricFloorPlans from "./pages/seo/IsometricFloorPlans";
import EstateAgents from "./pages/seo/EstateAgents";
import GeneratorSEO from "./pages/seo/GeneratorSEO";
import RenderingUK from "./pages/seo/RenderingUK";
import RightmoveZoopla from "./pages/seo/RightmoveZoopla";
import IsometricRendering from "./pages/seo/IsometricRendering";
import PropertyDevelopers from "./pages/seo/PropertyDevelopers";
import Architects from "./pages/seo/Architects";
import LettingAgents from "./pages/seo/LettingAgents";
import CompareIso3d from "./pages/seo/CompareIso3d";
import CompareMatterport from "./pages/seo/CompareMatterport";
import FreeTool from "./pages/seo/FreeTool";

// Blog
import BlogIndex from "./pages/BlogIndex";
import WhatIsIsometricFloorPlan from "./pages/blog/WhatIsIsometricFloorPlan";
import RightmoveEnquiries from "./pages/blog/RightmoveEnquiries";
import ThreeDvsTwoD from "./pages/blog/ThreeDvsTwoD";
import BestFloorPlanTools from "./pages/blog/BestFloorPlanTools";
import CaseStudy from "./pages/blog/CaseStudy";
import RightmoveRequirements from "./pages/blog/RightmoveRequirements";
import CGIVisualisation from "./pages/blog/CGIVisualisation";
import AIPropertyMarketing from "./pages/blog/AIPropertyMarketing";
import IsometricArchitecture from "./pages/blog/IsometricArchitecture";
import Convert2Dto3D from "./pages/blog/Convert2Dto3D";
import ListingMistakes from "./pages/blog/ListingMistakes";
import NewBuildMarketing from "./pages/blog/NewBuildMarketing";
import VisualisationArchitects from "./pages/blog/VisualisationArchitects";
import LettingAgentsBlog from "./pages/blog/LettingAgentsBlog";
import Comparison from "./pages/blog/Comparison";
import RightmoveOptimised from "./pages/blog/RightmoveOptimised";
import PortalSEO from "./pages/blog/PortalSEO";
import ROIFloorPlans from "./pages/blog/ROIFloorPlans";
import InteriorDesign from "./pages/blog/InteriorDesign";
import ChatGPTEstateAgents from "./pages/blog/ChatGPTEstateAgents";
import { ComponentType } from "react";

const blogRoutes: Record<string, ComponentType> = {
  "what-is-isometric-floor-plan": WhatIsIsometricFloorPlan,
  "rightmove-more-enquiries-guide": RightmoveEnquiries,
  "3d-vs-2d-floor-plan": ThreeDvsTwoD,
  "best-floor-plan-tools-uk": BestFloorPlanTools,
  "case-study-3d-floor-plans": CaseStudy,
  "rightmove-floor-plan-requirements": RightmoveRequirements,
  "cgi-3d-visualisation-uk-property": CGIVisualisation,
  "ai-changing-property-marketing": AIPropertyMarketing,
  "isometric-architecture-drawing-guide": IsometricArchitecture,
  "convert-2d-floor-plan-to-3d": Convert2Dto3D,
  "property-listing-mistakes-uk": ListingMistakes,
  "new-build-property-marketing": NewBuildMarketing,
  "property-visualisation-tools-architects": VisualisationArchitects,
  "letting-agents-3d-floor-plans": LettingAgentsBlog,
  "isorender-vs-competitors": Comparison,
  "rightmove-optimised-floor-plan": RightmoveOptimised,
  "property-portal-seo-floor-plans": PortalSEO,
  "roi-3d-floor-plans": ROIFloorPlans,
  "interior-design-visualisation-tools": InteriorDesign,
  "chatgpt-estate-agents": ChatGPTEstateAgents,
};

function BlogRouter({ params }: { params: { slug: string } }) {
  const Component = blogRoutes[params.slug];
  if (!Component) return <NotFound />;
  return <Component />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router hook={useHashLocation}>
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/generate" component={Generator} />

          {/* SEO landing pages */}
          <Route path="/isometric-3d-floor-plans" component={IsometricFloorPlans} />
          <Route path="/3d-floor-plans-for-estate-agents" component={EstateAgents} />
          <Route path="/isometric-floor-plan-generator" component={GeneratorSEO} />
          <Route path="/floor-plan-rendering-uk" component={RenderingUK} />
          <Route path="/3d-floor-plans-rightmove-zoopla" component={RightmoveZoopla} />
          <Route path="/isometric-floorplan-rendering" component={IsometricRendering} />
          <Route path="/3d-floor-plans-property-developers" component={PropertyDevelopers} />
          <Route path="/3d-floor-plans-architects" component={Architects} />
          <Route path="/3d-floor-plans-letting-agents" component={LettingAgents} />
          <Route path="/compare/isorender-vs-iso3d" component={CompareIso3d} />
          <Route path="/compare/isorender-vs-matterport" component={CompareMatterport} />
          <Route path="/free-floor-plan-tool" component={FreeTool} />

          {/* Blog */}
          <Route path="/blog" component={BlogIndex} />
          <Route path="/blog/:slug">{(params) => <BlogRouter params={params} />}</Route>

          <Route component={NotFound} />
        </Switch>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
