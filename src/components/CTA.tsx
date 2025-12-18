import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

const CTA = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-rose-light/50" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-8">
            <Heart className="w-8 h-8 text-secondary" />
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-foreground mb-6">
            Join the Fight Against <br />Breast Cancer
          </h2>

          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Every early detection matters. Partner with us to bring advanced AI screening 
            to your practice and help save more lives. Together, we can make a difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" className="group">
              Request a Demo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="heroOutline">
              Contact Sales
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Free trial available • No credit card required • HIPAA compliant
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
