import { Upload, Cpu, FileText, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Scan",
    description: "Securely upload mammography images in DICOM or standard image formats.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Analysis",
    description: "Our neural network processes the scan, identifying potential areas of concern.",
  },
  {
    icon: FileText,
    step: "03",
    title: "Review Results",
    description: "Receive detailed findings with annotated images and confidence scores.",
  },
  {
    icon: MessageCircle,
    step: "04",
    title: "Collaborate",
    description: "Share results with specialists and discuss treatment options with patients.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-medium text-sm tracking-wide uppercase">Process</span>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-foreground mt-3 mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            From scan upload to actionable insights in four simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative text-center group">
                {/* Step Number Circle */}
                <div className="relative mx-auto w-20 h-20 mb-6">
                  <div className="absolute inset-0 rounded-full bg-accent group-hover:bg-primary/10 transition-colors duration-300" />
                  <div className="absolute inset-2 rounded-full bg-card shadow-soft flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
