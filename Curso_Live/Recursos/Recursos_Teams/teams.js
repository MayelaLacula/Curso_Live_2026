// ESTADO DE LA PRÁCTICA

let chapter = 0;
let step = 0;

let course = "Administración de Empresas";
let postTitle = "";
let postBody = "";

const practiceLink =
  "https://ejemplo.invalid/grabacion-clase-1";

// EQUIPOS FICTICIOS DE MUESTRA

const sampleTeams = [
  {
    initials: "AE",
    name: "Administración de Empresas · Grupo A",
    color: "#ec168c"
  },
  {
    initials: "CE",
    name: "Capacitación Empresarial · Grupo A",
    color: "#0078df"
  },
  {
    initials: "AC",
    name: "Administración de la Capacitación · Grupo B",
    color: "#087f8b"
  },
  {
    initials: "AM",
    name: "Mercadotecnia · Grupo A",
    color: "#087f8b"
  },
  {
    initials: "TA",
    name: "Tecnología y Administración · Grupo A",
    color: "#ec168c"
  },
  {
    initials: "CP",
    name: "Costos y Planeación Estratégica · Grupo B",
    color: "#f02725"
  },
  {
    initials: "CO",
    name: "Contabilidad y Entorno Económico · Grupo A",
    color: "#cf2342"
  },
  {
    initials: "IN",
    name: "Informática II · Grupo A",
    color: "#087f8b"
  }
];

// INSTRUCCIONES DE CADA TUTORIAL

const guides = [
  [
    [
      "Abre las opciones de equipos",
      "Selecciona Unirse a un equipo o crear uno."
    ],
    [
      "Selecciona Crear equipo",
      "Crea un nuevo espacio para trabajar con tus alumnos."
    ],
    [
      "Elige el tipo Clase",
      "Selecciona Clase para preparar un equipo educativo."
    ],
    [
      "Escribe el nombre completo del curso",
      "Usa el nombre de tu curso sin abreviaturas y selecciona Crear."
    ],
    [
      "Tu equipo está preparado",
      "Ya puedes continuar con la programación de tus sesiones."
    ]
  ],

  [
    [
      "Selecciona Programar una reunión",
      "En esta práctica programarás la reunión del canal General."
    ],
    [
      "Pon el nombre de la reunión",
      "Escribe Sesiones sincrónicas y selecciona Configurar fechas."
    ],
    [
      "Configura los tres sábados",
      "Usa repetición semanal en sábado y finaliza el 24 de octubre. El horario de práctica es 14:00–15:30."
    ],
    [
      "Revisa y programa las sesiones",
      "Comprueba el curso, el canal y los tres sábados antes de guardar."
    ],
    [
      "Tus sesiones quedaron programadas",
      "En Teams real, comprueba que tus alumnos estén incluidos y puedan ver las sesiones en su calendario."
    ]
  ],

  [
    [
      "Espera a que la grabación esté disponible",
      "Esta pantalla simula que la grabación terminó de cargarse. Selecciona Compartir."
    ],
    [
      "Selecciona Compartir vínculo",
      "En Teams real, revisa que tus alumnos tengan permisos para ver la grabación."
    ],
    [
      "Copia el vínculo de la grabación",
      "Copia el vínculo simulado y vuelve al canal General."
    ],
    [
      "Crea una nueva publicación",
      "En el canal General, selecciona Nueva publicación."
    ],
    [
      "Agrega el nombre de la clase y el vínculo",
      "Escribe el número o nombre de la clase y usa Pegar vínculo. Después selecciona Publicar."
    ],
    [
      "Tu grabación está publicada",
      "Los alumnos podrán ubicar la clase por su nombre y abrir el vínculo."
    ]
  ]
];

// FUNCIONES PARA GENERAR LA INTERFAZ

const $ = id => document.getElementById(id);

function escapeHTML(text) {
  const characters = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };

  return String(text).replace(
    /[&<>"']/g,
    character => characters[character]
  );
}

