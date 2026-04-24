import React from "react";
import { Link } from "@inertiajs/react";

export default function HistoriaPreview() {
    return (
        <section
            id="historia"
            className="py-24 bg-[#F7F7F4] relative overflow-hidden"
        >
            {/* Elemento decorativo sutil en el fondo */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#0A1A10] opacity-5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                    {/* Columna Izquierda: Texto e Historia (Ocupa 5 columnas en desktop) */}
                    <div className="lg:col-span-5 flex flex-col items-start">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
                            <h4 className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs">
                                Nuestro Legado
                            </h4>
                        </div>

                        <h2
                            className="text-3xl md:text-5xl font-bold text-[#0A1A10] mb-6 leading-tight"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Guardianes del bosque de niebla
                        </h2>

                        <p className="text-[#0A1A10]/70 text-base md:text-lg mb-6 leading-relaxed">
                            El Llano de las Flores no es solo un destino, es la
                            herencia viva de las comunidades comunitarias de la
                            Sierra Norte de Oaxaca.
                        </p>

                        <p className="text-[#0A1A10]/70 text-sm md:text-base mb-10 leading-relaxed">
                            Durante generaciones, hemos protegido celosamente
                            estos paisajes, entendiendo que nuestra existencia
                            está profundamente entrelazada con cada pino, encino
                            y arroyo. Hoy, abrimos las puertas de nuestro hogar
                            para compartir esta magia contigo, con un profundo
                            respeto por la naturaleza.
                        </p>

                        {/* Botón para ver la historia completa */}
                        <Link
                            href="/historia"
                            className="group flex items-center gap-4 text-[#0A1A10] font-bold uppercase tracking-widest text-sm hover:text-[#D4AF37] transition-colors duration-300"
                        >
                            <span className="border-b-2 border-[#0A1A10] group-hover:border-[#D4AF37] pb-1 transition-colors">
                                Leer historia completa
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

                    {/* Columna Derecha: Imágenes (Ocupa 7 columnas en desktop) */}
                    <div className="lg:col-span-7 relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto lg:h-[600px] w-full">
                            {/* Imagen principal: Cambia la ruta por una foto real del Llano de las flores */}
                            <img
                                src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1200"
                                alt="Bosque del Llano de las Flores"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            />

                            {/* Overlay degradado sutil para darle dramatismo */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A10]/60 via-transparent to-transparent"></div>

                            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-md border border-white/30 shadow-lg">
                                <p className="text-xs font-bold uppercase tracking-widest text-white drop-shadow-sm">
                                    Llano de las Flores
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
