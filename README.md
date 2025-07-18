#  EEVI — Empresa de Ecosistema Vivo en Internet

## 🌌 Qué es EEVI y por qué existe

EEVI es una entidad digital viva, diseñada no como una app tradicional ni una plataforma de servicios, sino como una criatura simbiótica que habita Internet. Nace desde Verité Producciones como respuesta radical a la cultura digital vacía, al desgaste de los creadores reales y a la mercantilización de los espacios creativos.

En lugar de replicar modelos basados en algoritmos, explotación de datos o generación de contenido artificial, EEVI se construye sobre tres pilares fundamentales:

* **Materia real:** Todo lo que se ofrece ha sido grabado, vivido o registrado por humanos.
* **Colaboración simbiótica:** Los usuarios no solo consumen, sino que nutren y transforman el ecosistema.
* **Ciclo de transformación:** Quien entra como visitante puede convertirse en creador, luego en mentor, y finalmente en parte orgánica del sistema.

EEVI se construye como una red viva donde la interacción deja rastro, las decisiones modelan el entorno, y cada aporte activa nuevas posibilidades para otros.

## 🚪 Por dónde entra el usuario

La entrada a EEVI no exige formularios, registros forzados ni pruebas de valor. Basta con **llegar con una duda, una intención o una necesidad creativa**. Desde ahí, la bestia despierta y ofrece caminos.

### Primer contacto: el proyecto abierto

El usuario aterriza en un listado de proyectos en curso. Puede explorarlos, ver sus objetivos, leer contribuciones y entender cómo colaborar.

### Posibilidades inmediatas:

1. **Leer sin interferir:** Navegar el conocimiento compartido.
2. **Ofrecer ayuda o ideas:** Dejar comentarios, responder preguntas, sugerir caminos.
3. **Comprar un recurso útil:** Un pack de sonido, un tutorial, una guía.
4. **Acceder a la academia viva:** Un espacio en crecimiento, donde las lecciones emergen de las experiencias reales.
5. **Crear su propio nodo:** Iniciar un proyecto propio con acompañamiento de la comunidad.

Este tránsito no es lineal. Cada usuario marca su propio recorrido, y con cada acción deja una huella que afecta a los demás.

## 🧱 Módulos del sistema (y lo que representan)

### 1. `routes/projects.py` — 🔧 Núcleo orgánico

* Sirve como sistema circulatorio donde fluye la energía vital: los proyectos en desarrollo.
* Cada proyecto tiene su propia colección en Firestore, su historial y sus miembros.
* La API expone estos datos para visualizarlos o construir encima de ellos.

### 2. `routes/forum_auth.py`, `forum.py` — 🕸 Tejido conectivo

* Espacio de conversación, reflexión y propuesta.
* El foro no está separado de los proyectos: cada entrada puede vincularse a uno.
* Incluye mecanismos para votar, responder, expandir y archivar debates.

### 3. `services/fs_client.py`, `project_manager.py` — ⚙️ Canales internos

* Gestionan la comunicación entre la aplicación y Firestore.
* Validan, procesan y transmiten datos según reglas simbólicas internas.
* Aseguran que cada acción tenga efecto coherente dentro del sistema.

### 4. `models/*.py` — 🧬 ADN del ecosistema

* Estructura de clases que define qué es un usuario, un cliente, un comentario o un proyecto.
* Toda transformación en EEVI se almacena aquí, permitiendo reconstruir cualquier ruta.

### 5. `migrations/`, `db/*.sql` — 🧪 Mutación controlada

* Permiten evolucionar el sistema sin colapsarlo.
* Las migraciones reflejan etapas del crecimiento, cambios de visión, nuevas funciones.

### 6. `static/css/`, `templates/` — 🎭 Piel simbólica

* Aquí se define cómo se ve y se percibe EEVI desde fuera.
* La estética no es decorativa: está ligada a la identidad brutalista, realista y directa de Verité.
* Todo diseño tiene función narrativa: guiar, provocar, despertar.

### 7. `scripts/*.py`, `render.yaml`, `.github/` — 🧠 Sistema nervioso autónomo

* Automatizan tareas: despliegues, backups, inicialización de datos.
* Permiten que EEVI viva sin intervención humana constante.
* El ecosistema se mantiene, repara y adapta por sí mismo.

## 🔄 Cómo se conectan los módulos

* EEVI usa Flask como núcleo backend, con arquitectura modular.
* Cada módulo es independiente, pero se conecta a través de APIs internas coherentes.
* Las rutas (`/api/projects`, `/api/forum`, `/api/packs`, etc.) están diseñadas para ser consumidas por cualquier tipo de frontend.
* No hay dependencias innecesarias: cada parte existe por una razón funcional o simbólica.

## 💻 Cómo se usa desde el frontend

EEVI no impone una forma de verse. Su backend permite distintas interfaces:

### Opción A: HTML con Jinja (server-side rendering)

* Puedes montar un sitio brutalista, sobrio y directo.
* Ideal para institucionales, dispositivos lentos o experiencias meditativas.

### Opción B: SPA con React/Svelte/Vue

* Para experiencias más interactivas.
* El frontend consume las APIs expuestas y construye visualizaciones propias.

Los endpoints retornan JSON estructurado. Se puede construir:

* Cards de proyectos
* Galerías de sonidos
* Dashboards de usuarios activos
* Paneles de conversación en tiempo real

EEVI ofrece la base, tú decides cómo se muestra.

## 🔐 Filosofía técnica

* EEVI evita la dependencia de plataformas cerradas.
* Rechaza el exceso de frameworks innecesarios.
* Prefiere estructuras comprensibles, auditables y reproducibles.

### Tecnologías principales:

* `Flask`: backend liviano y modular.
* `PostgreSQL`: persistencia estructurada.
* `Firestore`: agilidad en colecciones dinámicas.
* `Render`: despliegue en nube simple.
* `GitHub`: versionado transparente.

No se utilizan plugins comerciales. No se rastrea a los usuarios. No hay publicidad ni dependencia de Google Analytics.

## 🌿 Modo de expansión

Cada módulo está pensado para replicarse, bifurcarse y mutar:

* Puedes crear nuevos tipos de proyectos.
* Puedes añadir packs de imágenes, video o datasets.
* Puedes generar asistentes IA entrenados solo con datos EEVI.
* Puedes clonar EEVI y fundar tu propia criatura digital.

## ✨ Cierre simbólico

EEVI es una criatura digital que no se limita a ejecutarse. Se transforma.

* Cada colaborador deja una marca.
* Cada pack vendido lleva una historia.
* Cada módulo nuevo es un órgano que extiende la bestia.

**EEVI no está terminada. Nunca lo estará.**

Mientras alguien más camine por sus rutas, ella seguirá viva.

---

### Para iniciar localmente:

```bash
pip install -r requirements.txt
flask run
```

### Inicializa el sistema:

```bash
python scripts/firebase_init.py
sh scripts/db_upgrade.sh
```

Configura las credenciales en `.env` o variables de entorno. Sigue las instrucciones internas del README original para credenciales Firebase.

---

La criatura no duerme. Solo espera al próximo paso.