function button(text, action, className = "primary target") {
  return `
    <button
      type="button"
      class="${className}"
      data-action="${action}"
    >
      ${text}
    </button>
  `;
}

function heading(title) {
  return `
    <div class="toolbar">
      <h2>${title}</h2>
      <span class="muted">Entorno de práctica</span>
    </div>
  `;
}

function dialog(title, content) {
  return `
    <div class="dialog">
      <h3>${title}</h3>

      ${content}

      <div
        id="error"
        class="message"
        role="alert"
      ></div>
    </div>
  `;
}

function success(title) {
  const nextButton = chapter < 2
    ? button(
        "Continuar con el siguiente tutorial →",
        "next"
      )
    : button(
        "Volver al primer tutorial",
        "first"
      );

  return `
    <div class="complete">
      <div class="check">✓</div>
      <h2>${title}</h2>
      <p>Recorrido completado. ¡Muy bien!</p>

      ${nextButton}
    </div>
  `;
}

function sampleTeamCards() {
  return sampleTeams.map(team => `
    <article class="equipo-muestra">
      <div class="equipo-fila">
        <div
          class="equipo-iniciales"
          style="background: ${team.color}"
        >
          ${escapeHTML(team.initials)}
        </div>

        <div class="equipo-nombre">
          ${escapeHTML(team.name)}
        </div>

        <span
          class="equipo-opciones"
          aria-hidden="true"
        >
          ···
        </span>
      </div>

      <div class="equipo-accesos" aria-hidden="true">
        <span>▤</span>
        <span>▢</span>
        <span>▧</span>
      </div>
    </article>
  `).join("");
}

// TUTORIAL 1: CREACIÓN DEL EQUIPO

function renderTeamCreation() {
  switch (step) {
    case 0:
      return `
        <div class="equipos-cabecera">
          <h2>Equipos</h2>

          ${button(
            "Unirse a un equipo o crear uno",
            "advance",
            "target"
          )}
        </div>

        <h3 class="clases-titulo">⌄ Clases</h3>

        <div class="equipos-muestra">
          ${sampleTeamCards()}
        </div>

        <p class="nota-muestra">
          Equipos ficticios de muestra.
        </p>
      `;

    case 1:
      return heading("Unirse a un equipo o crear uno") +
        dialog(
          "Crear un equipo",
          `
            <p class="muted">
              Prepara un espacio para trabajar con tus alumnos.
            </p>

            <div class="actions">
              ${button("Crear equipo", "advance")}
            </div>
          `
        );

    case 2:
      return heading("Equipos") +
        dialog(
          "Selecciona un tipo de equipo",
          `
            <div class="choices">
              ${button(
                "<strong>▣ Clase</strong><small>Docentes y alumnos</small>",
                "advance"
              )}

              ${button(
                "<strong>Personal</strong><small>Equipo de trabajo</small>",
                "wrong",
                ""
              )}
            </div>
          `
        );

    case 3:
      return heading("Equipos") +
        dialog(
          "Crear un equipo de clase",
          `
            <label class="field" for="course">
              Nombre del equipo
            </label>

            <input
              id="course"
              class="target"
              placeholder="Ejemplo: Administración de Empresas"
            >

            <label class="field" for="description">
              Descripción (opcional)
            </label>

            <textarea
              id="description"
              placeholder="Escribe una descripción del curso"
            ></textarea>

            <div class="actions">
              ${button("Crear", "create", "primary")}
            </div>
          `
        );

    case 4:
      return heading("Equipos") + `
        <div class="teamcard">
          <div class="teamicon">▣</div>

          <strong>${escapeHTML(course)}</strong>

          <p class="muted">
            Equipo de clase · Canal General
          </p>
        </div>
      ` + success("Equipo creado");
  }
}

// TUTORIAL 2: PROGRAMACIÓN DE SESIONES

// TUTORIAL 2: PROGRAMACIÓN DE SESIONES

let nombreReunion = "";

