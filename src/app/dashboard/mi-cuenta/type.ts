export interface User {
  name: string;
  email: string;
  imgProfile: string;
  dni: number;
  cuit: string;
  birthdate: string; // Cambiado a string para el manejo de fechas
  startDate: string;
  endDate: string;
  phone: number;
  address: string;
  city: string;
}