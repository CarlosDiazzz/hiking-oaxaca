import { Head, Link } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PillMenu from '@/Components/PillMenu';
import Footer from '@/Components/Footer';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function GalleryShow({ stop, photos = [] }) {
    const galleryContainerRef = useRef(null);
    const modalRef = useRef(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [modalIndex, setModalIndex] = useState(0);

    // Agrupación inteligente de fotos
    const groupedPosts = Object.values(
        photos.reduce((accumulator, photo) => {
            const groupKey = `${photo.uploader_name}_${photo.title}`;

            if (!accumulator[groupKey]) {
                accumulator[groupKey] = {
                    id: photo.id ?? groupKey,
                    uploader_name: photo.uploader_name,
                    title: photo.title,
                    description: photo.description ?? '',
                    images: [],
                };
            }

            accumulator[groupKey].description = accumulator[groupKey].description || photo.description || '';
            accumulator[groupKey].images.push(photo);

            return accumulator;
        }, {}),
    );

    // Animación GSAP (SOLO se activa en pantallas grandes para no romper el celular)
    useGSAP(() => {
        if (!groupedPosts || groupedPosts.length === 0) return;

        let mm = gsap.matchMedia();
        
        mm.add("(min-width: 1024px)", () => {
            gsap.to('.col-fast', {
                y: -150,
                ease: 'none',
                scrollTrigger: { trigger: galleryContainerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
            });
            gsap.to('.col-slow', {
                y: -50,
                ease: 'none',
                scrollTrigger: { trigger: galleryContainerRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 }
            });
        });

        return () => mm.revert(); // Limpia la animación al desmontar
    }, { scope: galleryContainerRef, dependencies: [groupedPosts] });

    // Lógica del Modal
    useEffect(() => {
        if (selectedPost) {
            document.body.style.overflow = 'hidden';
            gsap.fromTo(modalRef.current, { opacity: 0, backdropFilter: 'blur(0px)' }, { opacity: 1, backdropFilter: 'blur(8px)', duration: 0.4, ease: 'power2.out' });
            gsap.fromTo('.modal-content', { scale: 0.95, y: 20, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
        } else {
            document.body.style.overflow = '';
        }

        const handleKeyDown = (event) => { if (event.key === 'Escape') handleCloseModal(); };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedPost]);

    const handleOpenPost = (post, index = 0) => {
        setSelectedPost(post);
        setModalIndex(index);
    };

    const handleCloseModal = () => {
        if (!modalRef.current) return;
        gsap.to(modalRef.current, {
            opacity: 0, backdropFilter: 'blur(0px)', duration: 0.3, ease: 'power2.in',
            onComplete: () => { setSelectedPost(null); setModalIndex(0); },
        });
    };

    const handleModalPrev = (event) => {
        event.stopPropagation();
        if (!selectedPost || selectedPost.images.length <= 1) return;
        setModalIndex((previous) => (previous === 0 ? selectedPost.images.length - 1 : previous - 1));
    };

    const handleModalNext = (event) => {
        event.stopPropagation();
        if (!selectedPost || selectedPost.images.length <= 1) return;
        setModalIndex((previous) => (previous === selectedPost.images.length - 1 ? 0 : previous + 1));
    };

    // División de columnas para PC
    const leftCol = groupedPosts.filter((_, index) => index % 2 === 0);
    const rightCol = groupedPosts.filter((_, index) => index % 2 !== 0);
    const activeModalImage = selectedPost?.images?.[modalIndex] ?? null;
    const modalBlur = activeModalImage?.blur_placeholder ?? '';

    return (
        <div className="bg-[#F7F7F4] text-[#1A432B] overflow-x-hidden min-h-screen">
            <Head title={`${stop?.name ?? 'Galería'} | Galería`} />
            <PillMenu />

            <div className="max-w-7xl mx-auto px-0 lg:px-12 pt-24 lg:pt-32 pb-12">
                
                {/* CABECERA (Adaptable Móvil/PC) */}
                <div className="px-6 lg:px-0 mb-8 lg:mb-16">
                    <Link href="/#itinerario" className="text-xs font-bold tracking-widest uppercase opacity-60 hover:opacity-100 flex items-center gap-2 mb-6 transition-opacity">
                        ← Volver a la ruta
                    </Link>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-end">
                        <div>
                            <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs font-bold mb-2">{stop?.time_display}</p>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {stop?.name}
                            </h1>
                        </div>
                        <p className="text-sm lg:text-lg opacity-80 leading-relaxed border-l-2 border-[#D4AF37] pl-4 lg:pl-6 py-1 lg:py-2">
                            {stop?.description}
                        </p>
                    </div>
                </div>

                {groupedPosts.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="text-xl opacity-60">Aún no hay fotos en esta galería. ¡Sé el primero en explorarla!</p>
                    </div>
                ) : (
                    <div ref={galleryContainerRef}>
                        
                        {/* ========================================================= */}
                        {/* 📱 VISTA MÓVIL: Buscador Instagram (Grid 3x3 cuadrado)    */}
                        {/* ========================================================= */}
                        <div className="block lg:hidden">
                            {/* Mapa arriba en celular */}
                            <div className="w-full h-48 mb-4 bg-gray-100 rounded-xl overflow-hidden">
                                {stop?.map_embed_url ? (
                                    <iframe src={stop.map_embed_url} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100"><p className="text-xs font-bold uppercase tracking-widest text-gray-400">Mapa no disponible</p></div>
                                )}
                            </div>
                            
                            {/* Grid 3 columnas sin huecos */}
                            <div className="grid grid-cols-3 gap-1">
                                {groupedPosts.map((post) => (
                                    <PhotoCardMobile key={post.id} post={post} onClick={handleOpenPost} />
                                ))}
                            </div>
                        </div>

                        {/* ========================================================= */}
                        {/* 💻 VISTA ESCRITORIO: Masonry Animado Elegante             */}
                        {/* ========================================================= */}
                        <div className="hidden lg:flex flex-row gap-8 items-start">
                            <div className="w-full lg:w-2/3 grid grid-cols-2 gap-6">
                                <div className="col-slow flex flex-col gap-6">
                                    {leftCol.map((post) => (
                                        <PhotoCardDesktop key={post.id} post={post} onClick={handleOpenPost} />
                                    ))}
                                </div>
                                <div className="col-fast flex flex-col gap-6 mt-24">
                                    {rightCol.map((post) => (
                                        <PhotoCardDesktop key={post.id} post={post} onClick={handleOpenPost} />
                                    ))}
                                </div>
                            </div>

                            {/* Mapa Sticky a la derecha */}
                            <div className="w-full lg:w-1/3 sticky top-32 h-[800px] rounded-3xl overflow-hidden shadow-xl">
                                {stop?.map_embed_url ? (
                                    <iframe src={stop.map_embed_url} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
                                        <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-pulse mb-4">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                                        </div>
                                        <p className="font-bold text-gray-400 tracking-widest text-xs uppercase">Sin coordenadas</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                )}
            </div>
            <Footer />

            {/* MODAL LUMINOSO PREMIUM (Mantenido intacto) */}
            {selectedPost && activeModalImage ? (
                <div ref={modalRef} className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 md:p-8" onClick={handleCloseModal}>
                    <div className="modal-content relative flex flex-col md:flex-row items-stretch w-full h-full md:max-w-6xl md:rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] bg-white md:max-h-[90vh]" onClick={(event) => event.stopPropagation()}>
                        
                        <button onClick={handleCloseModal} className="absolute top-4 right-4 z-50 bg-white/90 hover:bg-white text-[#1A432B] rounded-full p-2 shadow-sm transition-transform hover:scale-105">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        <div className="w-full md:w-3/5 h-[55vh] md:h-auto bg-[#0a0a0a] flex items-center justify-center relative group">
                            <img src={modalBlur} className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-15" alt="" />
                            <img src={`/storage/${activeModalImage.original_path}`} alt={selectedPost.title} className="relative z-10 w-full h-full object-contain" />

                            {selectedPost.images.length > 1 ? (
                                <>
                                    <button onClick={handleModalPrev} className="absolute left-4 top-1/2 z-20 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 border border-white/10">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                    </button>
                                    <button onClick={handleModalNext} className="absolute right-4 top-1/2 z-20 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 border border-white/10">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                    </button>
                                    
                                    <div className="absolute bottom-6 z-20 flex items-center gap-2">
                                        {selectedPost.images.map((_, index) => (
                                            <span key={index} className={`h-1.5 rounded-full transition-all duration-300 ${index === modalIndex ? 'w-4 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'w-1.5 bg-white/50'}`}></span>
                                        ))}
                                    </div>
                                </>
                            ) : null}
                        </div>

                        <div className="w-full md:w-2/5 flex flex-col bg-white text-[#1A432B] h-[45vh] md:h-auto overflow-y-auto">
                            <div className="flex items-center gap-4 p-6 md:p-10 border-b border-gray-100">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1A432B] flex items-center justify-center border-2 border-[#D4AF37]">
                                    <span className="font-bold text-[#D4AF37] text-xs md:text-sm">{selectedPost.uploader_name?.charAt(0).toUpperCase() || 'U'}</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">@{selectedPost.uploader_name?.replace('@', '')}</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-0.5">Aventurero Verificado</p>
                                </div>
                            </div>

                            <div className="p-6 md:p-10 flex-grow">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>{selectedPost.title}</h2>
                                <p className="text-gray-600 leading-relaxed text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">{selectedPost.description}</p>
                            </div>
                            
                            <div className="p-4 md:p-6 bg-gray-50 mt-auto border-t border-gray-100">
                                <p className="text-[10px] md:text-[11px] text-center text-gray-400 font-medium uppercase tracking-widest flex items-center justify-center gap-2">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                                    Capturado en {stop?.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

// ==========================================
// COMPONENTE 1: Tarjeta para ESCRITORIO (Masonry con Hover de Texto)
// ==========================================
function PhotoCardDesktop({ post, onClick }) {
    const currentImage = post.images[0];
    if (!currentImage) return null;

    return (
        <div className="relative group rounded-2xl overflow-hidden cursor-pointer shadow-lg bg-black" onClick={() => onClick(post, 0)}>
            <div className="absolute inset-0 bg-cover bg-center blur-lg opacity-40 scale-110" style={{ backgroundImage: `url(${currentImage?.blur_placeholder ?? ''})` }}></div>
            <img src={`/storage/${currentImage.original_path}`} alt={post.title} loading="lazy" className="relative z-10 w-full h-auto object-cover rounded-2xl transform transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-40" />

            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-[#D4AF37] font-bold text-xs tracking-widest uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    Por @{post.uploader_name?.replace('@', '')}
                </p>
                <h3 className="text-white font-bold text-2xl mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {post.title}
                </h3>
            </div>

            {post.images.length > 1 && (
                <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md p-2 rounded-lg text-white text-xs font-bold flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
                    <span>{post.images.length}</span>
                </div>
            )}
        </div>
    );
}

// ==========================================
// COMPONENTE 2: Tarjeta para MÓVIL (Grid Cuadrado estilo Instagram)
// ==========================================
function PhotoCardMobile({ post, onClick }) {
    const currentImage = post.images[0];
    if (!currentImage) return null;

    return (
        <div className="relative cursor-pointer bg-gray-200 aspect-square group" onClick={() => onClick(post, 0)}>
            {/* Foto forzada a ser cuadrada */}
            <img src={`/storage/${currentImage.original_path}`} alt={post.title} loading="lazy" className="w-full h-full object-cover aspect-square" />

            {/* Icono múltiple arriba a la derecha */}
            {post.images.length > 1 && (
                <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2">
                    <svg className="w-4 h-4 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        {/* Simulación del icono de capas de Instagram */}
                        <rect x="14" y="2" width="4" height="4" fill="white" className="drop-shadow" />
                    </svg>
                </div>
            )}
        </div>
    );
}
