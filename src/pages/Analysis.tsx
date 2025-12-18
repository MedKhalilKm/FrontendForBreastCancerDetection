import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Activity, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// Define the schema for all 30 features
const formSchema = z.object({
    // Mean features
    radius_mean: z.coerce.number().min(0, "Must be positive"),
    texture_mean: z.coerce.number().min(0, "Must be positive"),
    perimeter_mean: z.coerce.number().min(0, "Must be positive"),
    area_mean: z.coerce.number().min(0, "Must be positive"),
    smoothness_mean: z.coerce.number().min(0, "Must be positive"),
    compactness_mean: z.coerce.number().min(0, "Must be positive"),
    concavity_mean: z.coerce.number().min(0, "Must be positive"),
    concave_points_mean: z.coerce.number().min(0, "Must be positive"),
    symmetry_mean: z.coerce.number().min(0, "Must be positive"),
    fractal_dimension_mean: z.coerce.number().min(0, "Must be positive"),

    // Standard Error features
    radius_se: z.coerce.number().min(0, "Must be positive"),
    texture_se: z.coerce.number().min(0, "Must be positive"),
    perimeter_se: z.coerce.number().min(0, "Must be positive"),
    area_se: z.coerce.number().min(0, "Must be positive"),
    smoothness_se: z.coerce.number().min(0, "Must be positive"),
    compactness_se: z.coerce.number().min(0, "Must be positive"),
    concavity_se: z.coerce.number().min(0, "Must be positive"),
    concave_points_se: z.coerce.number().min(0, "Must be positive"),
    symmetry_se: z.coerce.number().min(0, "Must be positive"),
    fractal_dimension_se: z.coerce.number().min(0, "Must be positive"),

    // Worst features
    radius_worst: z.coerce.number().min(0, "Must be positive"),
    texture_worst: z.coerce.number().min(0, "Must be positive"),
    perimeter_worst: z.coerce.number().min(0, "Must be positive"),
    area_worst: z.coerce.number().min(0, "Must be positive"),
    smoothness_worst: z.coerce.number().min(0, "Must be positive"),
    compactness_worst: z.coerce.number().min(0, "Must be positive"),
    concavity_worst: z.coerce.number().min(0, "Must be positive"),
    concave_points_worst: z.coerce.number().min(0, "Must be positive"),
    symmetry_worst: z.coerce.number().min(0, "Must be positive"),
    fractal_dimension_worst: z.coerce.number().min(0, "Must be positive"),
});

type FormValues = z.infer<typeof formSchema>;

const FeatureGroup = ({ title, prefix, control }: { title: string; prefix: string; control: any }) => {
    const features = [
        "radius", "texture", "perimeter", "area", "smoothness",
        "compactness", "concavity", "concave_points", "symmetry", "fractal_dimension"
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {features.map((feature) => (
                    <FormField
                        key={`${feature}_${prefix}`}
                        control={control}
                        name={`${feature}_${prefix}` as any}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize text-xs text-muted-foreground">{feature.replace("_", " ")}</FormLabel>
                                <FormControl>
                                    <Input type="number" step="any" {...field} className="h-8 text-sm" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export default function Analysis() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ prediction: string; confidence: number | null } | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            radius_mean: 0, texture_mean: 0, perimeter_mean: 0, area_mean: 0, smoothness_mean: 0,
            compactness_mean: 0, concavity_mean: 0, concave_points_mean: 0, symmetry_mean: 0, fractal_dimension_mean: 0,
            radius_se: 0, texture_se: 0, perimeter_se: 0, area_se: 0, smoothness_se: 0,
            compactness_se: 0, concavity_se: 0, concave_points_se: 0, symmetry_se: 0, fractal_dimension_se: 0,
            radius_worst: 0, texture_worst: 0, perimeter_worst: 0, area_worst: 0, smoothness_worst: 0,
            compactness_worst: 0, concavity_worst: 0, concave_points_worst: 0, symmetry_worst: 0, fractal_dimension_worst: 0,
        },
    });

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        setResult(null);
        try {
            const response = await fetch("http://localhost:8000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to get prediction");
            }

            const resultData = await response.json();
            setResult(resultData);

            toast({
                title: "Analysis Complete",
                description: `Prediction: ${resultData.prediction}`,
                variant: resultData.prediction === "Malignant" ? "destructive" : "default",
            });

            // Scroll to result
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to connect to the analysis server. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const fillSampleData = () => {
        // Fill with sample malignant values
        const sampleData = {
            radius_mean: 17.99, texture_mean: 10.38, perimeter_mean: 122.8, area_mean: 1001, smoothness_mean: 0.1184,
            compactness_mean: 0.2776, concavity_mean: 0.3001, concave_points_mean: 0.1471, symmetry_mean: 0.2419, fractal_dimension_mean: 0.07871,
            radius_se: 1.095, texture_se: 0.9053, perimeter_se: 8.589, area_se: 153.4, smoothness_se: 0.006399,
            compactness_se: 0.04904, concavity_se: 0.05373, concave_points_se: 0.01587, symmetry_se: 0.03003, fractal_dimension_se: 0.006193,
            radius_worst: 25.38, texture_worst: 17.33, perimeter_worst: 184.6, area_worst: 2019, smoothness_worst: 0.1622,
            compactness_worst: 0.6656, concavity_worst: 0.7119, concave_points_worst: 0.2654, symmetry_worst: 0.4601, fractal_dimension_worst: 0.1189,
        };
        Object.entries(sampleData).forEach(([key, value]) => {
            form.setValue(key as any, value);
        });
    };

    return (
        <div className="min-h-screen bg-background p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-foreground">Tumor Analysis</h1>
                        <p className="text-muted-foreground">Enter tumor characteristics for AI-powered prediction</p>
                    </div>
                </div>

                {result && (
                    <Card className={`animate-fade-up border-l-4 ${result.prediction === "Malignant" ? "border-l-destructive" : "border-l-green-500"}`}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5" />
                                Analysis Result
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${result.prediction === "Malignant" ? "bg-destructive/10 text-destructive" : "bg-green-500/10 text-green-500"}`}>
                                    {result.prediction === "Malignant" ? <AlertCircle className="h-8 w-8" /> : <CheckCircle2 className="h-8 w-8" />}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">{result.prediction}</h3>
                                    {result.confidence && (
                                        <p className="text-muted-foreground">
                                            Confidence Score: <span className="font-semibold text-foreground">{(result.confidence * 100).toFixed(1)}%</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Feature Input</CardTitle>
                            <Button variant="outline" size="sm" onClick={fillSampleData}>
                                Load Sample Data
                            </Button>
                        </div>
                        <CardDescription>
                            Please enter the 30 numerical features derived from the digitized image of the fine needle aspirate (FNA) of a breast mass.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FeatureGroup title="Mean Features" prefix="mean" control={form.control} />
                                <div className="h-px bg-border" />
                                <FeatureGroup title="Standard Error Features" prefix="se" control={form.control} />
                                <div className="h-px bg-border" />
                                <FeatureGroup title="Worst Features" prefix="worst" control={form.control} />

                                <div className="flex justify-end gap-4">
                                    <Button type="button" variant="outline" onClick={() => navigate("/")}>Cancel</Button>
                                    <Button type="submit" className="min-w-[150px]" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                <Activity className="mr-2 h-4 w-4" />
                                                Start Analysis
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
