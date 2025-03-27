import { useState, useEffect } from "react";

/**
 * Hook personalizado para implementar debounce
 * Útil para retrasar operaciones costosas como búsquedas en tiempo real
 *
 * @param value - El valor a debounce
 * @param delay - Tiempo de espera en milisegundos
 * @returns - El valor después del tiempo de espera
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Configurar un timer para actualizar el valor después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el timer si el valor cambia (o el componente se desmonta)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
