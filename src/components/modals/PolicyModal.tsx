import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Shield, BookOpen, Lock, Cookie } from 'lucide-react';

export const PolicyModal: React.FC = () => {
  const { policyModal, setPolicyModal } = useApp();

  if (!policyModal) return null;

  const contentMap = {
    privacy: {
      title: 'Política de Privacidad y Protección de Datos',
      icon: Shield,
      updated: '22 de Octubre, 2026',
      sections: [
        {
          heading: '1. Compromiso de Privacidad y Minimización de Datos',
          text: 'En NEBULØN nos regimos por el principio de minimización de datos. Solicitamos únicamente la información estrictamente necesaria para brindar nuestros servicios profesionales, responder a tus solicitudes de cotización o permitir tu participación en la comunidad de programación. No comercializamos, alquilamos ni transferimos tus datos personales a terceros con fines publicitarios.'
        },
        {
          heading: '2. Datos que Recopilamos',
          text: 'Recopilamos: (a) En solicitudes de servicios: nombre, correo electrónico, medio de contacto preferido y descripción del proyecto. (b) En la comunidad: nombre de usuario público, biografía, tecnologías favoritas y publicaciones creadas. Nunca exponemos públicamente tu dirección de correo electrónico ni datos de autenticación a otros miembros.'
        },
        {
          heading: '3. Finalidad del Tratamiento',
          text: 'Tus datos se utilizan para: procesar propuestas comerciales, coordinar proyectos de desarrollo web, notificar respuestas en la comunidad técnica y responder a tickets de soporte o quejas confidenciales.'
        },
        {
          heading: '4. Conservación y Derechos del Usuario (ARCO)',
          text: 'Tienes derecho en todo momento a solicitar el acceso, rectificación, limitación o eliminación definitiva de tu cuenta y datos personales enviando una solicitud formal a andersonvallejo021@gmail.com. Las solicitudes se tramitan en un plazo máximo de 10 días hábiles.'
        }
      ]
    },
    terms: {
      title: 'Términos y Condiciones de Uso del Servicio',
      icon: Lock,
      updated: '22 de Octubre, 2026',
      sections: [
        {
          heading: '1. Aceptación de los Términos',
          text: 'El acceso y uso de la plataforma NEBULØN implica la aceptación plena de estos términos. Si no estás de acuerdo con alguna disposición, deberás abstenerte de utilizar las áreas públicas y privadas del sitio.'
        },
        {
          heading: '2. Propiedad Intelectual y Código de Software',
          text: 'Todos los desarrollos a medida contratados por clientes transfieren su titularidad de propiedad intelectual al cliente conforme a las condiciones del contrato de servicio individual. Los fragmentos de código compartidos libremente en la comunidad técnica se publican bajo licencias permisivas de código abierto (MIT) para fines educativos.'
        },
        {
          heading: '3. Prohibición de Ejecución Maliciosa y Scraping',
          text: 'Queda estrictamente prohibido intentar inyectar código malicioso (XSS, SQL Injection), realizar ataques de denegación de servicio, manipular roles o permisos del sistema o extraer masivamente datos personales de miembros de la comunidad.'
        },
        {
          heading: '4. Limitación de Responsabilidad',
          text: 'NEBULØN ofrece sus herramientas de laboratorio y simuladores con fines educativos y de demostración técnica. No nos hacemos responsables de daños indirectos derivados del uso de fragmentos de código sin su debida prueba en entornos seguros por parte del usuario.'
        }
      ]
    },
    rules: {
      title: 'Normas de Convivencia y Moderación de la Comunidad',
      icon: BookOpen,
      updated: '22 de Octubre, 2026',
      sections: [
        {
          heading: '1. Respeto Técnico Mutuo y Empatía',
          text: 'La comunidad de NEBULØN reúne desde principiantes hasta ingenieros veteranos. Todas las preguntas legítimas son bienvenidas. Se prohíbe el acoso, la condescendencia tóxica, los insultos personales, la discriminación y el desprecio hacia quienes están aprendiendo.'
        },
        {
          heading: '2. Formato Claro y Código Responsable',
          text: 'Al publicar una pregunta técnica, incluye el lenguaje, qué intentaste hacer, el resultado obtenido y el mensaje exacto de error. No publiques credenciales privadas, API keys, contraseñas ni tokens de autenticación en tus fragmentos de código.'
        },
        {
          heading: '3. Política Estricta contra el Spam y Enlaces Engañosos',
          text: 'No se permite la promoción no solicitada de cursos de dudosa procedencia, esquemas piramidales, enlaces de afiliados engañosos o publicidad repetitiva. Las publicaciones de este tipo serán eliminadas de inmediato y la cuenta será suspendida.'
        },
        {
          heading: '4. Procedimiento de Moderación y Denuncias',
          text: 'Cualquier miembro puede denunciar publicaciones que violen estas normas. La cola de moderación revisa los reportes bajo principios de neutralidad. El equipo se reserva el derecho de ocultar contenido o suspender cuentas reincidentes.'
        }
      ]
    },
    cookies: {
      title: 'Política de Cookies y Almacenamiento Local',
      icon: Cookie,
      updated: '22 de Octubre, 2026',
      sections: [
        {
          heading: '1. ¿Qué Tecnologías de Almacenamiento Utilizamos?',
          text: 'NEBULØN utiliza almacenamiento local (localStorage y cookies técnicas de sesión) exclusivamente para fines funcionales: recordar tus preferencias de tema, mantener tu sesión de usuario activa y preservar tus borradores de proyectos y publicaciones comunitarias.'
        },
        {
          heading: '2. Cero Rastreo Publicitario de Terceros',
          text: 'No utilizamos cookies de seguimiento publicitario invasivo, píxeles de retargeting de redes sociales ni vendemos patrones de navegación a intermediarios de datos.'
        },
        {
          heading: '3. Control por el Usuario',
          text: 'Puedes limpiar en cualquier momento el almacenamiento local de tu navegador a través de la configuración de tu navegador web sin que esto impida el acceso básico al contenido público de la plataforma.'
        }
      ]
    }
  };

  const current = contentMap[policyModal];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0b101e] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/40">
          <div className="flex items-center gap-2">
            <current.icon className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              {current.title}
            </h3>
          </div>
          <button
            onClick={() => setPolicyModal(null)}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-xs text-slate-300 leading-relaxed">
          <div className="text-[11px] font-mono text-slate-400">
            Última actualización: {current.updated} · NEBULØN Compliance
          </div>

          <div className="space-y-6">
            {current.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-semibold text-slate-100 text-sm">
                  {sec.heading}
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  {sec.text}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => setPolicyModal(null)}
              className="px-5 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg"
            >
              Comprendido y Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
