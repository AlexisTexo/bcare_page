import { useState, useEffect } from "react";

/**
 * Hook para gestionar la carga de imágenes con estado, precarga y fallback
 * Mejora la experiencia de usuario al manejar errores de carga
 *
 * @param src - URL de la imagen a cargar
 * @param fallbackSrc - URL alternativa si la imagen principal falla
 * @returns - Objeto con estado de carga, error y URL final
 */
function useImageLoader(
  src: string,
  fallbackSrc: string = "https://images.unsplash.com/photo-1560732488-7b5e485f6504"
) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setImageSrc(src);

    const img = new Image();

    img.onload = () => {
      setIsLoading(false);
    };

    img.onerror = () => {
      setHasError(true);
      setImageSrc(fallbackSrc);

      // Intentar cargar la imagen de fallback
      const fallbackImg = new Image();
      fallbackImg.src = fallbackSrc;
    };

    img.src = src;

    // Limpiar cuando el componente se desmonte
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc]);

  return { isLoading, hasError, imageSrc };
}

export default useImageLoader;
