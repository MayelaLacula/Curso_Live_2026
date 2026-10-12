// RUTAS DE LOS VIDEOS

const videos = {
  composicion: "Recursos/Videos/Composición de cursos.mp4",
  sesiones: "Recursos/Videos/Sesiones sincrónicas.mp4",
  estructura: "Recursos/Videos/Estructura de la sesión .mp4",
  tips: "Recursos/Videos/Tips para una clase dinámica.mp4",
  banco: "Recursos/Videos/Banco de actividades ¿Cómo elegir.mp4",

  teams: [
    {
      titulo: "Creación del equipo",
      ruta: "Recursos/Videos/Crear_Equipo.mp4"
    },
    {
      titulo: "Programación de sesiones",
      ruta: "Recursos/Videos/ProgramaciónSesiones.mp4"
    },
    {
      titulo: "Publicación de la grabación",
      ruta: "Recursos/Videos/Publicar_Sesion.mp4"
    }
  ]
};


// INFORMACIÓN DE CADA TEMA

const temas = {
  composicion: {
    titulo: "Composición de cursos",

    contenido: `
      <div class="tipos-curso">
        <div class="tipo-curso">
          <img
            src="Recursos/Imagenes/CursoLive.png"
            alt=""
            class="imagen-tipo"
          >

          <p>
            <strong>Curso Live:</strong>
            Participan solo alumnos Live.
          </p>
        </div>

        <div class="tipo-curso">
          <img
            src="Recursos/Imagenes/CursoMixto.png"
            alt=""
            class="imagen-tipo"
          >

          <p>
            <strong>Curso Mixto:</strong>
            Participan alumnos Live y Flex.
          </p>
        </div>
      </div>

      <p class="aviso-live">
        ℹ️ Las características Live aplican únicamente
        a los alumnos de este modelo.
      </p>
    `
  },

  sesiones: {
    titulo: "Sesiones sincrónicas",

    contenido: `
      <div class="tipos-curso">
        <div class="tipo-curso">
          <img
            src="Recursos/Imagenes/SesionesSincronas01.png"
            alt=""
            class="imagen-tipo"
          >

          <p>
            <strong>Bachillerato y Licenciatura:</strong>
            3 sesiones.
            <br>
            <strong>Maestría:</strong>
            4 sesiones.
          </p>
        </div>

        <div class="tipo-curso">
          <img
            src="Recursos/Imagenes/SesionesSincronas02.png"
            alt=""
            class="imagen-tipo"
          >

          <p>
            <strong>Bloque A:</strong>
            14:00–15:30.
            <br>
            <strong>Bloque B:</strong>
            15:30–17:00.
          </p>
        </div>
      </div>
    `
  },

  estructura: {
    titulo: "Estructura de sesión",
    contenido: ``
  },

  tips: {
    titulo: "Tips para una clase dinámica",

    contenido: `
      <ul>
        <li>Activa al grupo durante los primeros 5 minutos.</li>
        <li>Usa videos de 5 a 10 minutos como máximo.</li>
        <li>Haz preguntas abiertas.</li>
        <li>Apóyate en recursos visuales.</li>
      </ul>
    `
  },

  banco: {
    titulo: "Banco de actividades: cómo elegir",

    contenido: `
      <p>
        Entra al <strong>Portal Docente</strong>
        y sigue esta ruta:
      </p>

      <p>
        <strong>
          Nivel académico → Modelo Live →
          Banco de actividades → Curso → Metodología.
        </strong>
      </p>

      <p>
        Elige las actividades según la metodología asignada.
      </p>
    `
  },

 teams: {
  titulo: "Gestión de sesiones en Teams",

  contenido: `
    <iframe
      src="prueba-teams-interactiva.html"
      title="Tutorial interactivo de Microsoft Teams"
      class="tutorial-teams"
    ></iframe>
  `
}
};


// ELEMENTOS DE LA PÁGINA

const menu = document.getElementById("menu");
const detalle = document.getElementById("detalle");
const reproductor = document.getElementById("reproductor");


// ABRIR UN TEMA

