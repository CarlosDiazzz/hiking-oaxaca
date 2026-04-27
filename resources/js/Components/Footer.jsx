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

                    {/* Contacto y Redes Sociales */}
                    <div className="md:col-span-3">
                        <h4 className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs mb-6">Contacto</h4>
                        
                        <ul className="space-y-4 text-sm mb-8">
                            <li className="flex items-start gap-3 opacity-70 hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5 mt-0.5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                                <span>Punto de salida: Jalatlaco<br/>Oaxaca de Juárez, Oax.</span>
                            </li>
                            <li className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                <a href="mailto:casascalenda@gmail.com" className="hover:text-[#D4AF37] transition-colors">hikeoaxaca@gmail.com</a>
                            </li>
                        </ul>

                        {/* Botones de Redes Sociales */}
                        <div className="flex items-center gap-4">
                            <a 
                                href="https://www.instagram.com/hiking.oaxaca?igsh=enRwOW0wdHBld2s3" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-[#0A1A10] hover:scale-110 transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.46 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a 
                                href="https://www.tiktok.com/@hikingoaxaca?is_from_webapp=1&sender_device=pc" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-[#0A1A10] hover:scale-110 transition-all duration-300"
                                aria-label="TikTok"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512">
                                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50 font-medium">
                    <p>© {new Date().getFullYear()} Hiking Oaxaca. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}