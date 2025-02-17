"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white bg-gradient-to-b from-blue-700 to-cyan-400 px-6 md:px-16">
      {/* CONTENEDOR PRINCIPAL */}
      <div className="max-w-full mx-auto w-full flex items-center justify-center text-center md:text-left">
        {/* TEXTO CON LLAMADA A LA ACCIÓN */}
        <div className="w-full md:w-1/2">
          {/* TÍTULO */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            Tu <span className="text-yellow-400">Sistema Inteligente</span>  
            para Tiendas de Indumentaria
          </motion.h1>
          <br />
          {/* DESCRIPCIÓN */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="mt-4 text-lg md:text-2xl text-gray-200"
          >
            Optimiza tu negocio con nuestra plataforma impulsada por IA.  
            ¡Regístrate ahora y obtén{" "}
            <span className="text-yellow-400 font-bold">2 meses gratis!</span>
          </motion.p>
          <br />
          {/* BOTONES */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link href="/register">
              <button className="bg-yellow-400 text-blue-900 px-6 py-3 font-semibold rounded-lg hover:bg-yellow-300 transition">
                Prueba Gratis
              </button>
            </Link>
            <Link href="#benefits">
              <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-900 transition">
                Ver Beneficios
              </button>
            </Link>
          </motion.div>
        </div>

        {/* IMAGEN */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0"
        >
          <img
            src="https://rightpeoplegroup.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fduonnzqzi%2Fimage%2Fupload%2Fv1713536160%2Ferp_dcca31fc99.png&w=3840&q=75"
            alt="Software ERP para tiendas"
            className="rounded-xl w-1/2"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

