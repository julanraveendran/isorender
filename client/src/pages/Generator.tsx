import { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Upload,
  Link as LinkIcon,
  ArrowLeft,
  Download,
  Loader2,
  CheckCircle2,
  XCircle,
  ImageIcon,
  Sparkles,
  RefreshCw,
  Check,
  Gift,
  X,
} from "lucide-react";
import type { Render } from "@shared/schema";

const MAX_FREE_RENDERS = 3;

const PRICING_PLANS = [
  { name: "Starter", planId: "starter", price: "£7", credits: 10, features: ["10 render credits", "Standard resolution", "Floor plan upload"] },
  { name: "Professional", planId: "professional", price: "£19", credits: 50, popular: true, features: ["50 render credits", "4K resolution", "URL extraction", "Priority processing"] },
  { name: "Studio", planId: "agency", price: "£49", credits: 150, features: ["150 render credits", "4K resolution", "Batch rendering", "API access"] },
];

export default function Generator() {
  const [url, setUrl] = useState("");
  const [activeTab, setActiveTab] = useState("upload");
  const [dragOver, setDragOver] = useState(false);
  const [currentRenderId, setCurrentRenderId] = useState<number | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [photo3DUrl, setPhoto3DUrl] = useState("");
  const [photo3DPrompt, setPhoto3DPrompt] = useState("");
  const [photo3DFile, setPhoto3DFile] = useState<File | null>(null);
  const [photo3DPreview, setPhoto3DPreview] = useState<string>("");
  const photo3DFileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Track free renders in localStorage
  const [freeRendersUsed, setFreeRendersUsed] = useState(() => {
    return parseInt(localStorage.getItem("isorender_free_renders") || "0", 10);
  });
  const freeRendersRemaining = MAX_FREE_RENDERS - freeRendersUsed;

  const trackFreeRender = () => {
    const newCount = freeRendersUsed + 1;
    setFreeRendersUsed(newCount);
    localStorage.setItem("isorender_free_renders", String(newCount));
  };

  const handleBuyPlan = async (planId: string) => {
    try {
      const currentUrl = window.location.href.split("#")[0];
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          successUrl: `${currentUrl}#/generate?purchased=true`,
          cancelUrl: `${currentUrl}#/generate`,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast({ title: "Error", description: data.error || "Failed to create checkout", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Payment system unavailable", variant: "destructive" });
    }
  };

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("floorplan", file);
      const res = await fetch("/api/render/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 402 || data.requiresPayment) {
          throw Object.assign(new Error(data.error || "402"), { requiresPayment: true });
        }
        throw new Error(data.error || `${res.status}`);
      }
      return res.json() as Promise<{ id: number; status: string }>;
    },
    onSuccess: (data) => {
      setCurrentRenderId(data.id);
      trackFreeRender();
    },
    onError: (error: any) => {
      if (error.requiresPayment || error.message?.includes("402") || error.message?.includes("requiresPayment")) {
        setShowPaywall(true);
      } else {
        toast({ title: "Upload failed", description: "Please try again with a different image.", variant: "destructive" });
      }
    },
  });

  // URL mutation
  const urlMutation = useMutation({
    mutationFn: async (url: string) => {
      const res = await apiRequest("POST", "/api/render/url", { url });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 402 || data.requiresPayment) {
          throw Object.assign(new Error(data.error || "402"), { requiresPayment: true });
        }
        throw new Error(data.error || `${res.status}`);
      }
      return res.json() as Promise<{ id: number; status: string }>;
    },
    onSuccess: (data) => {
      setCurrentRenderId(data.id);
      trackFreeRender();
    },
    onError: (error: any) => {
      if (error.requiresPayment || error.message?.includes("402") || error.message?.includes("requiresPayment")) {
        setShowPaywall(true);
      } else {
        toast({ title: "Failed to process URL", description: "Please check the URL and try again.", variant: "destructive" });
      }
    },
  });

  // Photo-to-3D mutation (handles both file upload and URL)
  const photo3DMutation = useMutation({
    mutationFn: async ({ imageUrl, prompt, file }: { imageUrl?: string; prompt?: string; file?: File }) => {
      // If we have a file, use FormData
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        if (prompt) formData.append("prompt", prompt);
        const res = await fetch("/api/render/photo-to-3d", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          if (res.status === 402 || data.requiresPayment) {
            throw Object.assign(new Error(data.error || "402"), { requiresPayment: true });
          }
          throw new Error(data.error || `${res.status}`);
        }
        return res.json() as Promise<{ taskId: string; status: string; renderId: number }>;
      }
      
      // Otherwise use URL
      const res = await fetch("/api/render/photo-to-3d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, prompt }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 402 || data.requiresPayment) {
          throw Object.assign(new Error(data.error || "402"), { requiresPayment: true });
        }
        throw new Error(data.error || `${res.status}`);
      }
      return res.json() as Promise<{ taskId: string; status: string; renderId: number }>;
    },
    onSuccess: (data) => {
      setCurrentRenderId(data.renderId);
      trackFreeRender();
      toast({ title: "3D generation started", description: "This usually takes 30-60 seconds. We'll notify you when it's ready!" });
    },
    onError: (error: any) => {
      if (error.requiresPayment || error.message?.includes("402") || error.message?.includes("requiresPayment")) {
        setShowPaywall(true);
      } else {
        toast({ title: "Failed to start 3D generation", description: error.message || "Please try again.", variant: "destructive" });
      }
    },
  });

  const handlePhoto3DFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image file.", variant: "destructive" });
      return;
    }
    setPhoto3DFile(file);
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPhoto3DPreview(previewUrl);
  };

  const handlePhotoTo3DSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo3DFile && !photo3DUrl) {
      toast({ title: "Photo required", description: "Please upload a room photo", variant: "destructive" });
      return;
    }
    if (photo3DFile) {
      photo3DMutation.mutate({ prompt: photo3DPrompt || undefined, file: photo3DFile });
    } else {
      photo3DMutation.mutate({ imageUrl: photo3DUrl, prompt: photo3DPrompt || undefined });
    }
  };

  // Poll render status
  const { data: renderData } = useQuery<Render>({
    queryKey: ["/api/render", currentRenderId],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/render/${currentRenderId}`);
      return res.json();
    },
    enabled: !!currentRenderId,
    refetchInterval: (query) => {
      const data = query.state.data as Render | undefined;
      if (data?.status === "completed" || data?.status === "failed") return false;
      return 2000;
    },
  });

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image file (PNG, JPG, or WebP).", variant: "destructive" });
      return;
    }
    uploadMutation.mutate(file);
  }, [uploadMutation, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    if (!url.includes("rightmove.co.uk") && !url.includes("zoopla.co.uk")) {
      toast({ title: "Unsupported URL", description: "Please paste a Rightmove or Zoopla property URL.", variant: "destructive" });
      return;
    }
    urlMutation.mutate(url);
  };

  const isProcessing = uploadMutation.isPending || urlMutation.isPending ||
    renderData?.status === "analyzing" || renderData?.status === "rendering" || renderData?.status === "processing";
  const isCompleted = renderData?.status === "completed";
  const isFailed = renderData?.status === "failed";

  const handleReset = () => {
    setCurrentRenderId(null);
    setUrl("");
    uploadMutation.reset();
    urlMutation.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Paywall overlay */}
      <AnimatePresence>
        {showPaywall && (
          <PaywallModal
            onBuyPlan={handleBuyPlan}
            onDismiss={() => {
              setShowPaywall(false);
              window.location.hash = "#/";
            }}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1.5" data-testid="button-back">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-label="IsoRender logo">
                <path d="M16 4L28 11V21L16 28L4 21V11L16 4Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M16 4L16 14L28 21" stroke="currentColor" strokeWidth="1.5" />
                <path d="M16 14L4 21" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="font-semibold tracking-tight" data-testid="text-brand-gen">IsoRender</span>
            </div>
          </div>
          {freeRendersRemaining > 0 && (
            <Badge variant="secondary" className="gap-1.5 text-xs px-3 py-1">
              <Gift className="w-3 h-3" />
              {freeRendersRemaining} free render{freeRendersRemaining !== 1 ? "s" : ""} remaining
            </Badge>
          )}
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!currentRenderId ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-center mb-10">
                <h1 className="text-2xl font-bold tracking-tight mb-2" data-testid="text-gen-title">Generate 3D render</h1>
                <p className="text-muted-foreground">Upload a floor plan or paste a property listing URL</p>
              </div>

              <div className="max-w-xl mx-auto">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="upload" className="flex-1 gap-2" data-testid="tab-upload">
                      <Upload className="w-4 h-4" />
                      Floor Plan
                    </TabsTrigger>
                    <TabsTrigger value="url" className="flex-1 gap-2" data-testid="tab-url">
                      <LinkIcon className="w-4 h-4" />
                      Rightmove/Zoopla
                    </TabsTrigger>
                    <TabsTrigger value="photo-3d" className="flex-1 gap-2" data-testid="tab-photo-3d">
                      <Sparkles className="w-4 h-4" />
                      Photo → 3D
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload">
                    <div
                      className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
                        dragOver
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      data-testid="dropzone"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFile(file);
                        }}
                        data-testid="input-file"
                      />
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="font-medium mb-1">Drop a floor plan image here</p>
                      <p className="text-sm text-muted-foreground mb-4">or click to browse. PNG, JPG, or WebP up to 10MB.</p>
                      <Button variant="outline" size="sm" className="gap-2" data-testid="button-browse">
                        <Upload className="w-3.5 h-3.5" />
                        Browse files
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="url">
                    <form onSubmit={handleUrlSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Property listing URL</label>
                        <Input
                          type="url"
                          placeholder="https://www.rightmove.co.uk/properties/..."
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="h-11"
                          data-testid="input-url"
                        />
                        <p className="text-xs text-muted-foreground">
                          Supports Rightmove and Zoopla property listings
                        </p>
                      </div>
                      <Button type="submit" className="w-full gap-2" size="lg" data-testid="button-generate-url">
                        <Sparkles className="w-4 h-4" />
                        Generate 3D render
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="photo-3d">
                    <div
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                        dragOver
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        const file = e.dataTransfer.files[0];
                        if (file && file.type.startsWith("image/")) {
                          handlePhoto3DFile(file);
                        }
                      }}
                      onClick={() => photo3DFileInputRef.current?.click()}
                    >
                      <input
                        ref={photo3DFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handlePhoto3DFile(file);
                        }}
                      />
                      {photo3DPreview ? (
                        <img src={photo3DPreview} alt="Preview" className="max-h-48 mx-auto rounded-lg mb-4" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                          <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                      <p className="font-medium mb-1">
                        {photo3DPreview ? "Click to change photo" : "Drop a room photo here"}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {photo3DPreview ? "" : "or click to browse. JPG, PNG up to 10MB."}
                      </p>
                      {photo3DPreview && (
                        <div className="space-y-3">
                          <Input
                            type="text"
                            placeholder="A modern living room with sofa and windows (optional)"
                            value={photo3DPrompt}
                            onChange={(e) => setPhoto3DPrompt(e.target.value)}
                            className="h-10 text-sm"
                          />
                          <Button 
                            type="button"
                            className="w-full gap-2" 
                            size="lg" 
                            disabled={photo3DMutation.isPending}
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePhotoTo3DSubmit(new Event('submit') as any);
                            }}
                          >
                            {photo3DMutation.isPending ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Sparkles className="w-4 h-4" />
                            )}
                            Generate 3D walkthrough
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                        Generate 3D walkthrough
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Processing state */}
              {isProcessing && (
                <div className="text-center py-20">
                  <motion.div
                    className="w-16 h-16 rounded-full border-2 border-primary border-t-transparent mx-auto mb-6"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  />
                  <h2 className="text-xl font-semibold mb-2">Generating your 3D render</h2>
                  <p className="text-muted-foreground mb-6">Analysing floor plan and creating isometric visualisation...</p>
                  <div className="max-w-xs mx-auto">
                    <ProcessingSteps status={renderData?.status} />
                  </div>
                </div>
              )}

              {/* Completed state */}
              {isCompleted && renderData && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <h2 className="text-xl font-semibold">Render complete</h2>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5" data-testid="button-new-render">
                        <RefreshCw className="w-3.5 h-3.5" />
                        New render
                      </Button>
                      {renderData.renderUrl && (
                        <Button size="sm" className="gap-1.5" data-testid="button-download" onClick={() => {
                          const link = document.createElement("a");
                          link.href = renderData.renderUrl!;
                          link.download = "isorender-render.png";
                          link.click();
                        }}>
                          <Download className="w-3.5 h-3.5" />
                          Download 4K
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {renderData.floorPlanUrl && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-3">Original floor plan</p>
                        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
                          <img
                            src={renderData.floorPlanUrl}
                            alt="Original floor plan"
                            className="w-full object-contain max-h-96"
                            crossOrigin="anonymous"
                            data-testid="img-floorplan"
                          />
                        </div>
                      </div>
                    )}
                    {renderData.renderUrl && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-3">3D isometric render</p>
                        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
                          <img
                            src={renderData.renderUrl}
                            alt="3D isometric render"
                            className="w-full object-contain max-h-96"
                            data-testid="img-render"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Failed state */}
              {isFailed && (
                <div className="text-center py-20">
                  <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Rendering failed</h2>
                  <p className="text-muted-foreground mb-6">Something went wrong. Please try again with a different image or URL.</p>
                  <Button onClick={handleReset} className="gap-2" data-testid="button-try-again">
                    <RefreshCw className="w-4 h-4" />
                    Try again
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Paywall modal overlay
function PaywallModal({ onBuyPlan, onDismiss }: { onBuyPlan: (planId: string) => void; onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onDismiss} />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 bg-background border border-border rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">You've used your 3 free renders</h2>
            <p className="text-muted-foreground text-lg">Upgrade to continue generating stunning 3D isometric renders</p>
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.planId}
                className={`relative rounded-xl border p-6 ${
                  plan.popular
                    ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary/20"
                    : "bg-card border-card-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[hsl(var(--accent))] text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full">Best value</span>
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="font-semibold mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    <span className={`text-xs ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>one-time</span>
                  </div>
                  <p className={`text-xs mt-0.5 ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {plan.credits} credits
                  </p>
                </div>
                <ul className="space-y-2 mb-5">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs">
                      <Check className={`w-3.5 h-3.5 flex-shrink-0 ${plan.popular ? "text-primary-foreground" : "text-[hsl(var(--accent))]"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  size="sm"
                  variant={plan.popular ? "secondary" : "default"}
                  onClick={() => onBuyPlan(plan.planId)}
                >
                  Buy {plan.name} — {plan.price}
                </Button>
              </div>
            ))}
          </div>

          {/* Dismiss */}
          <div className="text-center">
            <button
              onClick={onDismiss}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Processing steps animation — driven by actual backend status
function ProcessingSteps({ status }: { status?: string }) {
  // Base step determined by actual backend status
  let baseStep = 0;
  if (status === "analyzing") baseStep = 0;
  if (status === "rendering") baseStep = 2;
  if (status === "completed") baseStep = 4;

  const [subStep, setSubStep] = useState(0);

  // Progress sub-step within each phase
  useEffect(() => {
    setSubStep(0);
    const timer = setTimeout(() => setSubStep(1), status === "analyzing" ? 5000 : 10000);
    return () => clearTimeout(timer);
  }, [status]);

  const currentStep = baseStep + subStep;

  const steps = [
    "Analysing floor plan layout",
    "Extracting room dimensions & positions",
    "Generating 3D isometric render",
    "Finalising high-resolution output",
  ];

  return (
    <div className="space-y-3 text-left">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center gap-3">
          {i <= currentStep ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
            >
              {i < currentStep ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
              )}
            </motion.div>
          ) : (
            <div className="w-4 h-4 rounded-full border border-border" />
          )}
          <span className={`text-sm ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
