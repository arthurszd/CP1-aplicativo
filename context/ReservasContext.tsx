import React, { createContext, useContext, useState } from 'react';

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
  adicionarReserva: (reserva: Omit<Reserva, 'id'>) => void;
  cancelarReserva: (id: string) => void;
}

export const ReservasContext = createContext<ReservasContextData>({} as ReservasContextData);

export function ReservasProvider({ children }: { children: React.ReactNode }) {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  const adicionarReserva = (reserva: Omit<Reserva, 'id'>) => {
    const novaReserva: Reserva = {
      ...reserva,
      id: String(Date.now()),
    };
    setReservas(prev => [novaReserva, ...prev]);
  };

  const cancelarReserva = (id: string) => {
    setReservas(prev => prev.filter(r => r.id !== id));
  };

  return (
    <ReservasContext.Provider value={{ reservas, adicionarReserva, cancelarReserva }}>
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
