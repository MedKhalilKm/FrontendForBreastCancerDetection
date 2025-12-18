import { Brain, Clock, FileCheck, Lock, Microscope, Users } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Deep learning algorithms trained on millions of scans deliver precise tumor detection and classification.",
  },
  {
    icon: Clock,
    title: "Rapid Results",
    description: "Get comprehensive analysis results in under 60 seconds, enabling faster clinical decisions.",
  },
  {
    icon: Microscope,
    title: "High Precision",
    description: "Detects tumors as small as 2mm with industry-leading sensitivity and specificity rates.",
  },
  {
    icon: FileCheck,
    title: "Detailed Reports",
    description: "Generate comprehensive reports with visual annotations and risk assessments for patients.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "End-to-end encryption ensures patient data remains protected and HIPAA compliant.",
  },
  {
    icon: Users,
    title: "Collaborative Tools",
    description: "Share findings with specialists and enable second opinions seamlessly.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm tracking-wide uppercase">Features</span>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-foreground mt-3 mb-4">
            Advanced Detection, <br />Simplified Workflow
          </h2>
          <p className="text-muted-foreground text-lg">
            Empowering healthcare professionals with cutting-edge tools to improve patient outcomes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
