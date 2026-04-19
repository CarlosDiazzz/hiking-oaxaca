import styles from '@/Styles/BentoCard.module.css';

export default function BentoCard({ time, title, image, children }) {
    return (
        <article className={`${styles.bentoCard} group h-[400px] w-full cursor-pointer`}>
            {/* Imagen de fondo a sangre con zoom sutil en hover */}
            <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />

            {/* Gradiente oscuro para legibilidad (Glassmorphism de contraste) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Contenido flotante encima de la imagen */}
            <div className="absolute inset-0 flex flex-col justify-between p-8">
                <div className="self-start rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-md border border-white/30">
                    <p className="text-xs font-bold uppercase tracking-widest text-white drop-shadow-sm">{time}</p>
                </div>

                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="mb-3 text-2xl font-bold leading-tight text-white md:text-3xl drop-shadow-md">{title}</h3>
                    <p className="text-sm font-medium leading-relaxed text-gray-200 line-clamp-3 drop-shadow">{children}</p>
                </div>
            </div>
        </article>
    );
}
