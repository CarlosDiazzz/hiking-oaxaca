import React, { useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

export default function VideoExperiencia() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <section className="py-24 bg-[#F7F7F4] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* COLUMNA TEXTO SENSORIAL */}
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-10 lg:pr-8">
                        <div>
                            <h4 className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-xs mb-4">
                                Experiencia Inmersiva
                            </h4>
                            <h2
                                className="text-4xl md:text-6xl font-bold text-[#1A432B] leading-tight"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                La Sierra no se cuenta, <br /> se siente.
                            </h2>
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-4 items-start">
                                <div className="w-1 h-12 bg-[#D4AF37]/30 rounded-full mt-1 shrink-0"></div>
                                <p className="text-[#1A432B]/70 italic text-lg leading-relaxed">
                                    "Escucha el susurro del viento entre los pinos milenarios mientras la niebla abraza el camino. Un entorno diseñado por la naturaleza para desconectar tu mente y despertar tus sentidos."
                                </p>
                            </div>

                            <ul className="grid grid-cols-2 gap-y-6 gap-x-4 text-xs font-bold uppercase tracking-widest text-[#1A432B]/60">
                                <li className="flex items-center gap-3">
                                    {" "}
                                    <span className="w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>{" "}
                                    Aire Puro
                                </li>
                                <li className="flex items-center gap-3">
                                    {" "}
                                    <span className="w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>{" "}
                                    Sonidos Base
                                </li>
                                <li className="flex items-center gap-3">
                                    {" "}
                                    <span className="w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>{" "}
                                    Silencio Total
                                </li>
                                <li className="flex items-center gap-3">
                                    {" "}
                                    <span className="w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>{" "}
                                    Paz Mental
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* COLUMNA VIDEO VERTICAL */}
                    <div className="lg:col-span-5 relative flex justify-center lg:justify-end group">
                        {/* Contenedor estricto para 9:16 sin estirarse al infinito */}
                        <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border-[6px] border-white/50">
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover opacity-90"
                                loop
                                muted={isMuted}
                                playsInline
                                src="/images/hero/videollano.mp4"
                            />

                            {/* Overlay de Controles - Solo visible si está pausado */}
                            <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-500 ${isPlaying ? "opacity-0" : "opacity-100"}`}>
                                <button
                                    onClick={togglePlay}
                                    className="w-20 h-20 flex items-center justify-center bg-[#D4AF37] text-[#0A1A10] rounded-full transform transition-transform duration-300 hover:scale-110 shadow-[0_10px_30px_rgba(212,175,55,0.4)]"
                                >
                                    <Play size={32} className="ml-1" fill="currentColor" />
                                </button>
                            </div>

                            {/* Control invisible para pausar al tocar cualquier parte del video reproducido */}
                            {isPlaying && (
                                <div className="absolute inset-0 cursor-pointer" onClick={togglePlay}></div>
                            )}

                            {/* Botón de Mute */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMuted(!isMuted);
                                }}
                                className="absolute bottom-6 right-6 p-3 bg-[#1A432B]/80 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-[#D4AF37] hover:text-[#0A1A10] transition-colors z-20"
                            >
                                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            </button>
                        </div>

                        {/* Decoración detrás del video */}
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-[50px] -z-10"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
