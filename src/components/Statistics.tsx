const stats = [
  { value: "98.5%", label: "Detection Accuracy" },
  { value: "2M+", label: "Scans Analyzed" },
  { value: "<60s", label: "Average Analysis Time" },
  { value: "500+", label: "Partner Clinics" },
];

const Statistics = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/70 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
