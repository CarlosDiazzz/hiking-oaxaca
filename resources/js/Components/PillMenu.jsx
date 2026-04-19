import { Link } from "@inertiajs/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function PillMenu() {
    // Función para scroll animado
    const handleSmoothScroll = (e, target) => {
        // Solo animar suavemente si YA estamos en la página principal
        if (window.location.pathname === "/") {
            e.preventDefault();

            gsap.to(window, {
                duration: 1.2,
                // Si el target es 0 (Inicio), no aplicamos offsetY
                scrollTo: { y: target, offsetY: target === 0 ? 0 : 50 },
                ease: "power3.inOut",
            });
        }
    };

    return (
        <nav className="fixed bottom-8 md:bottom-auto md:top-8 left-1/2 transform -translate-x-1/2 z-[100]">
            {/* Cambiamos la opacidad de /90 a /40 para un efecto glassmorphism premium */}
            <ul className="flex items-center gap-2 md:gap-6 px-2 py-2 bg-[#111111]/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
                <li>
                    {/* Añadimos la función apuntando a '0' (top) */}
                    <Link
                        href="/"
                        onClick={(e) => handleSmoothScroll(e, 0)}
                        className="text-white text-xs font-semibold tracking-widest uppercase hover:text-[#D4AF37] transition-colors px-4"
                    >
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link
                        href="/#nosotros"
                        onClick={(e) => handleSmoothScroll(e, "#nosotros")}
                        className="text-white text-xs font-semibold tracking-widest uppercase hover:text-[#D4AF37] transition-colors px-4 hidden md:block"
                    >
                        Nosotros
                    </Link>
                </li>
                <li>
                    <Link
                        href="/#itinerario"
                        onClick={(e) => handleSmoothScroll(e, "#itinerario")}
                        className="text-white text-xs font-semibold tracking-widest uppercase hover:text-[#D4AF37] transition-colors px-4"
                    >
                        Ruta
                    </Link>
                </li>
                <li>
                    <Link
                        href="/reservar"
                        className="bg-[#D4AF37] text-black px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:scale-105 transition-transform ml-2 shadow-lg block"
                    >
                        Reservar
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
