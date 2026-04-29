import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveData, getData } from '../services/storage';

const RESERVAS_KEY = '@reservas_list';

export interface Reserva {
  id: string;
  labId: string;
  labName: string;
  nomeAluno: string;
  data: string;
  horario: string;
}

interface ReservasContextData {
  reservas: Reserva[];
  loading: boolean;
  adicionarReserva: (reserva: Omit<Reserva, 'id'>) => Promise<void>;
  cancelarReserva: (id: string) => Promise<void>;
}

export const ReservasContext = createContext<ReservasContextData>({} as ReservasContextData);

export function ReservasProvider({ children }: { children: React.ReactNode }) {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarReservas();
  }, []);

  const carregarReservas = async () => {
    const dados = await getData(RESERVAS_KEY);
    if (dados && Array.isArray(dados)) {
      setReservas(dados);
    }
    setLoading(false);
  };

  const adicionarReserva = async (reserva: Omit<Reserva, 'id'>) => {
    const novaReserva: Reserva = {
      ...reserva,
      id: String(Date.now()),
    };
    const atualizadas = [novaReserva, ...reservas];
    setReservas(atualizadas);
    await saveData(RESERVAS_KEY, atualizadas);
  };

  const cancelarReserva = async (id: string) => {
    const atualizadas = reservas.filter(r => r.id !== id);
    setReservas(atualizadas);
    await saveData(RESERVAS_KEY, atualizadas);
  };

  return (
    <ReservasContext.Provider value={{ reservas, loading, adicionarReserva, cancelarReserva }}>
      {children}
    </ReservasContext.Provider>
  );
}

export function useReservas() {
  const context = useContext(ReservasContext);
  if (!context) {
    throw new Error('useReservas deve ser usado dentro de um ReservasProvider');
  }
  return context;
}
