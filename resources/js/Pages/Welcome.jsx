import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoCard from "@/Components/BentoCard";
import PillMenu from "@/Components/PillMenu";
import Ubicacion from "@/Components/Ubicacion";
import Footer from "@/Components/Footer";
import HistoriaPreview from "@/Components/HistoriaPreview";
import StatCards from "@/Components/StatCards";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const timelineMoments = [
    {
        id: "jalatlaco",
        time: "6:00 AM",
        title: "Salida en Jalatlaco",
        type: "logistics",
        image: "/images/stops/jalatlaco.webp",
        desc: "Punto de encuentro y abordaje de la van.",
    },
    {
        id: "llegada",
        time: "8:00 AM",
        title: "Llegada al Llano",
        type: "logistics",
        image: "/images/stops/llegada.jpg",
        desc: "Arribo a Llano de las Flores y preparación.",
    },
    {
        id: "inicio",
        time: "8:30 AM",
        title: "Inicio del Hike",
        type: "logistics",
        image: "/images/stops/inicio.jpg",
        desc: "Comenzamos la inmersión en la Sierra Norte.",
    },
    {
        id: "gruta",
        time: "Parada 1",
        title: "Gruta de los ladrones",
        type: "gallery",
        image: "/images/stops/gruta.jpg",
        desc: "Exploración de la formación rocosa histórica.",
    },
    {
        id: "mirador",
        time: "Parada 2",
        title: "Paso Mirador",
        type: "gallery",
        image: "/images/stops/paso.jpg",
        desc: "Vistas panorámicas espectaculares del valle.",
    },
    {
        id: "cueva",
        time: "Parada 3",
        title: "Cueva niño perdido",
        type: "gallery",
        image: "/images/stops/cueva.jpg",
        desc: "Misterio y naturaleza en las profundidades.",
    },
    {
        id: "pozo",
        time: "Parada 4",
        title: "Pozo de los deseos",
        type: "gallery",
        image: "/images/stops/mirador.jpg",
        desc: "Manantial de aguas cristalinas.",
    },
    {
        id: "tarzan",
        time: "Parada 5",
        title: "Árbol del Tarzán",
        type: "gallery",
        image: "/images/stops/tarzan.jpg",
        desc: "Flora endémica y formaciones gigantes.",
    },
    {
        id: "cascada",
        time: "Parada 6",
        title: "Cascada Velo de novia",
        type: "gallery",
        image: "/images/stops/velodenovia.jpg",
        desc: "El majestuoso cierre de nuestro sendero acuático.",
    },
    {
        id: "descenso",
        time: "1:00 PM",
        title: "Descenso al llano",
        type: "logistics",
        image: "/images/stops/llano.jpg",
        desc: "Retorno sereno hacia la base.",
    },
    {
        id: "libre",
        time: "1:30 PM",
        title: "Tiempo Libre",
        type: "gallery",
        image: "/images/stops/libre.jpg",
        desc: "Bicis, caballos, cuatrimotos o tirolesa (opcional).",
    },
    {
        id: "comedor",
        time: "2:30 PM",
        title: "Comedor Local",
        type: "logistics",
        image: "/images/stops/comedor.jpg",
        desc: "Gastronomía auténtica de las comunidades serranas.",
    },
];