guides[1] = [
  [
    "Selecciona Programar una reunión",
    "Abre el formulario para programar las sesiones del canal General."
  ],
  [
    "Escribe el nombre de la reunión",
    "Escribe Sesiones sincrónicas. Después pulsa Configurar periodicidad."
  ],
  [
    "Configura la repetición semanal",
    "Selecciona Semanalmente. En la ventana, elige repetir cada 1 semana, marca sábado y establece el fin el 24 de octubre."
  ],
  [
    "Revisa y envía la reunión",
    "Comprueba los tres sábados y el horario de práctica: 14:00–15:30. Después pulsa Enviar."
  ],
  [
    "Tus sesiones quedaron programadas",
    "Completaste la programación de las tres sesiones de práctica."
  ]
];

function formularioReunion() {
  const repeticionGuardada = step === 3;

  return `
    <section class="teams-reunion">
      <header class="reunion-cabecera">
        <div class="reunion-titulo">
          <span aria-hidden="true">▦</span>
          <h2>Nueva reunión</h2>
        </div>

        <div class="reunion-botones">
          ${button(
            "Enviar",
            "enviar-sesiones",
            repeticionGuardada ? "primary target" : "primary"
          )}
          ${button("Cerrar", "cerrar-reunion", "")}
        </div>
      </header>

      <div
  id="error"
  class="message reunion-error"
  role="alert"
  tabindex="-1"
></div>

${step === 1 ? `
  <div class="aviso-bajar">
    <div>
      <strong>Antes de enviar, configura la periodicidad</strong>
      <p>
        Escribe el nombre de la reunión y desplázate hacia abajo
        para encontrar el botón Configurar periodicidad.
      </p>
    </div>

    <button
      type="button"
      class="boton-bajar"
      data-scroll="periodicidad"
    >
      Ir al botón ↓
    </button>
  </div>
` : ""}

      <div class="reunion-pestanas">
        <strong>Detalles</strong>
        <span>Asistente para programación</span>
      </div>

      <div class="reunion-opciones">
        <span>Mostrar como: <b>Ocupado</b></span>
        <span>Categoría: ninguna</span>
        <span>(UTC-06:00) Ciudad de México</span>
      </div>

      <div class="reunion-distribucion">
        <div class="reunion-campos">
          <label class="reunion-fila">
            <span class="reunion-icono" aria-hidden="true">✎</span>

            <input
              id="meeting"
              aria-label="Título de la reunión"
              placeholder="Agregar título"
              value="${escapeHTML(nombreReunion)}"
              class="${step === 1 ? "target" : ""}"
              ${step !== 1 ? "readonly" : ""}
            >
          </label>

          <div class="reunion-fila">
            <span class="reunion-icono" aria-hidden="true">♙</span>
            <div class="reunion-campo-gris">
              Agregar asistentes requeridos
              <span class="reunion-opcionales">+ Opcionales</span>
            </div>
          </div>

          <div class="reunion-fila">
            <span class="reunion-icono" aria-hidden="true">◷</span>

            <div class="reunion-fechas">
              <input
                type="date"
                value="2026-10-10"
                aria-label="Fecha de inicio"
                readonly
              >

              <input
                type="time"
                value="14:00"
                aria-label="Hora de inicio"
                readonly
              >

              <span aria-hidden="true">→</span>

              <input
                type="date"
                value="2026-10-10"
                aria-label="Fecha de finalización de la primera sesión"
                readonly
              >

              <input
                type="time"
                value="15:30"
                aria-label="Hora de finalización"
                readonly
              >
            </div>
          </div>

          <div class="reunion-fila">
            <span class="reunion-icono" aria-hidden="true">⟳</span>

            <div>
              <label class="sr-only" for="periodicidad">
                Repetición de la reunión
              </label>

              <select
                id="periodicidad"
                class="${step === 2 ? "target" : ""}"
                ${step !== 2 ? "disabled" : ""}
              >
                <option value="none">No se repite</option>
                <option
                  value="weekly"
                  ${repeticionGuardada ? "selected" : ""}
                >
                  Semanalmente
                </option>
              </select>

              ${
                repeticionGuardada
                  ? `<p class="reunion-resumen">
                       Cada sábado, del 10 al 24 de octubre de 2026.
                     </p>`
                  : ""
              }
            </div>
          </div>

          <div class="reunion-fila">
            <span class="reunion-icono" aria-hidden="true">▤</span>
            <div class="reunion-campo-gris">
              ${escapeHTML(course)} &gt; General
            </div>
          </div>

          <div class="reunion-fila">
            <span class="reunion-icono" aria-hidden="true">⌖</span>
            <div class="reunion-campo-gris">
              Agregar ubicación
            </div>
          </div>

          <div class="reunion-editor">
            <div class="reunion-editor-barra">
              <b>B</b>
              <i>I</i>
              <u>U</u>
              <span>≡</span>
              <span>Lista</span>
              <span>Párrafo</span>
            </div>

            <textarea
              aria-label="Descripción de la reunión"
              placeholder="Agregar detalles de la reunión"
            ></textarea>
          </div>

        

          ${
            step === 1
              ? `<div class="actions">
                   ${button(
                     "Configurar periodicidad →",
                     "preparar-periodicidad",
                     "primary"
                   )}
                 </div>`
              : ""
          }
        </div>

        <aside class="reunion-panel">
          <h3>Opciones</h3>
          <p>¿Quién puede omitir la sala de espera?</p>
          <div class="reunion-campo-gris">
            Personas que fueron invitadas
          </div>
          <p class="reunion-mas-opciones">Más opciones</p>
        </aside>
      </div>
    </section>
  `;
}

