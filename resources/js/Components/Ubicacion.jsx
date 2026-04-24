import React from 'react';

export default function Ubicacion() {
    return (
        <>
            {/* Usamos el mismo color claro de fondo que hace contraste con tu footer */}
            <section id="ubicacion" className="py-24 bg-[#F7F7F4] relative z-10">
                <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                    {/* Título de la sección */}                    
                    <h2 className="text-4xl md:text-6xl font-bold " style={{ fontFamily: "'Playfair Display', serif" }}>
                        Ubicación
                    </h2>
                    <h4 className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs py-4">
                        Planea tu ruta
                    </h4>

                    {/* Contenedor del Mapa */}
                    <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(10,26,16,0.1)]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4118.481578828023!2d-96.50649842483368!3d17.44773318344976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c6cebd34017c9d%3A0x74463dff1fb78a3d!2sLlano%20de%20Las%20Flores!5e1!3m2!1ses-419!2smx!4v1776957838497!5m2!1ses-419!2smx" 
                            className="absolute top-0 left-0 w-full h-full pointer-events-none border-0 grayscale-[20%] contrast-125"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa de Llano de las Flores"
                        />
                        <div className="absolute inset-0 bg-[#0A1A10]/5 pointer-events-none"></div>
                    </div>

                    <p className="mt-8 text-[#0A1A10]/70 text-sm max-w-2xl mx-auto leading-relaxed">
                        Nos encontramos en el corazón de la Sierra Norte, inmersos en espectaculares paisajes y senderos inolvidables.
                    </p>
                </div>
            </section>
        </>
    );
}