export default function Welcome() {
    const pinRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const flashSuccess = usePage().props?.flash?.success;
    const [showToast, setShowToast] = useState(Boolean(flashSuccess));

    useEffect(() => {
        if (!flashSuccess) {
            setShowToast(false);
            return undefined;
        }

        setShowToast(true);
        const timeoutId = window.setTimeout(() => setShowToast(false), 5000);
        return () => window.clearTimeout(timeoutId);
    }, [flashSuccess]);

    useGSAP(
        () => {
            const strip = scrollContainerRef.current;

            if (!strip) {
                return undefined;
            }

            const cards = gsap.utils.toArray(".timeline-card", strip);
            const triggers = [];

            cards.forEach((card) => {
                const animation = gsap.fromTo(
                    card,
                    {
                        autoAlpha: 0.2,
                        y: 20,
                    },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.45,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            scroller: strip,
                            horizontal: true,
                            start: "left 90%",
                            end: "left 55%",
                            toggleActions: "play none none reverse",
                        },
                    },
                );
                triggers.push(animation.scrollTrigger);
            });

            return () => {
                triggers.forEach((trigger) => trigger?.kill());
            };
        },
        { scope: pinRef },
    );

    return (
        <div className="bg-[#F7F7F4] text-[#1A432B] overflow-x-hidden">
            <Head title="Llano de las Flores | Ecoturismo Premium" />
            <style>{`
                /* Estilos para ocultar la barra de scroll sin perder funcionalidad */
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>

            {showToast && flashSuccess ? (
                <div className="fixed left-1/2 top-6 z-[300] w-[92%] max-w-xl -translate-x-1/2 rounded-2xl border border-emerald-200 bg-white/95 px-6 py-4 text-center shadow-2xl backdrop-blur animate-fade-in-up">
                    <p className="text-sm font-semibold text-emerald-700 md:text-base">
                        {flashSuccess}
                    </p>
                </div>
            ) : null}

            <PillMenu />

            {/* SECCIÓN HERO */}
            <header className="relative w-full h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/hero/hero.jpg')" }}
                />
                <div className="absolute inset-0 bg-black/60 z-0" />
                <div className="relative z-10 text-center flex flex-col items-center px-4 max-w-5xl mx-auto mt-20">
                    <p className="text-white/90 uppercase tracking-[0.4em] text-sm md:text-base font-semibold mb-6">
                        Hiking Oaxaca
                    </p>
                    <h1
                        className="text-white text-5xl md:text-[7rem] font-bold tracking-tight leading-none mb-10"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Vive la magia de la
                        <br />
                        Sierra Norte
                    </h1>
                </div>
            </header>

            <HistoriaPreview />

            {/* SECCIÓN PUENTE: NUESTRA EMPRESA */}
            <section
                id="nosotros"
                className="py-24 bg-[#F7F7F4] relative overflow-hidden"
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                        <div className="lg:col-span-5 flex flex-col items-start order-2 lg:order-1">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
                                <h4 className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs">
                                    Conócenos
                                </h4>
                            </div>

                            <h2
                                className="text-3xl md:text-5xl font-bold text-[#1A432B] mb-6 leading-tight"
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                }}
                            >
                                Más que un tour,
                                <br />
                                una experiencia.
                            </h2>

                            <p className="text-[#1A432B]/70 text-base md:text-lg mb-8 leading-relaxed">
                                Descubre cuáles son nuestros valores, nuestra misión y nuestra visión para un ecoturismo responsable y auténtico en el corazón de Oaxaca.
                            </p>

                            <Link
                                href="/nosotros"
                                className="group flex items-center gap-4 text-[#1A432B] font-bold uppercase tracking-widest text-sm hover:text-[#D4AF37] transition-colors duration-300"
                            >
                                <span className="border-b-2 border-[#1A432B] group-hover:border-[#D4AF37] pb-1 transition-colors">
                                    Lee sobre nosotros
                                </span>
                                <svg
                                    className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    ></path>
                                </svg>
                            </Link>
                        </div>

                        <div className="lg:col-span-7 relative order-1 lg:order-2">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] w-full">
                                <img
                                    src="/images/hero/historia.jpg"
                                    alt="Nuestra experiencia"
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A432B]/40 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-md border border-white/30 shadow-lg">
                                <p className="text-xs font-bold uppercase tracking-widest text-white drop-shadow-sm">
                                    Sierra Norte de Oaxaca
                                </p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <StatCards />

            {/* SECCIÓN TIMELINE ANIMADA CON GSAP */}
            <main
                id="itinerario"
                ref={pinRef}
                className="relative z-20 h-screen flex flex-col justify-center bg-[#F7F7F4] overflow-hidden"
            >
                <div className="relative top-24 left-6 md:left-12 z-30 text-center">
                    <h2
                        className="text-4xl md:text-6xl font-bold"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Itinerario del Recorrido
                    </h2>
                    <p className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs py-6">
                        Continúa bajando para explorar el sendero.
                    </p>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scrollbar-none no-scrollbar gap-12 px-6 md:px-[20vw] items-center w-full relative z-10 pt-32 md:pt-40 cursor-grab"
                >
                    {timelineMoments.map((moment, index) => {
                        // Lógica de Renderizado: Link vs Div estático
                        const CardWrapper =
                            moment.type === "gallery" ? Link : "div";
                        const wrapperProps =
                            moment.type === "gallery"
                                ? {
                                      href: route("gallery.show", {
                                          slug: moment.id,
                                      }),
                                      className:
                                          "block w-full h-full transform transition-transform duration-500 hover:-translate-y-4 cursor-pointer",
                                  }
                                : {
                                      className:
                                          "block w-full h-full opacity-90 grayscale-[20%] cursor-default",
                                  }; // Las de logística se ven ligeramente más apagadas y no suben al hover

                        return (
                            <div
                                key={moment.id}
                                className="timeline-card w-[85vw] md:w-[450px] shrink-0 relative group snap-center"
                            >
                                <CardWrapper {...wrapperProps}>
                                    {/* Indicador visual de que hay galería solo si aplica */}
                                    {moment.type === "gallery" && (
                                        <div className="absolute -top-4 right-4 z-50 bg-[#D4AF37] text-black text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            Ver Fotos
                                        </div>
                                    )}

                                    <div
                                        className={`${index % 2 === 0 ? "mb-12 md:mb-24" : "mt-12 md:mt-24"}`}
                                    >
                                        <BentoCard
                                            time={moment.time}
                                            title={moment.title}
                                            image={moment.image}
                                        >
                                            {moment.desc}
                                        </BentoCard>
                                    </div>
                                </CardWrapper>
                            </div>
                        );
                    })}
                </div>
            </main>
            <Ubicacion />
            <Footer />
        </div>
    );
}
