import { Head } from '@inertiajs/react';
import PillMenu from '@/Components/PillMenu';
import Footer from '@/Components/Footer';

export default function About() {
    return (
        <div className="bg-[#F7F7F4] text-[#1A432B] min-h-screen flex flex-col">
            <Head title="Nuestra Historia | Hiking Oaxaca" />
            <PillMenu />

            <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto w-full">
                <div className="mb-16">
                    <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-sm font-bold mb-4">Hiking Oaxaca</p>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Nuestra Historia
                    </h1>
                </div>

                <div className="prose prose-lg text-[#1A432B]/80 max-w-none">
                    <p className="text-xl leading-relaxed mb-10">
                        La región de la Sierra Norte del estado de Oaxaca se distingue por su vasta riqueza natural,
                        cultural y geográfica, siendo uno de los territorios con mayor biodiversidad en México.
                        Dentro de esta zona se encuentra el Valle de las Flores, un espacio caracterizado por sus
                        paisajes montañosos, bosques nublados y una gran variedad de flora endémica que ha dado
                        identidad a la región a lo largo de generaciones.
                    </p>

                    <p className="mb-10">
                        Durante décadas, los caminos de la Sierra Norte no solo han sido medios de transporte, sino
                        también espacios de intercambio cultural, económico y social. Con el paso del tiempo y ante
                        el creciente interés por el turismo de naturaleza y experiencias sostenibles, la región
                        comenzó a posicionarse como un destino atractivo para visitantes nacionales e
                        internacionales interesados en el hiking, la observación de flora y fauna, y la convivencia con
                        comunidades locales.
                    </p>

                    <div className="my-16 p-10 bg-white rounded-3xl shadow-[0_10px_40px_rgba(26,67,43,0.05)] border border-[#1A432B]/10 border-l-4 border-l-[#D4AF37]">
                        <h3 className="text-2xl font-bold mb-4 text-[#1A432B]" style={{ fontFamily: "'Playfair Display', serif" }}>Nuestra Misión</h3>
                        <p className="m-0">
                            Brindar experiencias de senderismo auténticas y seguras en la Sierra Norte de Oaxaca, especialmente en el Llano de las Flores, promoviendo la conexión con la naturaleza, la cultura local y el bienestar físico de nuestros visitantes, a través de un servicio responsable, sustentable y de calidad.
                        </p>
                    </div>

                    <div className="my-16 p-10 bg-[#1A432B] text-white rounded-3xl shadow-xl border-l-4 border-l-[#D4AF37]">
                        <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Nuestra Visión</h3>
                        <p className="m-0 opacity-90">
                            Ser una empresa líder en turismo de naturaleza en Oaxaca, reconocida por ofrecer experiencias únicas de hiking en la Sierra Norte, destacando por su compromiso con la conservación del medio ambiente, el desarrollo de las comunidades locales y la satisfacción de nuestros clientes.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}