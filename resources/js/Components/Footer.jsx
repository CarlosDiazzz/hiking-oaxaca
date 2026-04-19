import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="relative bg-[#0A1A10] text-[#F7F7F4] pt-24 pb-12 px-6 md:px-12 z-50 mt-32">
            
            {/* SVG Relieve de Montaña */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-[99%]">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px] md:h-[150px]">
                    <path d="M0,120 L0,40 L150,100 L300,10 L450,80 L600,0 L750,90 L900,20 L1050,100 L1200,50 L1200,120 Z" fill="#0A1A10"></path>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16 border-b border-white/10 pb-16">
                    
                    {/* Columna Principal: Logo y Slogan */}
                    <div className="md:col-span-5 flex flex-col items-start">
                        {/* Contenedor del Logo (Blanco para que resalte cualquier formato) */}
                        <div className="bg-white px-7 py-4 rounded-full mb-8 w-64 shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center">
                            <img 
                                src="/images/logo.png" 
                                alt="Llano de las Flores Logo" 
                                className="w-full h-auto object-contain"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x100?text=Logo+Aqui'; }} 
                            />
                        </div>
                        <h3 className="text-2xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Vive la magia de la<br/>Sierra Norte.
                        </h3>
                        <p className="opacity-60 max-w-sm text-sm leading-relaxed">
                            Ecoturismo premium, rutas guiadas y un compromiso inquebrantable con la sustentabilidad y la cultura local.
                        </p>
                    </div>

                    {/* Enlaces Rápidos */}
                    <div className="md:col-span-3 md:col-start-7">
                        <h4 className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs mb-6">Explora</h4>
                        <ul className="space-y-4">
                            <li><a href="/#itinerario" className="opacity-70 hover:opacity-100 hover:text-[#D4AF37] transition-colors">Nuestro Itinerario</a></li>
                            <li><a href="/#nosotros" className="opacity-70 hover:opacity-100 hover:text-[#D4AF37] transition-colors">Nuestra Historia</a></li>
                            <li><Link href="#" className="opacity-70 hover:opacity-100 hover:text-[#D4AF37] transition-colors">Políticas de Cancelación</Link></li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div className="md:col-span-3">
                        <h4 className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs mb-6">Contacto</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3 opacity-70">
                                <svg className="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                                <span>Punto de salida: Jalatlaco<br/>Oaxaca de Juárez, Oax.</span>
                            </li>
                            <li className="flex items-center gap-3 opacity-70">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                <span>reservas@hikingoaxaca.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50 font-medium">
                    <p>© {new Date().getFullYear()} Hiking Oaxaca. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}