function abrirPeriodicidad() {
  if ($("modal-periodicidad")) return;

  $("screen").insertAdjacentHTML("beforeend", `
    <div class="periodicidad-fondo" id="modal-periodicidad">
      <section
        class="periodicidad-ventana"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-periodicidad"
      >
        <h3 id="titulo-periodicidad">Establecer periodicidad</h3>

        <div class="periodicidad-fila">
          <label for="periodo-inicio">Inicio</label>
          <input
            id="periodo-inicio"
            type="date"
            value="2026-10-10"
          >
        </div>

        <div class="periodicidad-fila">
          <label for="periodo-intervalo">Repetir cada</label>

          <div class="periodicidad-intervalo">
            <input
              id="periodo-intervalo"
              type="number"
              min="1"
              value="1"
            >

            <select aria-label="Unidad de repetición" disabled>
              <option>Semana</option>
            </select>
          </div>
        </div>

        <div class="periodicidad-dias" aria-label="Días de la semana">
          ${["D", "L", "M", "X", "J", "V", "S"].map((dia, index) => `
            <button
              type="button"
              data-action="seleccionar-dia"
              data-dia="${index}"
              aria-label="${[
                "Domingo", "Lunes", "Martes", "Miércoles",
                "Jueves", "Viernes", "Sábado"
              ][index]}"
              aria-pressed="${index === 6}"
              class="${index === 6 ? "dia-seleccionado" : ""}"
            >
              ${dia}
            </button>
          `).join("")}
        </div>

        <div class="periodicidad-fila">
          <label for="periodo-fin">Fin</label>

          <input
            id="periodo-fin"
            type="date"
            value="2026-10-24"
          >
        </div>

        <p class="periodicidad-descripcion">
          Selecciona el primer sábado y el último sábado
          de las tres sesiones.
        </p>

        <p id="error-periodicidad" class="message" role="alert"></p>

        <div class="actions">
          ${button("Cancelar", "cancelar-periodicidad", "")}
          ${button("Guardar", "guardar-periodicidad", "primary target")}
        </div>
      </section>
    </div>
  `);

  $("periodo-inicio").focus();
}

