import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir al index inmediatamente
    navigate("/", { replace: true });
  }, [navigate]);

  return null; // No necesitamos renderizar nada ya que redirigimos inmediatamente
};

export default NotFound;
