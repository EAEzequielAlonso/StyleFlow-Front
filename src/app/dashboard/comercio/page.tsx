"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { getCookie } from "cookies-next";
import Image from "next/image";

// Definir la estructura de datos del comercio
interface Commerce {
  nameFantacy: string;
  nameCompany: string;
  emailCompany: string;
  slogan: string;
  imageUrl: string;
}

export default function CommerceDashboard() {
  const [commerce, setCommerce] = useState<Commerce | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Commerce>({
    nameFantacy: "",
    nameCompany: "",
    emailCompany: "",
    slogan: "",
    imageUrl: "",
  });

  useEffect(() => {
    async function fetchCommerce() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/commerce`, {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        });

        if (!res.ok) throw new Error("Error al obtener los datos del comercio");

        const data: Commerce = await res.json();
        setCommerce(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching commerce data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCommerce();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/commerce`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar");
      }

      toast.success("Datos actualizados correctamente");
    } catch (error) {
      console.error("Error updating commerce:", error);
      toast.error("Error de conexión");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="p-6 bg-white min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Datos del Comercio</h1>
      {commerce && (
        <Card className="w-full max-w-2xl p-4">
          <CardContent>
            <div className="flex flex-col items-center mb-4">
              {commerce.imageUrl && (
                <Image
                  src={commerce.imageUrl}
                  alt="Imagen del comercio"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              )}
              <h2 className="text-xl font-semibold mt-2">{commerce.nameFantacy}</h2>
              <p className="text-gray-500">{commerce.slogan}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nombre Fantasía</label>
                <Input name="nameFantacy" value={formData.nameFantacy} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium">Nombre Legal</label>
                <Input name="nameCompany" value={formData.nameCompany} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Input name="emailCompany" value={formData.emailCompany} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium">Slogan</label>
                <Input name="slogan" value={formData.slogan} onChange={handleChange} />
              </div>
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Guardar Cambios
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