function renderMeetingSchedule() {
  switch (step) {
    case 0:
      return heading("General · " + escapeHTML(course)) + `
        <p class="muted">
          Publicaciones · Archivos · Notas
        </p>

        <div class="actions">
          ${button("Programar una reunión", "advance")}
        </div>
      `;

    case 1:
    case 2:
    case 3:
      return formularioReunion();

    case 4:
      return heading("Calendario") + `
        <div class="calendar">
          ${[10, 17, 24].map(day => `
            <div class="day">
              <strong>Sábado ${day}</strong>
              <p class="muted">Octubre 2026</p>

              <div class="event">
                Sesiones sincrónicas
                <br>
                14:00–15:30
                <br>
                General
              </div>
            </div>
          `).join("")}
        </div>
      ` + success("Tres sesiones programadas");
  }
}

// ACCIONES DEL FORMULARIO DE PROGRAMACIÓN

document.addEventListener("change", function (event) {
  if (event.target.id !== "periodicidad") return;

  if (event.target.value === "weekly") {
    abrirPeriodicidad();
  }
});

document.addEventListener("click", function (event) {
  const boton = event.target.closest("button");
  if (!boton || chapter !== 1) return;

  switch (boton.dataset.action) {
    case "preparar-periodicidad": {
      const titulo = $("meeting").value.trim();

      if (titulo.toLocaleLowerCase() !== "sesiones sincrónicas") {
        showError("Escribe Sesiones sincrónicas, con ese nombre.");
        return;
      }

      nombreReunion = titulo;
      advance();
      break;
    }

    case "seleccionar-dia":
      boton.classList.toggle("dia-seleccionado");
      boton.setAttribute(
        "aria-pressed",
        String(boton.classList.contains("dia-seleccionado"))
      );
      break;

    case "cancelar-periodicidad":
      $("modal-periodicidad").remove();
      $("periodicidad").value = "none";
      $("periodicidad").focus();
      break;

    case "guardar-periodicidad": {
      const dias = [
        ...document.querySelectorAll(
          ".periodicidad-dias .dia-seleccionado"
        )
      ];

      const correcto =
        $("periodo-inicio").value === "2026-10-10" &&
        $("periodo-fin").value === "2026-10-24" &&
        Number($("periodo-intervalo").value) === 1 &&
        dias.length === 1 &&
        dias[0].dataset.dia === "6";

      if (!correcto) {
        $("error-periodicidad").textContent =
          "Usa inicio 10 de octubre, fin 24 de octubre, " +
          "cada 1 semana y selecciona únicamente sábado.";
        return;
      }

      advance();
      break;
    }

    case "enviar-sesiones":
  if (step !== 3) {
    showError(
      step === 1
        ? "Todavía no puedes enviar. Escribe Sesiones sincrónicas y desplázate hacia abajo para pulsar Configurar periodicidad."
        : "Todavía no puedes enviar. Selecciona Semanalmente y guarda la periodicidad antes de continuar."
    );

    return;
  }

  advance();
  break;

    case "cerrar-reunion":
      step = 0;
      nombreReunion = "";
      render();
      break;
  }
});

// TUTORIAL 3: PUBLICACIÓN DE LA GRABACIÓN

