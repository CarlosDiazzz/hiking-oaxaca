import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Trees, Users, Map as MapIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { label: "Turismo Sostenible", value: 100, suffix: "%", icon: Trees },
    { label: "Guías Expertos", value: 12, suffix: "+", icon: MapIcon },
    { label: "Viaje Seguro", value: 100, suffix: "%", icon: ShieldCheck },
    { label: "Clientes Felices", value: 500, suffix: "+", icon: Users },
];

export default function StatCards() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const counters =
                sectionRef.current?.querySelectorAll(".stat-value") ?? [];

            counters.forEach((counter) => {
                const target = parseInt(
                    counter.getAttribute("data-target"),
                    10,
                );

                gsap.to(counter, {
                    innerText: target,
                    duration: 2,
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 90%",
                    },
                    onUpdate: function () {
                        if (this.progress() < 0.8) {
                            counter.innerText = Math.floor(
                                Math.random() * target,
                            );
                        } else {
                            counter.innerText = Math.ceil(
                                this.targets()[0].innerText,
                            );
                        }
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-10 px-12 bg-[#F7F7F4] relative z-30 text-center"
        >
            <h2
                className="text-4xl md:text-6xl font-bold py-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
            >
                Nuestras Cifras
            </h2>
            <h4 className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs">
                Lo que nos hace únicos
            </h4>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center p-8 rounded-3xl bg-[#F7F7F4]  transition-all duration-300 group"
                        >
                            <div className="p-4 bg-white rounded-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                                <stat.icon className="w-8 h-8 text-[#D4AF37]" />
                            </div>
                            <div className="flex items-baseline mb-2">
                                <span
                                    className="stat-value text-4xl font-bold text-[#1A432B]"
                                    data-target={stat.value}
                                >
                                    0
                                </span>
                                <span className="text-2xl font-bold text-[#D4AF37] ml-1">
                                    {stat.suffix}
                                </span>
                            </div>
                            <p className="text-[#1A432B]/60 font-bold uppercase tracking-widest text-[10px] text-center">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