function abrirTema(clave) {
  const tema = temas[clave];

  if (!tema) return;

  document.getElementById("titulo-detalle").textContent =
    tema.titulo;

  const contenido = document.getElementById("contenido-detalle");

  contenido.innerHTML = tema.contenido;
  reproductor.replaceChildren();

  // Teams utiliza tres reproductores dentro de su contenido.
  reproductor.style.display = clave === "teams" ? "none" : "";

  function agregarVideo(destino, rutaVideo) {
    const ruta = rutaVideo.trim();

    if (!ruta) {
      const aviso = document.createElement("div");

      aviso.className = "pendiente";
      aviso.textContent = "▷ Video pendiente de agregar";

      destino.append(aviso);

    } else if (/^https:\/\/[^/]+\.sharepoint\.com\//i.test(ruta)) {
      const enlace = document.createElement("a");

      enlace.href = ruta;
      enlace.target = "_blank";
      enlace.rel = "noopener noreferrer";
      enlace.className = "enlace-video";
      enlace.textContent = "▶ Ver video en SharePoint";

      destino.append(enlace);

    } else {
      const video = document.createElement("video");

      video.src = ruta;
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";

      destino.append(video);
    }
  }

  // Los demás temas conservan su video.
// Teams muestra el tutorial incluido en su contenido.
if (clave !== "teams") {
  agregarVideo(reproductor, videos[clave] || "");
}

  menu.classList.add("oculto");
  detalle.classList.add("activo");

  window.scrollTo(0, 0);
}


// CLIC EN LAS TARJETAS

document.querySelectorAll("[data-tema]").forEach(tarjeta => {
  tarjeta.addEventListener("click", () => {
    abrirTema(tarjeta.dataset.tema);
  });
});


// VOLVER A LA GUÍA

document.getElementById("volver").addEventListener("click", () => {
  reproductor.replaceChildren();

  document.getElementById("contenido-detalle").replaceChildren();

  detalle.classList.remove("activo");
  menu.classList.remove("oculto");

  window.scrollTo(0, 0);
});
// Elección de apariencia, disponible también al abrir el HTML localmente.
const botonTema = document.getElementById('cambiar-tema');
let temaGuardado;
try { temaGuardado = localStorage.getItem('cnci-live-tema'); } catch (_) {}
function aplicarTema(tema) {
  document.documentElement.dataset.theme = tema;
  const oscuro = tema === 'dark';
  botonTema.setAttribute('aria-pressed', String(oscuro));
  botonTema.setAttribute('aria-label', oscuro ? 'Activar modo claro' : 'Activar modo oscuro');
  botonTema.querySelector('i').className = oscuro ? 'bi bi-sun' : 'bi bi-moon';
  botonTema.querySelector('span').textContent = oscuro ? 'Modo claro' : 'Modo oscuro';
}
aplicarTema(temaGuardado === 'dark' ? 'dark' : 'light');
botonTema.addEventListener('click', () => {
  const tema = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  aplicarTema(tema);
  try { localStorage.setItem('cnci-live-tema', tema); } catch (_) {}
});
const movimientoPermitido = matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
document.querySelectorAll('.tarjeta').forEach(tarjeta => {
  tarjeta.addEventListener('pointermove', evento => {
    if (!movimientoPermitido.matches) return;
    const r = tarjeta.getBoundingClientRect();
    tarjeta.style.setProperty('--rx', ((.5-(evento.clientY-r.top)/r.height)*3)+'deg');
    tarjeta.style.setProperty('--ry', (((evento.clientX-r.left)/r.width-.5)*3)+'deg');
  });
  tarjeta.addEventListener('pointerleave', () => {
    tarjeta.style.setProperty('--rx','0deg'); tarjeta.style.setProperty('--ry','0deg');
  });
});


/* FONDO ANIMADO VANTA NET */

(() => {
  function iniciarFondoAnimado() {
    const fondo = document.getElementById("fondo-animado");
    const raiz = document.documentElement;

    if (!fondo) return;

    const movimientoReducido = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let efecto = null;

    function actualizarFondo() {
      if (efecto) {
        efecto.destroy();
        efecto = null;
      }

      if (movimientoReducido.matches) return;

      if (!window.THREE || !window.VANTA?.NET) {
        console.warn(
          "No cargó Vanta. Revisa los archivos de Recursos/JS."
        );
        return;
      }

      const oscuro = raiz.dataset.theme === "dark";

      try {
        efecto = window.VANTA.NET({
          el: fondo,

          mouseControls: false,
          touchControls: false,
          gyroControls: false,

          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,

          color: 0xff8200,

          backgroundColor: oscuro
            ? 0x161d28
            : 0xeee7dc,

          /* Red espaciosa para no saturar el contenido */
          points: 10,
          maxDistance: 18,
          spacing: 24,
          showDots: true
        });
      } catch (error) {
        console.warn("No se pudo iniciar el fondo animado.", error);
      }
    }

    actualizarFondo();

    /* Actualizar la red cuando cambies claro/oscuro */
    const observadorTema = new MutationObserver(actualizarFondo);

    observadorTema.observe(raiz, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

    movimientoReducido.addEventListener(
      "change",
      actualizarFondo
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      iniciarFondoAnimado,
      { once: true }
    );
  } else {
    iniciarFondoAnimado();
  }
})();