import React from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/contexts/LanguageContext";
import PageHero from "@/components/PageHero";

const PolicyAndPrivacy = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Política de Privacidad | Business Care Consulting</title>
        <meta
          name="description"
          content="Política de privacidad de Business Care Consulting. Aprenda cómo recopilamos y utilizamos su información personal."
        />
      </Helmet>

      <PageHero
        title={t("policy.title")}
        subtitle={t("policy.subtitle")}
        gradientText={t("policy.title")}
        className="text-center"
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
            <div className="prose prose-lg mx-auto prose-headings:text-purple prose-h1:text-center prose-h1:text-4xl prose-h1:font-bold prose-h2:text-3xl prose-h2:font-semibold prose-h3:text-2xl prose-h3:font-medium prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
              <h1 className="text-gradient-primary">Política de privacidad</h1>
              <div className="flex justify-center items-center mb-12">
                <div className="bg-purple/10 text-purple px-4 py-2 rounded-full text-sm font-medium">
                  Última actualización: 04/29/2022
                </div>
              </div>

              <h2 className="text-gradient-primary">
                Business Care Consulting
              </h2>

              <p className="text-gray-700 leading-relaxed">
                Business Care Consulting valora la privacidad de sus usuarios.
                Esta Política de Privacidad ("Política") le ayudará a entender
                cómo recopilamos y usamos la información personal de quienes
                visitan nuestro sitio web o utilizan nuestras instalaciones y
                servicios en línea, así como lo que haremos y no haremos con la
                información que recopilamos. Nuestra Política ha sido diseñada y
                creada para asegurar a aquellos afiliados con Business Care
                Consulting nuestro compromiso y el cumplimiento de nuestra
                obligación no solo de cumplir, sino de superar la mayoría de los
                estándares de privacidad existentes.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r">
                <p className="text-blue-700">
                  Nos reservamos el derecho de realizar cambios a esta Política
                  en cualquier momento. Si desea asegurarse de estar al tanto de
                  los últimos cambios, le recomendamos que visite esta página
                  con frecuencia.
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Esta Política se aplica a Business Care Consulting y regula
                cualquier y toda recopilación y uso de datos por nuestra parte.
                Al utilizar nuestro sitio web, usted consiente en los
                procedimientos de recopilación de datos expresados en esta
                Política.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Tenga en cuenta que esta Política no rige la recopilación y uso
                de información por parte de empresas que Business Care
                Consulting no controla, ni por personas que no están empleadas o
                administradas por nosotros. Si visita un sitio web que
                mencionamos o enlazamos, asegúrese de revisar su política de
                privacidad antes de proporcionar información al sitio.
              </p>

              <div className="bg-purple-50 p-6 rounded-lg my-8">
                <h3 className="text-purple-700 mb-4 !mt-0">
                  Específicamente, esta Política le informará de lo siguiente:
                </h3>
                <ul className="list-none pl-0 space-y-3">
                  <li className="flex items-start">
                    <span className="bg-purple-500 text-white flex items-center justify-center rounded-full w-6 h-6 text-sm font-bold mr-2 flex-shrink-0 mt-1">
                      1
                    </span>
                    <span className="text-gray-700">
                      Qué información personalmente identificable se recopila de
                      usted a través de nuestro sitio web;
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-500 text-white flex items-center justify-center rounded-full w-6 h-6 text-sm font-bold mr-2 flex-shrink-0 mt-1">
                      2
                    </span>
                    <span className="text-gray-700">
                      Por qué recopilamos información personalmente
                      identificable y la base legal para dicha recopilación;
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-500 text-white flex items-center justify-center rounded-full w-6 h-6 text-sm font-bold mr-2 flex-shrink-0 mt-1">
                      3
                    </span>
                    <span className="text-gray-700">
                      Cómo usamos la información recopilada y con quién podría
                      compartirse;
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-500 text-white flex items-center justify-center rounded-full w-6 h-6 text-sm font-bold mr-2 flex-shrink-0 mt-1">
                      4
                    </span>
                    <span className="text-gray-700">
                      Qué opciones tiene disponibles en cuanto al uso de sus
                      datos; y
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-500 text-white flex items-center justify-center rounded-full w-6 h-6 text-sm font-bold mr-2 flex-shrink-0 mt-1">
                      5
                    </span>
                    <span className="text-gray-700">
                      Los procedimientos de seguridad implementados para
                      proteger el mal uso de su información.
                    </span>
                  </li>
                </ul>
              </div>

              <h3 className="text-gradient-primary">
                Información que Recopilamos
              </h3>

              <p className="text-gray-700 leading-relaxed">
                Siempre depende de usted si decide o no divulgar información
                personalmente identificable, aunque si decide no hacerlo, nos
                reservamos el derecho de no registrarlo como usuario o de
                proporcionarle productos o servicios. Este sitio web recopila
                varios tipos de información, como:
              </p>

              <ul className="space-y-3 my-6">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-gray-700">
                    Información proporcionada voluntariamente, que puede incluir
                    su nombre, dirección, dirección de correo electrónico,
                    información de facturación y/o tarjeta de crédito, etc.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-gray-700">
                    Información recopilada automáticamente al visitar nuestro
                    sitio web, que puede incluir cookies, tecnologías de rastreo
                    de terceros y registros del servidor.
                  </span>
                </li>
              </ul>

              <p className="text-gray-700 leading-relaxed">
                Además, Business Care Consulting podría tener la ocasión de
                recopilar información demográfica anónima no personal, como
                edad, género, ingresos del hogar, afiliación política, raza y
                religión, así como el tipo de navegador que está utilizando, la
                dirección IP o el tipo de sistema operativo, lo cual nos ayudará
                a proporcionar y mantener un servicio de calidad superior.
              </p>

              <h3 className="text-gradient-primary">
                Por Qué Recopilamos Información y Durante Cuánto Tiempo
              </h3>

              <p className="text-gray-700 leading-relaxed">
                Recopilamos sus datos por varias razones:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-2">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-purple-700 font-medium m-0">
                      Personalización
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm ml-10">
                    Para comprender mejor sus necesidades y proporcionarle los
                    servicios que ha solicitado.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-2">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-purple-700 font-medium m-0">Mejoras</h4>
                  </div>
                  <p className="text-gray-600 text-sm ml-10">
                    Para cumplir con nuestro interés legítimo en mejorar
                    nuestros servicios y productos.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-2">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-purple-700 font-medium m-0">
                      Comunicaciones
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm ml-10">
                    Para enviarle correos electrónicos promocionales que
                    contengan información que creemos que puede interesarle.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-2">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-purple-700 font-medium m-0">
                      Seguridad
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm ml-10">
                    Para proteger y preservar la integridad de nuestros
                    servicios y su experiencia en nuestro sitio web.
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Los datos que recopilamos de usted se almacenarán solo mientras
                sea necesario. La duración del tiempo que conservamos dicha
                información se determinará en función de los siguientes
                criterios: la relevancia de la información personal, el tiempo
                que es razonable mantener registros para demostrar que hemos
                cumplido con nuestros deberes y obligaciones, y el cumplimiento
                con disposiciones legales.
              </p>

              <div className="border-t border-b border-gray-200 py-6 my-8">
                <h3 className="text-gradient-primary !mt-0">
                  Uso de la Información Recopilada
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-purple-700">
                    Business Care Consulting no vende, alquila ni arrienda
                  </strong>{" "}
                  en la actualidad, ni lo hará en el futuro, ninguna de sus
                  listas de clientes y/o nombres a terceros.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  Business Care Consulting puede recopilar y hacer uso de la
                  información personal para asistir en la operación de nuestro
                  sitio web y garantizar la entrega de los servicios que
                  necesita y solicita. En ocasiones, podemos encontrar necesario
                  utilizar información personalmente identificable como un medio
                  para mantenerlo informado sobre otros posibles productos y/o
                  servicios que pueden estar disponibles para usted desde
                  www.bcareconsulting.com.
                </p>
              </div>

              <h3 className="text-gradient-primary">
                Divulgación de Información
              </h3>

              <p className="text-gray-700 leading-relaxed">
                Business Care Consulting no puede utilizar ni divulgar la
                información proporcionada por usted, excepto en las siguientes
                circunstancias:
              </p>

              <ul className="space-y-3 my-6">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-gray-700">
                    Según sea necesario para proporcionar servicios o productos
                    que haya solicitado;
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-gray-700">
                    De otras maneras descritas en esta Política o a las que haya
                    dado su consentimiento;
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-gray-700">
                    En conjunto con otra información de tal manera que su
                    identidad no pueda determinarse razonablemente;
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-gray-700">
                    Según lo requerido por la ley, o en respuesta a una citación
                    o orden judicial;
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-gray-700">
                    A auditores externos que han acordado mantener la
                    información confidencial;
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-gray-700">
                    Según sea necesario para hacer cumplir los Términos de
                    Servicio;
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-gray-700">
                    Según sea necesario para mantener, proteger y preservar
                    todos los derechos y la propiedad de Business Care
                    Consulting.
                  </span>
                </li>
              </ul>

              <h3 className="text-gradient-primary">
                Propósitos No Comerciales
              </h3>

              <p className="text-gray-700 leading-relaxed">
                Business Care Consulting respeta enormemente su privacidad.
                Mantenemos y reservamos el derecho de contactarlo si es
                necesario para fines no comerciales (como alertas de errores,
                violaciones de seguridad, problemas de cuenta y/o cambios en los
                productos y servicios). En ciertas circunstancias, podemos
                utilizar nuestro sitio web, periódicos u otros medios públicos
                para publicar un aviso.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded-r">
                <h3 className="text-yellow-800 !mt-0 !mb-2">
                  Niños menores de 13 años
                </h3>
                <p className="text-yellow-700 mb-0">
                  El sitio web de Business Care Consulting no está dirigido a
                  niños menores de trece (13) años y no recopila
                  intencionadamente información personalmente identificable de
                  ellos. Cualquier persona menor de trece (13) años debe buscar
                  y obtener el permiso de sus padres o tutores para utilizar
                  este sitio web.
                </p>
              </div>

              <h3 className="text-gradient-primary">
                Cancelar suscripción u optar por no participar
              </h3>

              <p className="text-gray-700 leading-relaxed">
                Todos los usuarios y visitantes de nuestro sitio web tienen la
                opción de dejar de recibir comunicaciones nuestras por correo
                electrónico o boletines informativos. Para cancelar la
                suscripción o darse de baja de nuestro sitio web, envíe un
                correo electrónico indicando que desea cancelar la suscripción a{" "}
                <a
                  href="mailto:info@bcareit.com"
                  className="text-purple-600 font-medium"
                >
                  info@bcareit.com
                </a>
                .
              </p>

              <h3 className="text-gradient-primary">
                Enlaces a Otros Sitios Web
              </h3>

              <p className="text-gray-700 leading-relaxed">
                Nuestro sitio web contiene enlaces a sitios web afiliados y
                otros sitios. Business Care Consulting no reclama ni acepta
                responsabilidad por ninguna política de privacidad, prácticas
                y/o procedimientos de otros sitios web de este tipo. Por lo
                tanto, animamos a todos los usuarios y visitantes a ser
                conscientes cuando abandonan nuestro sitio web y a leer las
                declaraciones de privacidad de cada sitio que recopila
                información personal identificable.
              </p>

              <h3 className="text-gradient-primary">
                Aviso a Usuarios de la Unión Europea
              </h3>

              <p className="text-gray-700 leading-relaxed">
                Las operaciones de Business Care Consulting se encuentran
                principalmente en México y Estados Unidos. Si proporciona
                información a nosotros, esta se transferirá fuera de la Unión
                Europea (UE) y se enviará a los Estados Unidos. (La decisión de
                adecuación sobre la Privacidad UE-EE. UU. entró en vigor el 1 de
                agosto de 2016. Este marco protege los derechos fundamentales de
                cualquier persona en la UE cuya información personal se
                transfiera a los Estados Unidos con fines comerciales. Permite
                la transferencia libre de datos a empresas
              </p>

              <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">
                  Si tiene alguna pregunta sobre esta Política de Privacidad,
                  por favor contáctenos en{" "}
                  <a
                    href="mailto:info@bcareit.com"
                    className="text-purple-600 font-medium"
                  >
                    info@bcareit.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PolicyAndPrivacy;