function renderRecordingPublication() {
  switch (step) {
    case 0:
      return heading("Grabación de la sesión") + `
        <div class="recording">
          <div class="thumb">▷</div>

          <strong>Clase 1 · Grabación</strong>

          <div class="notice">
            ✓ Grabación disponible
          </div>

          ${button("Compartir", "advance")}
        </div>
      `;

    case 1:
      return heading("Grabación de la sesión") +
        dialog(
          "Compartir",
          `
            <p class="muted">
              Comprueba los permisos de visualización
              antes de compartir en Teams real.
            </p>

            ${button("Compartir vínculo", "advance")}
          `
        );

    case 2:
      return heading("Grabación de la sesión") +
        dialog(
          "Vínculo de la grabación",
          `
            <div class="linkbox">
              ${practiceLink}
            </div>

            <p class="muted">
              Vínculo ficticio de práctica.
            </p>

            ${button(
              "Copiar vínculo y volver a General",
              "advance"
            )}
          `
        );

    case 3:
      return heading("General · " + escapeHTML(course)) + `
        <p class="muted">Publicaciones</p>

        ${button("+ Nueva publicación", "advance")}
      `;

    case 4:
      return heading("General · " + escapeHTML(course)) +
        dialog(
          "Nueva publicación",
          `
            <label class="field" for="posttitle">
              Número o nombre de la clase
            </label>

            <input
              id="posttitle"
              class="target"
              placeholder="Ejemplo: Clase 1 · Introducción"
            >

            <label class="field" for="postbody">
              Mensaje
            </label>

            <textarea
              id="postbody"
              placeholder="Agrega el enlace de la grabación"
            ></textarea>

            <div class="actions">
              ${button("Pegar vínculo", "paste", "")}
              ${button("Publicar", "publish", "primary")}
            </div>
          `
        );

    case 5:
      return heading("General · " + escapeHTML(course)) + `
        <article class="post">
          <span class="muted">Docente · Ahora</span>

          <h3>${escapeHTML(postTitle)}</h3>

          <p class="post-message">${escapeHTML(postBody)}</p>

          <span class="badge">
            Vínculo de práctica
          </span>
        </article>
      ` + success("Grabación publicada");
  }
}

// AUDIO DE CADA PASO


const audiosPorTutorial = [
  [
    "Recursos/Recursos_Teams/Audios/Vamos a crear tu equipo en Microsoft Teams.mp3",
    "Recursos/Recursos_Teams/Audios/selecciona.mp3",
    "Recursos/Recursos_Teams/Audios/sin_abreviaturas.mp3",
    "Recursos/Recursos_Teams/Audios/equipo_04.mp3",
    "Recursos/Recursos_Teams/Audios/equipo_05.mp3"
  ],
  [
    "Recursos/Recursos_Teams/Audios/Programar_reunion01.mp3",
    "Recursos/Recursos_Teams/Audios/Coloca_SesionesSincronicas.mp3",
    "Recursos/Recursos_Teams/Audios/Programa_los_3Sab.mp3",
    "Recursos/Recursos_Teams/Audios/Respeta_Horarios.mp3"
  ],
  [
    "Recursos/Recursos_Teams/Audios/Publica_grabacion01.mp3",
    "Recursos/Recursos_Teams/Audios/Publica_grabacion02.mp3",
    "Recursos/Recursos_Teams/Audios/Publica_grabacion03.mp3",
    "Recursos/Recursos_Teams/Audios/Publica_grabacion04.mp3",
    "Recursos/Recursos_Teams/Audios/Publica_grabacion05.mp3"
  ]
];

const vozTutorial = new Audio();
vozTutorial.preload = "metadata";

let audioActivado = false;
let audioSilenciado = false;
let solicitudAudio = 0;
let audioEnCurso = false;

const controlesBloqueados = new Map();

const selectorControlesAudio = [
  "#screen button",
  "#screen select",
  "[data-chapter]",
  "#back",
  "#reset",
  "#repetir-audio"
].join(", ");

function bloquearAccionesDuranteAudio() {
  audioEnCurso = true;

  document.querySelectorAll(selectorControlesAudio)
    .forEach(control => {
      // Recordar cuáles ya estaban deshabilitados.
      if (!controlesBloqueados.has(control)) {
        controlesBloqueados.set(control, control.disabled);
      }

      control.disabled = true;
      control.classList.add("bloqueado-por-audio");
    });
}

function desbloquearAccionesDelAudio() {
  audioEnCurso = false;

  controlesBloqueados.forEach((estabaDeshabilitado, control) => {
    control.disabled = estabaDeshabilitado;
    control.classList.remove("bloqueado-por-audio");
  });

  controlesBloqueados.clear();
}

