import axios from "axios";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

/**
 * Envía datos del formulario de contacto a Google Sheets mediante un API de Google Apps Script
 *
 * Para implementar esta funcionalidad:
 * 1. Crea una hoja de Google Sheets con las columnas necesarias
 * 2. En Google Sheets, ve a Extensiones > Apps Script
 * 3. Copia y pega el código de ejemplo proporcionado en los comentarios
 * 4. Implementa el script como una aplicación web
 * 5. Establece el acceso como "Cualquiera, incluso anónimo"
 * 6. Implementa y copia la URL del servicio web
 * 7. Reemplaza GOOGLE_SCRIPT_URL con esa URL
 *
 * Código de ejemplo para Google Apps Script:
 *
 * ```
 * function doPost(e) {
 *   try {
 *     // Obtén la hoja activa
 *     const ss = SpreadsheetApp.getActiveSpreadsheet();
 *     const sheet = ss.getActiveSheet();
 *
 *     // Parsea los datos JSON recibidos
 *     const data = JSON.parse(e.postData.contents);
 *
 *     // Prepara la fila a insertar (ajusta según tus columnas)
 *     const row = [
 *       new Date(), // Timestamp
 *       data.firstName,
 *       data.lastName,
 *       data.email,
 *       data.phone,
 *       data.message
 *     ];
 *
 *     // Añade la fila a la hoja
 *     sheet.appendRow(row);
 *
 *     // Devuelve una respuesta exitosa
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ result: 'success' }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } catch(error) {
 *     // Devuelve el error en caso de fallo
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ result: 'error', error: error.message }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 *
 * // Configura CORS para permitir solicitudes desde tu dominio
 * function doOptions(e) {
 *   var lock = LockService.getScriptLock();
 *   lock.tryLock(10000);
 *
 *   var headers = {
 *     'Access-Control-Allow-Origin': '*',
 *     'Access-Control-Allow-Methods': 'POST',
 *     'Access-Control-Allow-Headers': 'Content-Type'
 *   };
 *
 *   return ContentService
 *     .createTextOutput(JSON.stringify({}))
 *     .setMimeType(ContentService.MimeType.JSON)
 *     .setHeaders(headers);
 * }
 * ```
 */
export async function sendContactFormToGoogleSheets(
  formData: ContactFormData
): Promise<boolean> {
  // Reemplaza esta URL con la URL de tu script de Google Apps
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzuP4CzkZ-PwySlC85x5lZiBVjP1DqbBQ-KogsRop8xtSHrHKOV2LSW4xNJ5vnZ3lEO/exec";

  // Usar un proxy CORS
  const CORS_PROXY = "https://corsproxy.io/?";

  try {
    const response = await axios.post(
      CORS_PROXY + encodeURIComponent(GOOGLE_SCRIPT_URL),
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 && response.data.result === "success") {
      console.log("Datos enviados correctamente a Google Sheets");
      return true;
    } else {
      console.error("Error al enviar datos a Google Sheets:", response.data);
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud a Google Sheets:", error);
    return false;
  }
}

/**
 * Función de utilidad para probar la conexión con Google Sheets
 * Envía datos de prueba para verificar que funciona correctamente
 */
export async function testGoogleSheetsConnection(): Promise<boolean> {
  const testData: ContactFormData = {
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    phone: "123456789",
    message:
      "Este es un mensaje de prueba para verificar la conexión con Google Sheets.",
  };

  return sendContactFormToGoogleSheets(testData);
}
