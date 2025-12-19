import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, FileImage, X, Activity, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PredictionResult {
    prediction: string;
    confidence: number | null;
    features: Record<string, number>;
}

export default function ImageAnalysis() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [result, setResult] = useState<PredictionResult | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile) {
            setFile(selectedFile);
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
            setResult(null);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        maxFiles: 1,
        multiple: false
    });

    const clearFile = () => {
        if (preview) URL.revokeObjectURL(preview);
        setFile(null);
        setPreview(null);
        setResult(null);
    };

    const analyzeImage = async () => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:8000/predict-image", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to analyze image");
            }

            const data = await response.json();
            setResult(data);

            toast({
                title: "Analysis Complete",
                description: `Prediction: ${data.prediction}`,
                variant: data.prediction === "Malignant" ? "destructive" : "default",
            });
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

    return (
        <div className="min-h-screen bg-background p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-foreground">Tumor Image Analysis</h1>
                        <p className="text-muted-foreground">Upload a mammography scan for AI-powered feature extraction and prediction</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Upload */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Upload Image</CardTitle>
                                <CardDescription>Supported formats: JPG, PNG</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {!file ? (
                                    <div
                                        {...getRootProps()}
                                        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
                      ${isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                                    >
                                        <input {...getInputProps()} />
                                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                        <p className="text-lg font-medium">
                                            {isDragActive ? "Drop the image here" : "Drag & drop an image here"}
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-2">or click to select file</p>
                                    </div>
                                ) : (
                                    <div className="relative rounded-lg overflow-hidden border bg-muted/50">
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 z-10"
                                            onClick={(e) => { e.stopPropagation(); clearFile(); }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                        <img
                                            src={preview!}
                                            alt="Preview"
                                            className="w-full h-auto max-h-[400px] object-contain mx-auto"
                                        />
                                        <div className="absolute bottom-0 inset-x-0 bg-black/60 p-3 text-white flex items-center gap-2">
                                            <FileImage className="h-4 w-4" />
                                            <span className="text-sm truncate">{file.name}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-6">
                                    <Button
                                        className="w-full"
                                        size="lg"
                                        disabled={!file || loading}
                                        onClick={analyzeImage}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                <Activity className="mr-2 h-4 w-4" />
                                                Analyze Image
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Results */}
                    <div className="space-y-6">
                        {result ? (
                            <div className="animate-fade-up space-y-6">
                                <Card className={`border-l-4 ${result.prediction === "Malignant" ? "border-l-destructive" : "border-l-green-500"}`}>
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

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Extracted Features</CardTitle>
                                        <CardDescription>
                                            30 numerical features extracted from the image
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[400px] pr-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                {Object.entries(result.features).map(([key, value]) => (
                                                    <div key={key} className="flex justify-between items-center py-2 border-b last:border-0 border-border/50">
                                                        <span className="text-sm font-medium text-muted-foreground capitalize">
                                                            {key.replace(/_/g, " ")}
                                                        </span>
                                                        <span className="text-sm font-mono font-semibold">
                                                            {value.toFixed(4)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center p-12 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                                <Activity className="h-16 w-16 mb-4 opacity-20" />
                                <h3 className="text-lg font-medium mb-2">Ready to Analyze</h3>
                                <p>Upload an image and run analysis to see extracted features and prediction results here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
