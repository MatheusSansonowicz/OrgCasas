// src/models/Usuario.ts (ou .js se não estiver usando TypeScript)

export interface Usuario {
    id: string;
    nome: string;
    email: string;
    fotoUrl?: string;
    ativo: boolean;
}