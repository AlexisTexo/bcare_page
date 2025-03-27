# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/cb8623c0-2742-476b-87ed-00d5a2524774

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/cb8623c0-2742-476b-87ed-00d5a2524774) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Strapi Integration for Blog

This project includes a fully featured blog system with Strapi integration. The blog features include:

- Multilingual content (English and Spanish) using the translation system
- Blog listing page with featured and recent posts
- Individual blog post pages with related articles
- Category filtering
- Responsive design with beautiful UI components

### Setting up Strapi

To use the blog functionality with actual data, you need to set up a Strapi backend:

1. Create a new Strapi project:

   ```
   npx create-strapi-app@latest my-project
   ```

2. Configure content types in Strapi:

   - BlogPost (with fields: title, slug, excerpt, content, dateAt, featured, readTime, coverImage, localee, author, category)
   - Author (with fields: name, role, avatar)
   - Category (with fields: name, slug)

3. Enable internationalization in Strapi and add locales (English and Spanish)

4. Update the API configuration in `src/lib/api.ts` with your Strapi URL:

   ```typescript
   export const STRAPI_API_URL = "http://localhost:1337"; // Update with your actual Strapi URL
   ```

5. Start both the Strapi backend and this frontend application:

   ```sh
   # In the Strapi project directory
   npm run develop

   # In this project directory
   npm run dev
   ```

### Features

- **Multilingual Blog**: Content adapts based on the selected language
- **Blog Listing**: Featured and recent posts displayed with categories
- **Blog Detail**: Full article view with markdown support
- **Category Pages**: Filter blog posts by category
- **Search Capability**: Search through blog posts
- **Responsive Design**: Works seamlessly on mobile and desktop

### Technical Implementation

- React components for blog listing, detail, and category pages
- Axios for API communication with Strapi
- React Markdown for rendering post content
- Route configuration for blog navigation
- Fallback data when API is unavailable

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Axios (for API requests)
- React Markdown
- date-fns (for date formatting)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/cb8623c0-2742-476b-87ed-00d5a2524774) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## BcareIT Website

## Formulario de Contacto con Protección Anti-Spam e Integración con Google Sheets

El formulario de contacto implementa varias características para prevenir el spam y almacenar automáticamente las solicitudes en Google Sheets.

### Características Anti-Spam

1. **Campo Honeypot**: Un campo invisible para humanos pero visible para bots que ayuda a identificar envíos automáticos.
2. **Validación de tiempo**: Rechaza envíos que ocurren demasiado rápido (menos de 3 segundos después de cargar el formulario).
3. **Detección de interacción**: Verifica que haya habido interacción humana real (movimiento del mouse o uso del teclado) antes de aceptar el envío.

### Integración con Google Sheets

Para completar la configuración de la integración con Google Sheets, sigue estos pasos:

1. Crea una nueva hoja de cálculo en Google Sheets
2. Ve a **Extensiones > Apps Script**
3. Reemplaza el código en el editor con el siguiente script:

```javascript
function doPost(e) {
  try {
    // Obtén la hoja activa
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();

    // Parsea los datos JSON recibidos
    const data = JSON.parse(e.postData.contents);

    // Prepara la fila a insertar
    const row = [
      new Date(), // Timestamp
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.message,
    ];

    // Añade la fila a la hoja
    sheet.appendRow(row);

    // Devuelve una respuesta exitosa
    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Devuelve el error en caso de fallo
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Configura CORS para permitir solicitudes desde tu dominio
function doOptions(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  return ContentService.createTextOutput(JSON.stringify({}))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
}
```

4. Guarda el proyecto con un nombre descriptivo (por ejemplo, "FormularioContactoBcareIT")
5. Haz clic en **Implementar > Nuevo despliegue**
6. Selecciona **Tipo > Aplicación web**
7. Configura:
   - **Descripción**: Formulario de contacto BcareIT
   - **Ejecutar como**: Tu cuenta
   - **Quién tiene acceso**: Cualquiera, incluso anónimo
8. Haz clic en **Implementar**
9. Copia la URL de implementación web que se te proporciona
10. Abre el archivo `src/lib/googleSheets.ts` en el proyecto
11. Reemplaza `GOOGLE_SCRIPT_URL` con la URL que copiaste

### Probando la integración

Puedes probar la conexión utilizando la función `testGoogleSheetsConnection()` desde la consola del navegador después de iniciar la aplicación:

```javascript
import { testGoogleSheetsConnection } from "./lib/googleSheets";
testGoogleSheetsConnection().then((result) =>
  console.log("Test result:", result)
);
```

## Otras características del proyecto...
