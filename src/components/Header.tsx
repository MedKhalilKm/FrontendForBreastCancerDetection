import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <span className="font-heading text-xl font-semibold text-foreground">
            OncoScan
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Features
          </a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            How It Works
          </a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            About
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Log In
          </Button>
          <Button variant="default" className="rounded-full">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