// Protección adicional para los eventos de la práctica.
document.addEventListener("click", event => {
  if (!audioEnCurso) return;
  if (!(event.target instanceof Element)) return;

  const control = event.target.closest(selectorControlesAudio);
  if (!control) return;

  event.preventDefault();
  event.stopImmediatePropagation();
}, true);

document.addEventListener("change", event => {
  if (!audioEnCurso) return;

  if (event.target.id === "periodicidad") {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}, true);

function mostrarErrorDeAudio() {
  desbloquearAccionesDelAudio();

  document.getElementById("estado-audio").textContent =
    "No se pudo reproducir el audio. Puedes continuar o pulsar Repetir audio.";
}

vozTutorial.addEventListener("ended", () => {
  desbloquearAccionesDelAudio();

  document.getElementById("estado-audio").textContent =
    "Explicación terminada. Ya puedes realizar la acción.";
});

vozTutorial.addEventListener("error", () => {
  if (audioEnCurso) mostrarErrorDeAudio();
});

function reproducirAudioDelPaso() {
  const solicitudActual = ++solicitudAudio;

  desbloquearAccionesDelAudio();

  vozTutorial.pause();
  vozTutorial.removeAttribute("src");
  vozTutorial.load();

  const ruta = audiosPorTutorial[chapter]?.[step];
  const estado = document.getElementById("estado-audio");
  const repetir = document.getElementById("repetir-audio");

  repetir.disabled = !audioActivado || !ruta;
  estado.textContent = "";

  if (!audioActivado) return;

  if (!ruta) {
    estado.textContent = "Este paso todavía no tiene audio.";
    return;
  }

  vozTutorial.src = ruta;
  vozTutorial.muted = audioSilenciado;

  // Bloquear desde que empieza a cargar, sin esperar a que suene.
  bloquearAccionesDuranteAudio();

  estado.textContent =
    "Espera a que termine la explicación para realizar la acción.";

  vozTutorial.play().catch(() => {
    if (solicitudActual !== solicitudAudio) return;
    mostrarErrorDeAudio();
  });
}

document.getElementById("iniciar-audio")
  .addEventListener("click", () => {
    audioActivado = true;
    audioSilenciado = false;

    document.getElementById("iniciar-audio").hidden = true;

    const silenciar = document.getElementById("silenciar-audio");
    silenciar.disabled = false;
    silenciar.textContent = "Silenciar";
    silenciar.setAttribute("aria-pressed", "false");

    reproducirAudioDelPaso();
  });

document.getElementById("repetir-audio")
  .addEventListener("click", () => {
    if (audioEnCurso) return;
    reproducirAudioDelPaso();
  });

document.getElementById("silenciar-audio")
  .addEventListener("click", () => {
    audioSilenciado = !audioSilenciado;

    // Cambiar el sonido sin detener ni reiniciar la explicación.
    vozTutorial.muted = audioSilenciado;

    const boton = document.getElementById("silenciar-audio");

    boton.textContent = audioSilenciado
      ? "Activar audio"
      : "Silenciar";

    boton.setAttribute(
      "aria-pressed",
      String(audioSilenciado)
    );
  });// ACTUALIZAR LA PANTALLA Y LAS INSTRUCCIONES


function render() {
  document.querySelectorAll("[data-chapter]")
    .forEach((tab, index) => {
      const active = index === chapter;

      tab.classList.toggle("active", active);

      tab.setAttribute(
        "aria-current",
        active ? "step" : "false"
      );
    });

  const currentGuide = guides[chapter];
  const currentStep = currentGuide[step];

  $("counter").textContent =
    `PASO ${step + 1} DE ${currentGuide.length}`;

  $("instruction").textContent = currentStep[0];
  $("explanation").textContent = currentStep[1];

  $("bar").style.width =
    `${((step + 1) / currentGuide.length) * 100}%`;

  $("back").disabled = step === 0;

  const calendarActive = chapter === 1;

  $("rail-calendar").classList.toggle(
    "rail-activo",
    calendarActive
  );

  $("rail-teams").classList.toggle(
    "rail-activo",
    !calendarActive
  );

  let html = "";

  if (chapter === 0) {
    html = renderTeamCreation();
  }

  if (chapter === 1) {
    html = renderMeetingSchedule();
  }

  if (chapter === 2) {
    html = renderRecordingPublication();
  }

  $("screen").innerHTML = html;
  reproducirAudioDelPaso();
}

function showError(message) {
  const errorBox = $("error");

  if (!errorBox) return;

  errorBox.textContent = message;

  // Llevar el error a la vista en el formulario de reunión.
  if (errorBox.classList.contains("reunion-error")) {
    errorBox.focus({ preventScroll: true });

    errorBox.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}

function advance() {
  if (step < guides[chapter].length - 1) {
    step++;
    render();
  }
}

// CLICS Y VALIDACIONES

document.addEventListener("click", function (event) {
  const clickedButton = event.target.closest("button");

  if (!clickedButton) return;

  // Cambiar de tutorial.
  if (clickedButton.dataset.chapter !== undefined) {
    chapter = Number(clickedButton.dataset.chapter);
    step = 0;
    render();
    return;
  }

  const action = clickedButton.dataset.action;

  switch (action) {
    case "advance":
      advance();
      break;

    case "wrong":
      showError(
        "Para este recorrido, selecciona el tipo Clase."
      );
      break;

    case "create": {
      const name = $("course").value.trim();

      if (name.length < 8) {
        showError(
          "Escribe el nombre completo del curso, sin abreviaturas."
        );
        return;
      }

      course = name;
      advance();
      break;
    }

    case "meeting": {
      const title = $("meeting").value.trim()
        .toLocaleLowerCase();

      if (title !== "sesiones sincrónicas") {
        showError(
          "Escribe Sesiones sincrónicas, con ese nombre."
        );
        return;
      }

      advance();
      break;
    }

    case "dates": {
      const correctDates =
        $("startdate").value === "2026-10-10" &&
        $("enddate").value === "2026-10-24";

      const correctTimes =
        $("starttime").value === "14:00" &&
        $("endtime").value === "15:30";

      const correctRepeat =
        $("repeat").value === "weekly";

      if (!correctDates || !correctTimes || !correctRepeat) {
        showError(
          "En esta práctica usa los sábados del 10 al 24 de octubre, repetición semanal y horario 14:00–15:30."
        );
        return;
      }

      advance();
      break;
    }

    case "paste": {
      const message = $("postbody").value.trim();

      if (!message.includes(practiceLink)) {
        $("postbody").value =
          `${message}\n${practiceLink}`.trim();
      }

      break;
    }

    case "publish": {
      const title = $("posttitle").value.trim();
      const message = $("postbody").value.trim();

      if (!title || !message.includes(practiceLink)) {
        showError(
          "Agrega el número o nombre de la clase y pega el vínculo de práctica."
        );
        return;
      }

      postTitle = title;
      postBody = message;

      advance();
      break;
    }

    case "next":
      if (chapter < guides.length - 1) {
        chapter++;
        step = 0;
        render();
      }
      break;

    case "first":
      chapter = 0;
      step = 0;
      render();
      break;
  }
});

// PASO ANTERIOR

$("back").addEventListener("click", function () {
  if (step > 0) {
    step--;
    render();
  }
});

// REINICIAR EL TUTORIAL ACTUAL

$("reset").addEventListener("click", function () {
  step = 0;
  render();
});

// MOSTRAR LA PRIMERA PANTALLA

// ACCESO DIRECTO AL BOTÓN DE PERIODICIDAD

document.addEventListener("click", event => {
  const boton = event.target.closest(
    '[data-scroll="periodicidad"]'
  );

  if (!boton || audioEnCurso) return;

  const destino = document.querySelector(
    '[data-action="preparar-periodicidad"]'
  );

  if (!destino) return;

  destino.focus({ preventScroll: true });

  destino.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

render();
