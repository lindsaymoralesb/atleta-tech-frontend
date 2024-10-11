import Link from "next/link";
import Navbar from "./Navbar";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001838] to-[#bcc6e9] text-white">
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl">
          <h1 className="text-6xl font-bold mb-6">
            Impulsa sueños, <span className="text-purple-400">colecciona </span>
            victorias.
          </h1>
          <p className="text-xl mb-8">
            Conecta con tus atletas favoritos, apoya sus sueños y sé parte de
            sus historias únicas a través de colecciones NFT exclusivas.
          </p>
          <div className="space-x-4">
            <Link href='/explore' className="bg-white text-blue-900 px-6 py-3 rounded-full font-bold hover:bg-blue-100">
              Explorar historias
            </Link>
            <Link href='/' className="border border-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-blue-900">
              Soy atleta
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-5xl font-bold mb-10 text-center">
          Nuestra plataforma
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-2 text-center">
              <span className="text-blue-950 font-bolder">Historias</span>{" "}
              Inspiradoras
            </h3>
            <p className="text-center max-w-[85%]">
              Descubre y comparte las historias únicas de atletas de todo el
              mundo.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-2 text-center">
              Colecciones <span className="text-blue-950 font-bolder">NFT</span>{" "}
              Exclusivas
            </h3>
            <p className="text-center max-w-[85%]">
              Adquiere NFTs únicos que representan momentos especiales en la
              carrera de tus atletas favoritos.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-2 text-center">
              <span className="text-blue-950 font-bolder">Apoyo</span> Directo
            </h3>
            <p className="text-center max-w-[85%]">
              Tu apoyo llega directamente a los atletas, ayudándoles a alcanzar
              sus metas.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-950 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Únete a la comunidad atleta.tech
        </h2>
        <p className="mb-8">
          Sé parte del futuro del deporte y apoya a los atletas que admiras
        </p>
        <Link href='/' className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-blue-100">
          Comenzar ahora
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
