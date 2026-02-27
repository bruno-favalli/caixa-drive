export interface Usuario {
    id: number;
    usuario: string;
    senha: string;
    role: "admin" | "vip" | "standard";  
  }