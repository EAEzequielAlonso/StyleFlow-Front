"use client"

import { useEffect, useState } from "react";

const BenefitsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkVisibility = () => {
    const section = document.getElementById("benefits");
    if (section) {
      const rect = section.getBoundingClientRect();
      setIsVisible(rect.top <= window.innerHeight && rect.bottom >= 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
    return () => {
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  return (
    <section
      id="benefits"
      className={`w-full py-20 bg-gradient-to-b from-blue-500 to-blue-300 transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-white mb-8">Beneficios de nuestro SaaS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div className="benefit-item p-6 bg-blue-700 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Gestión fácil</h3>
            <p>Administra todo tu negocio desde una sola plataforma fácil de usar.</p>
          </div>
          <div className="benefit-item p-6 bg-blue-700 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Optimización de ventas</h3>
            <p>Aumenta las ventas con herramientas de análisis y gestión de inventarios.</p>
          </div>
          <div className="benefit-item p-6 bg-blue-700 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Soporte 24/7</h3>
            <p>Cuenta con asistencia personalizada en todo momento.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
