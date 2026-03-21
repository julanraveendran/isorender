import { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
} from "lucide-react";
import type { Render } from "@shared/schema";

export default function Generator() {
  const [url, setUrl] = useState("");
  const [activeTab, setActiveTab] = useState("upload");
  const [dragOver, setDragOver] = useState(false);
  const [currentRenderId, setCurrentRenderId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("floorplan", file);
      const apiBase = "__PORT_5000__".startsWith("__") ? "" : "__PORT_5000__";
      const res = await fetch(`${apiBase}/api/render/upload`, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      return res.json() as Promise<{ id: number; status: string }>;
    },
    onSuccess: (data) => {
      setCurrentRenderId(data.id);
    },
    onError: () => {
      toast({ title: "Upload failed", description: "Please try again with a different image.", variant: "destructive" });
    },
  });

  // URL mutation
  const urlMutation = useMutation({
    mutationFn: async (url: string) => {
      const res = await apiRequest("POST", "/api/render/url", { url });
      return res.json() as Promise<{ id: number; status: string }>;
    },
    onSuccess: (data) => {
      setCurrentRenderId(data.id);
    },
    onError: () => {
      toast({ title: "Failed to process URL", description: "Please check the URL and try again.", variant: "destructive" });
    },
  });

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
    (renderData?.status === "processing");
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
                      Upload image
                    </TabsTrigger>
                    <TabsTrigger value="url" className="flex-1 gap-2" data-testid="tab-url">
                      <LinkIcon className="w-4 h-4" />
                      Paste URL
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
                    <ProcessingSteps />
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

// Processing steps animation
function ProcessingSteps() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const steps = [
      { delay: 2000 },
      { delay: 4000 },
      { delay: 8000 },
    ];

    const timers = steps.map((s, i) =>
      setTimeout(() => setStep(i + 1), s.delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  const steps = [
    "Extracting floor plan details",
    "Analysing room layout",
    "Generating 3D visualisation",
    "Finalising render",
  ];

  return (
    <div className="space-y-3 text-left">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center gap-3">
          {i <= step ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
            >
              {i < step ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
              )}
            </motion.div>
          ) : (
            <div className="w-4 h-4 rounded-full border border-border" />
          )}
          <span className={`text-sm ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
