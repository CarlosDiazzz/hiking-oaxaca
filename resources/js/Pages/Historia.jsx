import { Head } from '@inertiajs/react';
import PillMenu from '@/Components/PillMenu';
import Footer from '@/Components/Footer';

export default function Historia() {
    return (
        <div className="bg-[#F7F7F4] text-[#1A432B] min-h-screen flex flex-col">
            <Head title="Historia del Llano | Hiking Oaxaca" />
            <PillMenu />

            <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto w-full">
                <div className="mb-16">
                    <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-sm font-bold mb-4">El Origen</p>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        El Llano de las Flores
                    </h1>
                </div>

                <div className="prose prose-lg text-[#1A432B]/80 max-w-none">
                    
                    {/* INTRODUCCIÓN */}
                    <p className="text-xl leading-relaxed mb-12">
                        Llano de las Flores es mucho más que un destino ecoturístico en la sierra norte de Oaxaca: es un lugar donde la geología, la tradición oral y la historia de México se entrelazan en un mismo paraje. Su historia está compuesta por capas que van desde una leyenda de un antiguo lago hasta su papel en la Revolución Mexicana, para culminar en un exitoso modelo de turismo comunitario.
                    </p>

                    {/* UN VISTAZO GENERAL (Grid de Datos Estilo Tarjetas) */}
                    <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                        <div className="p-8 bg-white rounded-3xl shadow-[0_5px_20px_rgba(26,67,43,0.03)] border border-[#1A432B]/5">
                            <h4 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs mb-3">Ubicación</h4>
                            <p className="text-sm text-[#1A432B]/80 leading-relaxed">Pertenece al municipio de San Juan Atepec, en la región de la Sierra Norte o Sierra de Juárez, a 80 km de la ciudad de Oaxaca.</p>
                        </div>
                        <div className="p-8 bg-white rounded-3xl shadow-[0_5px_20px_rgba(26,67,43,0.03)] border border-[#1A432B]/5">
                            <h4 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs mb-3">Altitud</h4>
                            <p className="text-sm text-[#1A432B]/80 leading-relaxed">Se encuentra a una altura entre 2,700 y 2,900 msnm, en una alta meseta rodeada de bosques de pino y encino.</p>
                        </div>
                        <div className="p-8 bg-white rounded-3xl shadow-[0_5px_20px_rgba(26,67,43,0.03)] border border-[#1A432B]/5">
                            <h4 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs mb-3">Atepec (Náhuatl)</h4>
                            <p className="text-sm text-[#1A432B]/80 leading-relaxed">Proviene de "acatl" (agua) y "tepetl" (cerro), lo que se traduce hermosamente como "cerro donde abunda el agua".</p>
                        </div>
                        <div className="p-8 bg-white rounded-3xl shadow-[0_5px_20px_rgba(26,67,43,0.03)] border border-[#1A432B]/5">
                            <h4 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs mb-3">Ru´a Lattsì ´á</h4>
                            <p className="text-sm text-[#1A432B]/80 leading-relaxed">Nombre ancestral en zapoteco con el que la comunidad local conoce y respeta a este llano.</p>
                        </div>
                    </div>

                    {/* LA LEYENDA */}
                    <h2 className="text-3xl font-bold mt-16 mb-6 text-[#1A432B]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        La Leyenda Subacuática: El Origen del Llano
                    </h2>
                    <p>La historia más ancestral de Llano de las Flores no está escrita en piedra, sino en la memoria oral de los habitantes de San Juan Atepec.</p>
                    <p>La tradición local cuenta que, hace mucho tiempo, el lugar que hoy es una extensa planicie cubierta de flores durante la temporada de lluvias, estaba completamente cubierto por un gran cuerpo de agua, un lago o una laguna. Esta leyenda explica la geografía actual del lugar. Con el paso de un tiempo imposible de calcular, las aguas desaparecieron, dando paso al valle que conocemos hoy, aunque no sin dejar su huella.</p>
                    <p>Como vestigio de aquel origen acuático, en la zona aún es posible encontrar pequeños humedales y una serie de riachuelos que brotan directamente del suelo, alimentando la cascada <strong>Velo de Novia</strong> y sustentando su biodiversidad. Incluso, existe una "laguna encantada" o "Poza de los Deseos", un manantial donde se realizaban ceremonias ancestrales para pedir por la lluvia, conectando el presente con el pasado sagrado del lugar.</p>

                    {/* MONOGRAFÍA DEL PUEBLO (Caja Blanca) */}
                    <div className="my-16 p-10 bg-white rounded-3xl shadow-[0_10px_40px_rgba(26,67,43,0.05)] border border-[#1A432B]/10 border-l-4 border-l-[#D4AF37] not-prose">
                        <h3 className="text-2xl font-bold mb-6 text-[#1A432B]" style={{ fontFamily: "'Playfair Display', serif" }}>Un Vistazo a la Monografía del Pueblo</h3>
                        <p className="mb-6 text-[#1A432B]/80 leading-relaxed">
                            La historia documentada de San Juan Atepec está intrínsecamente ligada al devenir de la región.
                        </p>
                        <ul className="space-y-4 text-[#1A432B]/80 list-none p-0 m-0">
                            <li className="flex gap-3">
                                <span className="text-[#D4AF37] font-bold">»</span>
                                <span><strong>Orígenes Prehispánicos:</strong> Se cree que los primeros pobladores de Atepec descienden de tribus que llegaron de las tierras bajas donde hoy se ubica Tuxtepec hacia el siglo XIII (1201-1300 d.C.). La fundación formal del pueblo como tal se sitúa en el año 1444.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#D4AF37] font-bold">»</span>
                                <span><strong>Colonia y Siglo XIX:</strong> Durante la colonia, la zona fue nombrada por su santo patrono y su característica geográfica, consolidándose el nombre de San Juan Atepec a principios del siglo XIX. Para 1844, ya aparece registrado como parte del distrito de Villa Alta.</span>
                            </li>
                        </ul>
                    </div>

                    {/* REVOLUCIÓN (Caja Oscura) */}
                    <div className="my-16 p-10 bg-[#1A432B] text-white rounded-3xl shadow-xl border-l-4 border-l-[#D4AF37] not-prose">
                        <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Un Pasado de Espías y Revolucionarios</h3>
                        <p className="opacity-90 leading-relaxed mb-4">
                            Más allá de su origen legendario, el Llano de las Flores fue testigo de la agitada historia de México durante la Revolución Mexicana (1910-1917).
                        </p>
                        <p className="opacity-90 leading-relaxed mb-4">
                            Entre los atractivos del lugar se encuentra la <strong>Gruta de los Ladrones</strong>. Este sitio natural recibió su nombre porque, durante el conflicto armado, el saqueo a las comunidades generó un periodo de gran escasez.
                        </p>
                        <p className="opacity-90 leading-relaxed">
                            Ante esta situación, surgieron grupos que se dedicaban al pillaje. La gruta, con su difícil acceso y ubicación estratégica, servía como un perfecto escondite. Apodados como "Los Ladrones", utilizaban la cueva para resguardarse después de sus correrías y planear sus siguientes movimientos, convirtiéndola en un punto clave de una historia de marginación y supervivencia.
                        </p>
                    </div>

                    {/* ECOTURISMO */}
                    <h2 className="text-3xl font-bold mt-16 mb-6 text-[#1A432B]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        De Corazón Natural a Paraíso Ecoturístico
                    </h2>
                    <p>Tal vez la transformación más significativa de Llano de las Flores ha sido su evolución hacia un modelo de Turismo Comunitario. Conscientes de la riqueza natural de su territorio, la comunidad de San Juan Atepec decidió gestionar y explotar este recurso de manera sustentable.</p>
                    <ul>
                        <li><strong>Infraestructura Comunitaria:</strong> Se construyó un centro ecoturístico que incluye cabañas de adobe y madera equipadas (con chimenea y agua caliente), restaurante de comida regional, miradores y áreas para campamento y juegos infantiles.</li>
                        <li><strong>Actividades para Sentir la Montaña:</strong> El centro local ofrece una amplia gama de actividades que permiten explorar el bosque: caminatas guiadas, ciclismo de montaña, tirolesa, cabalgatas y noches de campamento.</li>
                        <li><strong>Un Destino Bien Ubicado:</strong> Al encontrarse sobre la carretera Oaxaca-Tuxtepec, pasando Ixtlán de Juárez, su acceso es relativamente sencillo, lo que lo ha convertido en una escapada ideal para un fin de semana.</li>
                        <li><strong>Época para Visitar:</strong> La temporada que va de marzo a noviembre es la más recomendada para apreciar la explosión de colores de su flora y disfrutar de un clima más templado.</li>
                    </ul>

                    {/* VIERNES DEL LLANO (Caja Blanca) */}
                    <div className="my-16 p-10 bg-white rounded-3xl shadow-[0_10px_40px_rgba(26,67,43,0.05)] border border-[#1A432B]/10 border-l-4 border-l-[#D4AF37] not-prose">
                        <h3 className="text-2xl font-bold mb-4 text-[#1A432B]" style={{ fontFamily: "'Playfair Display', serif" }}>Una Celebración Centenaria: Los "Viernes del Llano"</h3>
                        <p className="mb-6 text-[#1A432B]/80 leading-relaxed">
                            Si bien es un destino turístico, Llano de las Flores no debe confundirse con "El Llano", un parque urbano en la capital del estado donde se celebra una de las tradiciones más queridas por los oaxaqueños: los "Viernes del Llano". Aunque son lugares distintos, su espíritu festivo refleja la profunda conexión de Oaxaca con las flores.
                        </p>
                        <ul className="space-y-4 text-[#1A432B]/80 list-none p-0 m-0">
                            <li className="flex gap-3">
                                <span className="text-[#D4AF37] font-bold">»</span>
                                <span><strong>Origen Devocional:</strong> La tradición se remonta a finales del siglo XVII (entre 1690 y 1700), cuando habitantes de los barrios de la ciudad vendían flores a los creyentes que acudían a venerar a la imagen del Señor de Tepeaca, especialmente durante la Semana Mayor.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#D4AF37] font-bold">»</span>
                                <span><strong>Adopción Estudiantil:</strong> Con la fundación de la Universidad Benito Juárez en 1827, la tradición fue adoptada por estudiantes y se extendió a otras instituciones educativas.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#D4AF37] font-bold">»</span>
                                <span><strong>La Tradición en la Actualidad:</strong> Hoy en día, durante los cinco viernes posteriores al Miércoles de Ceniza, cientos de jóvenes estudiantes se congregan en el Paseo Juárez, mejor conocido como "El Llano". Ellos obsequian ramos de flores (claveles, rosas, jazmines) a las damas, mientras bandas y estudiantinas amenizan la tarde con su música.</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}