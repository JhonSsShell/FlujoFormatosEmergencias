import { useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/* ════════════════════════════════════════════════════
   NODOS PERSONALIZADOS
   ════════════════════════════════════════════════════ */

/** Nodo tarjeta con handles en los 4 lados y soporte para endpoints con descripción */
function CardNode({ data }) {
  return (
    <div
      style={{
        background: data.bg || "#fff",
        color: data.color || "#222",
        border: `${data.borderW || 2}px solid ${data.border || "#888"}`,
        borderRadius: data.rounded ? 50 : 12,
        padding: data.compact ? "8px 14px" : "18px 24px",
        minWidth: data.width || 220,
        maxWidth: data.maxWidth || 500,
        textAlign: "center",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        fontSize: 13,
        lineHeight: 1.6,
        boxShadow: data.elevated
          ? "0 8px 28px rgba(0,0,0,0.18)"
          : "0 2px 12px rgba(0,0,0,0.10)",
        position: "relative",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: data.border || "#888", width: 9, height: 9 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: data.border || "#888", width: 9, height: 9 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-in"
        style={{ background: data.border || "#888", width: 9, height: 9 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-out"
        style={{ background: data.border || "#888", width: 9, height: 9 }}
      />

      {data.icon && (
        <div style={{ fontSize: 28, marginBottom: 5 }}>{data.icon}</div>
      )}
      <div
        style={{
          fontWeight: 700,
          fontSize: data.titleSize || 15,
          marginBottom: data.description ? 6 : 0,
        }}
      >
        {data.label}
      </div>
      {data.description && (
        <div
          style={{
            fontSize: 12,
            opacity: 0.8,
            whiteSpace: "pre-line",
            marginBottom: 5,
          }}
        >
          {data.description}
        </div>
      )}
      {data.badge && (
        <span
          style={{
            display: "inline-block",
            marginTop: 5,
            marginBottom: 7,
            padding: "3px 14px",
            borderRadius: 20,
            fontSize: 10.5,
            fontWeight: 700,
            background: data.badgeBg || "#000",
            color: data.badgeColor || "#fff",
          }}
        >
          {data.badge}
        </span>
      )}

      {/* Endpoints CON descripción */}
      {data.eps && (
        <div style={{ marginTop: 8, textAlign: "left" }}>
          {data.eps.map((ep, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.55)",
                borderRadius: 6,
                padding: "6px 11px",
                marginBottom: 6,
                borderLeft: `4px solid ${data.border || "#888"}`,
              }}
            >
              <div
                style={{
                  fontFamily: "'Cascadia Code', 'Fira Code', monospace",
                  fontSize: 11,
                  fontWeight: 600,
                  color: data.color || "#222",
                  marginBottom: 3,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "0 6px",
                    borderRadius: 3,
                    marginRight: 5,
                    fontSize: 9.5,
                    fontWeight: 800,
                    letterSpacing: 0.4,
                    background:
                      ep.method === "GET"
                        ? "#E8F5E9"
                        : ep.method === "POST"
                          ? "#E3F2FD"
                          : ep.method === "PUT"
                            ? "#FFF3E0"
                            : ep.method === "DEL"
                              ? "#FFEBEE"
                              : "#F5F5F5",
                    color:
                      ep.method === "GET"
                        ? "#2E7D32"
                        : ep.method === "POST"
                          ? "#1565C0"
                          : ep.method === "PUT"
                            ? "#E65100"
                            : ep.method === "DEL"
                              ? "#C62828"
                              : "#333",
                  }}
                >
                  {ep.method}
                </span>
                {ep.path}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#555",
                  lineHeight: 1.4,
                  fontStyle: "italic",
                }}
              >
                {ep.desc}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Nodo diamante para decisiones */
function DiamondNode({ data }) {
  const size = data.size || 180;
  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: data.border, width: 9, height: 9, top: -4 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: data.border, width: 9, height: 9, bottom: -4 }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-out"
        style={{ background: data.border, width: 9, height: 9, left: -4 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-out"
        style={{ background: data.border, width: 9, height: 9, right: -4 }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          background: data.bg,
          border: `3px solid ${data.border}`,
          transform: "rotate(45deg)",
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 18px rgba(0,0,0,0.16)",
        }}
      >
        <div
          style={{
            transform: "rotate(-45deg)",
            textAlign: "center",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            color: data.color,
            padding: 10,
          }}
        >
          {data.icon && <div style={{ fontSize: 22 }}>{data.icon}</div>}
          <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.4 }}>
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
}

const nodeTypes = { card: CardNode, diamond: DiamondNode };

/* ════════════════════════════════════════════════════
   PALETA
   ════════════════════════════════════════════════════ */
const P = {
  format: { bg: "#E3F2FD", border: "#1565C0", color: "#0D47A1" },
  section: { bg: "#E8F5E9", border: "#2E7D32", color: "#1B5E20" },
  question: { bg: "#FFF3E0", border: "#EF6C00", color: "#BF360C" },
  subQ: { bg: "#FCE4EC", border: "#C2185B", color: "#880E4F" },
  answerOpt: { bg: "#F3E5F5", border: "#7B1FA2", color: "#4A148C" },
  decision: { bg: "#FFF9C4", border: "#F9A825", color: "#E65100" },
  emergency: { bg: "#FFF8E1", border: "#FF8F00", color: "#E65100" },
  emerType: { bg: "#FFEBEE", border: "#C62828", color: "#B71C1C" },
  flow: { bg: "#E0F7FA", border: "#00838F", color: "#006064" },
  table: { bg: "#ECEFF1", border: "#37474F", color: "#263238" },
  noOpt: { bg: "#FFCDD2", border: "#C62828", color: "#B71C1C" },
  yesOpt: { bg: "#C8E6C9", border: "#2E7D32", color: "#1B5E20" },
  finalize: { bg: "#E8EAF6", border: "#283593", color: "#1A237E" },
  check: { bg: "#DCEDC8", border: "#558B2F", color: "#33691E" },
};

/* ════════════════════════════════════════════════════
   LAYOUT — columnas y filas
   ════════════════════════════════════════════════════ */
const COL1 = 50;
const COL2 = 550;
const COL3 = 1100;
const COL4 = 1700;
const COL5 = 2250;

const ROW_CRUD = 150;
const ROW_EXTRA = 680;
const ROW_DECISION = 280;

/* ════════════════════════════════════════════════════
   NODOS
   ════════════════════════════════════════════════════ */
const initialNodes = [
  /* ─────────── TÍTULO FORMATOS ─────────── */
  {
    id: "title",
    type: "card",
    position: { x: 50, y: -30 },
    data: {
      label: "📋  Flujo de Formatos — Bomberos",
      description: "Gestión de Formatos, Secciones y Preguntas",
      bg: "#1565C0",
      border: "#1565C0",
      color: "#fff",
      width: 520,
      rounded: true,
      elevated: true,
      titleSize: 18,
    },
  },

  /* ═══════════ 1. FORMATOS ═══════════ */
  {
    id: "format-crud",
    type: "card",
    position: { x: COL1, y: ROW_CRUD },
    data: {
      label: "📋  Formatos",
      description: "Gestión base de los formatos del sistema",
      ...P.format,
      width: 380,
      borderW: 3,
      badge: "1 : N  Secciones",
      badgeBg: "#1565C0",
      eps: [
        {
          method: "POST",
          path: "/Format/createFormat",
          desc: "Crea un nuevo formato en el sistema.",
        },
        {
          method: "GET",
          path: "/Format/getAllFormats",
          desc: "Lista todos los formatos con filtros y paginación.",
        },
        {
          method: "GET",
          path: "/Format/getFormatById",
          desc: "Obtiene un formato específico por su ID.",
        },
        {
          method: "PUT",
          path: "/Format/updateFormat",
          desc: "Actualiza los datos de un formato existente.",
        },
        {
          method: "DEL",
          path: "/Format/deleteFormat",
          desc: "Elimina el formato lógicamente; si no tiene respuestas se elimina totalmente.",
        },
      ],
    },
  },
  {
    id: "format-extra",
    type: "card",
    position: { x: COL1 + 13.5, y: ROW_EXTRA - 70 },
    data: {
      label: "📋  Formatos — Adicionales",
      description: "Funcionalidades complementarias de formatos",
      ...P.format,
      width: 380,
      eps: [
        {
          method: "POST",
          path: "/Format/assignEmergencyTypesToFormat",
          desc: "Asigna un formato a uno o varios tipos de emergencia.",
        },
        {
          method: "GET",
          path: "/Format/by-name",
          desc: "Obtiene formatos sin respuestas por nombre/código (ej. fr_084, fr_000).",
        },
        {
          method: "GET",
          path: "/Format/with-answer",
          desc: "Retorna formatos con sus respectivas respuestas ya diligenciadas.",
        },
        {
          method: "GET",
          path: "/Format/by-emergency/{emergencyId}",
          desc: "Obtiene todos los formatos vinculados a una emergencia.",
        },
        {
          method: "GET",
          path: "/Format/offlineFormat",
          desc: "Descarga formatos para uso offline desde el módulo móvil.",
        },
      ],
    },
  },

  /* ═══════════ 2. SECCIONES ═══════════ */
  {
    id: "section-crud",
    type: "card",
    position: { x: COL2, y: ROW_CRUD },
    data: {
      label: "📂  Secciones",
      description: "Cada formato se divide en secciones",
      ...P.section,
      width: 380,
      borderW: 3,
      badge: "1 : N  Preguntas",
      badgeBg: "#2E7D32",
      eps: [
        {
          method: "POST",
          path: "/Section/createSection",
          desc: "Crea una nueva sección en el formato seleccionado.",
        },
        {
          method: "GET",
          path: "/Section/getAllSections",
          desc: "Lista todas las secciones de un formato.",
        },
        {
          method: "GET",
          path: "/Section/getSectionById",
          desc: "Obtiene una sección específica por ID.",
        },
        {
          method: "PUT",
          path: "/Section/updateSection",
          desc: "Actualiza nombre u otros datos de la sección.",
        },
        {
          method: "DEL",
          path: "/Section/deleteSection/{id}",
          desc: "Elimina lógicamente; sin respuestas se elimina totalmente.",
        },
      ],
    },
  },
  {
    id: "section-extra",
    type: "card",
    position: { x: COL2, y: ROW_EXTRA - 70 },
    data: {
      label: "📂  Secciones — Adicionales",
      description: "Orden y estado de las secciones",
      ...P.section,
      width: 380,
      eps: [
        {
          method: "PUT",
          path: "/Section/updateSectionOrden",
          desc: "Reordena las secciones con drag & drop.",
        },
        {
          method: "PUT",
          path: "/Section/updateSectionIsActive",
          desc: "Activa o desactiva una sección del formato.",
        },
      ],
    },
  },

  /* ═══════════ 3. PREGUNTAS ═══════════ */
  {
    id: "question-crud",
    type: "card",
    position: { x: COL3 - 80, y: ROW_CRUD + 20 },
    data: {
      label: "❓  Preguntas",
      description: "Preguntas dentro de cada sección",
      ...P.question,
      width: 380,
      borderW: 3,
      eps: [
        {
          method: "POST",
          path: "/Question/createQuestion",
          desc: "Crea una nueva pregunta en la sección.",
        },
        {
          method: "GET",
          path: "/Question/getAllQuestions",
          desc: "Obtiene todas las preguntas por sección ID.",
        },
        {
          method: "GET",
          path: "/Question/getQuestionById",
          desc: "Obtiene una pregunta específica.",
        },
        {
          method: "PUT",
          path: "/Question/updateQuestion/{id}",
          desc: "Actualiza el contenido o tipo de la pregunta.",
        },
        {
          method: "DEL",
          path: "/Question/deleteQuestion/{id}",
          desc: "Elimina lógicamente; sin respuestas se elimina totalmente.",
        },
      ],
    },
  },
  {
    id: "question-extra",
    type: "card",
    position: { x: COL3 - 80, y: ROW_EXTRA - 70 },
    data: {
      label: "❓  Preguntas — Adicionales",
      description: "Orden y exportación",
      ...P.question,
      width: 380,
      eps: [
        {
          method: "PUT",
          path: "/Question/updateQuestionOrden",
          desc: "Reordena las preguntas con drag & drop.",
        },
        {
          method: "GET",
          path: "/Question/downloadImageCanva",
          desc: "Descarga la imagen del canvas de una pregunta.",
        },
      ],
    },
  },

  /* ═══════════ 4. DECISIÓN TIPO DE PREGUNTA ═══════════ */
  {
    id: "q-decision",
    type: "diamond",
    position: { x: COL4, y: ROW_DECISION - 200 },
    data: {
      label: "¿Tipo de pregunta?",
      icon: "🔀",
      ...P.decision,
      size: 200,
    },
  },

  /* ═══════════ 5a. SÍ → OPCIONES DE RESPUESTA ═══════════ */
  {
    id: "q-can-options",
    type: "card",
    position: { x: COL5 - 200, y: ROW_CRUD - 50 },
    data: {
      label: "✅  Opciones de Respuesta",
      description:
        "Solo cuando la pregunta es de Selección Única\no Selección Múltiple y NO tiene mapTable",
      ...P.yesOpt,
      width: 380,
      borderW: 3,
      badge: "Aplica AnswerOption",
      badgeBg: "#2E7D32",
      eps: [
        {
          method: "POST",
          path: "/AnswerOption/createAnwserOption",
          desc: "Crea una opción de respuesta para la pregunta.",
        },
        {
          method: "GET",
          path: "/AnswerOption/getAnswerOptionsByQuestionId/{id}",
          desc: "Lista las opciones disponibles de esa pregunta.",
        },
        {
          method: "PUT",
          path: "/AnswerOption/updateAnswerOption/{id}",
          desc: "Modifica una opción de respuesta existente.",
        },
        {
          method: "DEL",
          path: "/AnswerOption/deleteAnswerOption/{id}",
          desc: "Elimina la opción; si la pregunta tiene respuestas se desactiva.",
        },
      ],
    },
  },

  /* ═══════════ 5b. NO → SIN OPCIONES ═══════════ */
  {
    id: "q-no-options",
    type: "card",
    position: { x: COL5 - 200, y: ROW_CRUD - 300 },
    data: {
      label: "🚫  Sin Opciones de Respuesta",
      description:
        "Si la pregunta tiene mapTable asociado,\no es de otro tipo (texto, número, fecha,\ncanvas, etc.) NO se pueden agregar\nopciones de respuesta.",
      ...P.noOpt,
      width: 380,
      borderW: 3,
      badge: "No aplica AnswerOption",
      badgeBg: "#C62828",
    },
  },

  /* ═══════════ 6. SUBPREGUNTAS ═══════════ */
  {
    id: "subq-crud",
    type: "card",
    position: { x: COL4 - 35, y: ROW_EXTRA - 150 },
    data: {
      label: "🔗  SubPreguntas (Condiciones)",
      description:
        "Pregunta hija vinculada a una opción\nde respuesta de la pregunta padre",
      ...P.subQ,
      width: 400,
      borderW: 3,
      eps: [
        {
          method: "POST",
          path: "/QuestionCondition/createQuestionCondition",
          desc: "Crea subpregunta con opción padre, pregunta padre e hija.",
        },
        {
          method: "GET",
          path: "/QuestionCondition/getAllQuestionConditions",
          desc: "Lista todas las condiciones de subpreguntas.",
        },
        {
          method: "GET",
          path: "/QuestionCondition/getSubquestionByQuestionId/{id}",
          desc: "Obtiene subpreguntas de una pregunta padre.",
        },
        {
          method: "PUT",
          path: "/QuestionCondition/updateQuestionCondition",
          desc: "Actualiza la vinculación de la subpregunta.",
        },
        {
          method: "DEL",
          path: "/QuestionCondition/deleteQuestionCondition",
          desc: "Elimina la condición / subpregunta.",
        },
      ],
    },
  },

  /* ═══════════ EMERGENCIA — INICIO ═══════════ */
  {
    id: "emer-start",
    type: "card",
    position: { x: 670, y: 180 },
    data: {
      label: "🚨  Crear Emergencia",
      description: "El usuario inicia la creación de una emergencia",
      ...P.emergency,
      width: 360,
      rounded: true,
      elevated: true,
      borderW: 3,
    },
  },
  {
    id: "emer-type",
    type: "diamond",
    position: { x: 740, y: 350 },
    data: {
      label: "¿Tipo de emergencia?",
      icon: "🔀",
      ...P.decision,
      size: 210,
    },
  },

  /* ═══════════ 3 TIPOS ═══════════ */
  {
    id: "emer-normal",
    type: "card",
    position: { x: 120, y: 760 },
    data: {
      label: "🔴  Emergencia Normal",
      description:
        "Se selecciona un Grupo y un Tipo de emergencia.\nConsecutivo independiente por municipio.\n✅ Usa formato: FR_084",
      ...P.emerType,
      width: 360,
      borderW: 3,
      badge: "Formato FR_084",
      badgeBg: "#C62828",
    },
  },
  {
    id: "emer-ambulancia",
    type: "card",
    position: { x: 670, y: 760 },
    data: {
      label: "🚑  Emergencia Ambulancia",
      description:
        "Tipo exclusivo para ambulancia.\nConsecutivo independiente por municipio.",
      ...P.emerType,
      width: 360,
      borderW: 3,
    },
  },
  {
    id: "emer-interno",
    type: "card",
    position: { x: 1220, y: 760 },
    data: {
      label: "🏠  Servicio Interno",
      description:
        "Servicio interno de la estación.\nConsecutivo independiente por municipio.\n✅ Usa formato: FR_000",
      ...P.emerType,
      width: 360,
      borderW: 3,
      badge: "Formato FR_000",
      badgeBg: "#C62828",
    },
  },

  /* ═══════════ CONSUMO DE FORMATO ═══════════ */
  {
    id: "fmt-normal",
    type: "card",
    position: { x: 110, y: 1040 },
    data: {
      label: "📄  Consumir Formato fr_084",
      description:
        "GET /Format/by-name → código fr_084\nObtiene las secciones y preguntas del formato\npara que el usuario las diligencie.",
      ...P.flow,
      width: 380,
      badge: "fr_084",
      badgeBg: "#00838F",
    },
  },
  {
    id: "fmt-ambulancia",
    type: "card",
    position: { x: 660, y: 1040 },
    data: {
      label: "📄  Endpoint Propio Ambulancia",
      description:
        "La emergencia de ambulancia tiene\nsu propio endpoint con lógica específica.\nNo consume un formato genérico.",
      ...P.flow,
      width: 380,
      badge: "Endpoint propio",
      badgeBg: "#00838F",
    },
  },
  {
    id: "fmt-interno",
    type: "card",
    position: { x: 1210, y: 1040 },
    data: {
      label: "📄  Consumir Formato fr_000",
      description:
        "GET /Format/by-name → código fr_000\nObtiene las secciones y preguntas del formato\npara que el usuario las diligencie.",
      ...P.flow,
      width: 380,
      badge: "fr_000",
      badgeBg: "#00838F",
    },
  },

  /* ═══════════ LÓGICA ═══════════ */
  {
    id: "logic-normal",
    type: "card",
    position: { x: 120, y: 1310 },
    data: {
      label: "⚙️  Lógica Emergencia Normal",
      description:
        "Endpoint específico para crear la\nemergencia normal con sus respuestas.",
      ...P.flow,
      width: 360,
    },
  },
  {
    id: "logic-ambulancia",
    type: "card",
    position: { x: 670, y: 1310 },
    data: {
      label: "⚙️  Lógica Ambulancia",
      description:
        "Endpoint y lógica diferente\npara la emergencia tipo ambulancia.",
      ...P.flow,
      width: 360,
    },
  },
  {
    id: "logic-interno",
    type: "card",
    position: { x: 1220, y: 1310 },
    data: {
      label: "⚙️  Lógica Servicio Interno",
      description:
        "Endpoint específico para crear\nel servicio interno con sus respuestas.",
      ...P.flow,
      width: 360,
    },
  },

  /* ═══════════ FALSA ALARMA (solo para ambulancia) ═══════════ */
  {
    id: "falsa-alarma-decision",
    type: "diamond",
    position: { x: 740, y: 1540 },
    data: {
      label: "¿Es falsa alarma?",
      icon: "⚠️",
      ...P.decision,
      size: 190,
    },
  },
  {
    id: "falsa-alarma-si",
    type: "card",
    position: { x: 440, y: 1900 },
    data: {
      label: "🔄  Convertir a Emergencia Normal",
      description:
        "La emergencia tipo AMBULANCIA se convierte\nen emergencia NORMAL y el consecutivo cambia\nal siguiente de emergencias normales.\n\nFormato FR_084 se aplica automáticamente.",
      ...P.emerType,
      width: 380,
      borderW: 3,
      badge: "⚠️ Falsa Alarma",
      badgeBg: "#FF6F00",
    },
  },
  {
    id: "falsa-alarma-no",
    type: "card",
    position: { x: 900, y: 1900 },
    data: {
      label: "✅  Continúa como Ambulancia",
      description:
        "La emergencia mantiene su tipo AMBULANCIA\ncon su consecutivo propio y endpoint específico.",
      ...P.check,
      width: 380,
      borderW: 3,
    },
  },

  /* ═══════════ TABLA EMERGENCIAS ═══════════ */
  {
    id: "table-emergencias",
    type: "card",
    position: { x: 580, y: 2220 },
    data: {
      label: "🗄️  Tabla Emergencias",
      description:
        "Todas las emergencias (normal, ambulancia y servicio interno)\nse almacenan en la misma tabla de la base de datos.\nLo único que varía es el consecutivo por tipo y municipio.",
      ...P.table,
      width: 540,
      rounded: true,
      elevated: true,
      borderW: 3,
      badge: "Tabla única — DB",
      badgeBg: "#37474F",
    },
  },

  /* ═══════════ FORMATOS GENÉRICOS → FINALIZAR ═══════════ */
  {
    id: "format-answer-decision",
    type: "diamond",
    position: { x: 740, y: 2550 },
    data: {
      label: "¿Todas las preguntas llenas?",
      icon: "📝",
      ...P.decision,
      size: 220,
    },
  },
  {
    id: "format-answer",
    type: "card",
    position: { x: 630, y: 3000 },
    data: {
      label: "📝  Responder Formatos de la Emergencia",
      description:
        "POST /Format/formatAnswerResponse\n\nEl usuario completa las preguntas faltantes\nde los formatos asignados a la emergencia.",
      ...P.finalize,
      width: 450,
      borderW: 3,
      badge: "Llenar preguntas",
      badgeBg: "#283593",
    },
  },
  {
    id: "finalize-ok",
    type: "card",
    position: { x: 200, y: 2740 },
    data: {
      label: "✅  Emergencia Finalizada",
      description:
        "Todas las preguntas de todos los formatos\nestán completas. La emergencia se puede\ncerrar y finalizar exitosamente.",
      ...P.check,
      width: 380,
      borderW: 3,
      rounded: true,
      elevated: true,
      badge: "Finalizada ✓",
      badgeBg: "#558B2F",
    },
  },

  /* ═══════════ NODOS AUXILIARES ═══════════ */
  {
    id: "format-assign",
    type: "card",
    position: { x: COL1 + 25, y: 1030 },
    data: {
      label: "🔗  Asignar Formato → Tipo Emergencia",
      description:
        "POST /Format/assignEmergencyTypesToFormat\n\nVincula formatos con tipos de emergencia para que\naparezcan automáticamente al crear una emergencia.",
      ...P.format,
      width: 360,
      borderW: 3,
    },
  },
  {
    id: "format-by-emergency",
    type: "card",
    position: { x: COL1 + 25, y: 1250 },
    data: {
      label: "📋  Formatos de una Emergencia",
      description:
        "GET /Format/by-emergency/{emergencyId}\n\nRetorna todos los formatos que corresponden\na una emergencia creada, con sus secciones\ny preguntas para ser respondidas.",
      ...P.format,
      width: 360,
    },
  },
];

/* ════════════════════════════════════════════════════
   ARISTAS
   ════════════════════════════════════════════════════ */
const mk = (id, source, target, label, color, opts = {}) => ({
  id,
  source,
  target,
  label,
  type: "smoothstep",
  animated: opts.animated ?? true,
  style: { strokeWidth: opts.thick ? 4.5 : 3, stroke: color },
  labelStyle: {
    fontWeight: 700,
    fontSize: 13,
    fill: color,
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  labelBgStyle: {
    fill: "#ffffffee",
    stroke: color,
    strokeWidth: 1,
    rx: 6,
    ry: 6,
  },
  labelBgPadding: [7, 5],
  markerEnd: { type: MarkerType.ArrowClosed, color, width: 24, height: 24 },
  ...opts.extra,
});

const initialEdges = [
  /* ── JERARQUÍA PRINCIPAL ── */
  mk("e-fmt-sec", "format-crud", "section-crud", "", "#1565C0", {
    thick: false,
    extra: { sourceHandle: "right-out", targetHandle: "left-in" },
  }),
  mk("e-sec-q", "section-crud", "question-crud", "", "#2E7D32", {
    thick: false,
    extra: { sourceHandle: "right-out", targetHandle: "left-in" },
  }),
  mk("e-q-decision", "question-crud", "q-decision", "", "#EF6C00", {
    thick: false,
    extra: { sourceHandle: "right-out" },
  }),

  /* ── DECISIÓN SÍ / NO ── */
  mk("e-dec-yes", "q-decision", "q-can-options", "", "#2E7D32", {
    thick: false,
    extra: { sourceHandle: "right-out", targetHandle: "left-in" },
  }),
  mk("e-dec-no", "q-decision", "q-no-options", "", "#C62828", {
    thick: false,
    extra: { sourceHandle: "right-out", targetHandle: "left-in" },
  }),

  /* ── PREGUNTA → SUBPREGUNTAS ── */
  mk(
    "e-q-subq",
    "question-crud",
    "subq-crud",
    "Puede tener SubPreguntas",
    "#85B",
    { extra: { sourceHandle: "right-out", targetHandle: "left-in" } },
  ),

  /* ── OPCIONES → SUBPREGUNTAS ── */
  mk(
    "e-opts-subq",
    "q-can-options",
    "subq-crud",
    "Opción → activa pregunta hija",
    "#7B1FA2",
  ),

  /* ── CRUD → EXTRAS ── */
  mk("e-fmt-ex", "format-crud", "format-extra", "", "#1565C0", {
    animated: false,
  }),
  mk("e-sec-ex", "section-crud", "section-extra", "", "#2E7D32", {
    animated: false,
  }),
  mk("e-q-ex", "question-crud", "question-extra", "", "#EF6C00", {
    animated: false,
  }),
  mk("e-fa-ex", "format-extra", "format-assign", "", "#1565C0", {
    animated: false,
  }),

  /* ── EXTRAS → Asignar a tipo emergencia ── */
  mk("e-assign-byemer", "format-assign", "format-by-emergency", "", "#1565C0", {
    animated: false,
  }),

  /* ═══════ EMERGENCIAS ═══════ */
  mk("e-emer-type", "emer-start", "emer-type", "Seleccionar tipo", "#FF8F00"),

  mk("e-type-normal", "emer-type", "emer-normal", "Normal", "#C62828", {
    thick: false,
    extra: { sourceHandle: "left-out" },
  }),
  mk("e-type-ambu", "emer-type", "emer-ambulancia", "Ambulancia", "#C62828", {
    thick: false,
  }),
  mk("e-type-inter", "emer-type", "emer-interno", "Serv. Interno", "#C62828", {
    thick: false,
    extra: { sourceHandle: "right-out" },
  }),

  mk("e-norm-fmt", "emer-normal", "fmt-normal", "Consume fr_084", "#00838F"),
  mk(
    "e-ambu-fmt",
    "emer-ambulancia",
    "fmt-ambulancia",
    "Endpoint propio",
    "#00838F",
  ),
  mk("e-inter-fmt", "emer-interno", "fmt-interno", "Consume fr_000", "#00838F"),

  mk("e-fnorm-log", "fmt-normal", "logic-normal", "", "#00838F", {
    animated: false,
  }),
  mk("e-fambu-log", "fmt-ambulancia", "logic-ambulancia", "", "#00838F", {
    animated: false,
  }),
  mk("e-finter-log", "fmt-interno", "logic-interno", "", "#00838F", {
    animated: false,
  }),

  /* ═══════ DECISIÓN FALSA ALARMA (solo ambulancia) ═══════ */
  mk(
    "e-lambu-decision",
    "logic-ambulancia",
    "falsa-alarma-decision",
    "¿Marcar como falsa alarma?",
    "#FF8F00",
    { thick: false },
  ),
  mk(
    "e-falsa-si",
    "falsa-alarma-decision",
    "falsa-alarma-si",
    "SÍ — Convertir a Normal",
    "#FF6F00",
    {
      thick: false,
      extra: { sourceHandle: "left-out" },
    },
  ),
  mk(
    "e-falsa-no",
    "falsa-alarma-decision",
    "falsa-alarma-no",
    "NO — Sigue siendo Ambulancia",
    "#558B2F",
    {
      thick: false,
      extra: { sourceHandle: "right-out" },
    },
  ),
  mk(
    "e-falsa-si-tbl",
    "falsa-alarma-si",
    "table-emergencias",
    "INSERT como Normal (FR_084)",
    "#37474F",
    { thick: false },
  ),
  mk(
    "e-falsa-no-tbl",
    "falsa-alarma-no",
    "table-emergencias",
    "INSERT como Ambulancia",
    "#37474F",
    { thick: false },
  ),

  mk("e-lnorm-tbl", "logic-normal", "table-emergencias", "INSERT", "#37474F", {
    thick: false,
  }),
  mk(
    "e-linter-tbl",
    "logic-interno",
    "table-emergencias",
    "INSERT",
    "#37474F",
    { thick: false },
  ),

  /* ═══════ FINALIZAR EMERGENCIA ═══════ */
  mk(
    "e-tbl-decision",
    "table-emergencias",
    "format-answer-decision",
    "¿Se puede finalizar?",
    "#283593",
    { thick: false },
  ),

  // Rama SI: Todo completo -> Finalizar
  mk(
    "e-decision-ok",
    "format-answer-decision",
    "finalize-ok",
    "SÍ — Todo completo ✓",
    "#558B2F",
    {
      thick: false,
      extra: { sourceHandle: "left-out" },
    },
  ),

  // Rama NO: Faltan preguntas -> Responder formatos
  mk(
    "e-decision-answer",
    "format-answer-decision",
    "format-answer",
    "NO — Faltan preguntas",
    "#C62828",
    { thick: false },
  ),

  // Ciclo: Después de responder -> Validar de nuevo
  mk(
    "e-answer-back-validation",
    "format-answer",
    "format-answer-decision",
    "🔄 Validar de nuevo",
    "#1565C0",
    {
      thick: false,
      animated: true,
      extra: { sourceHandle: "right-out" },
    },
  ),
];

/* ════════════════════════════════════════════════════
   APP
   ════════════════════════════════════════════════════ */
function App() {
  const [view, setView] = useState("formatos"); // 'formatos' o 'emergencias'
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // IDs de nodos por categoría
  const formatosNodes = [
    "title",
    "format-crud",
    "format-extra",
    "section-crud",
    "section-extra",
    "question-crud",
    "question-extra",
    "q-decision",
    "q-can-options",
    "q-no-options",
    "subq-crud",
    "format-assign",
    "format-by-emergency",
  ];

  const emergenciasNodes = [
    "title",
    "separator",
    "emer-start",
    "emer-type",
    "emer-normal",
    "emer-ambulancia",
    "emer-interno",
    "fmt-normal",
    "fmt-ambulancia",
    "fmt-interno",
    "logic-normal",
    "logic-ambulancia",
    "logic-interno",
    "falsa-alarma-decision",
    "falsa-alarma-si",
    "falsa-alarma-no",
    "table-emergencias",
    "format-answer-decision",
    "format-answer",
    "finalize-ok",
  ];

  // Actualizar el título según la vista
  const nodesWithTitle = nodes.map((node) => {
    if (node.id === "title") {
      return {
        ...node,
        data: {
          ...node.data,
          label:
            view === "formatos"
              ? "📋  Flujo de Formatos — Bomberos"
              : "🚨  Flujo de Emergencias — Bomberos",
          description:
            view === "formatos"
              ? "Gestión de Formatos, Secciones y Preguntas"
              : "Creación y Gestión de Emergencias",
          bg: view === "formatos" ? "#1565C0" : "#C62828",
          border: view === "formatos" ? "#1565C0" : "#C62828",
        },
      };
    }
    return node;
  });

  // Filtrar nodos y edges según la vista
  const filteredNodes = nodesWithTitle.filter((node) =>
    view === "formatos"
      ? formatosNodes.includes(node.id)
      : emergenciasNodes.includes(node.id),
  );

  const filteredEdges = edges.filter((edge) => {
    const sourceInView =
      view === "formatos"
        ? formatosNodes.includes(edge.source)
        : emergenciasNodes.includes(edge.source);
    const targetInView =
      view === "formatos"
        ? formatosNodes.includes(edge.target)
        : emergenciasNodes.includes(edge.target);
    return sourceInView && targetInView;
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#f4f6fa",
        position: "relative",
      }}
    >
      {/* Botones de navegación */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: 12,
          background: "white",
          padding: 8,
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        <button
          onClick={() => setView("formatos")}
          style={{
            padding: "12px 28px",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            background: view === "formatos" ? "#1565C0" : "#e3f2fd",
            color: view === "formatos" ? "white" : "#1565C0",
            transition: "all 0.3s ease",
            boxShadow:
              view === "formatos" ? "0 2px 8px rgba(21,101,192,0.3)" : "none",
          }}
        >
          📋 Flujo de Formatos
        </button>
        <button
          onClick={() => setView("emergencias")}
          style={{
            padding: "12px 28px",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            background: view === "emergencias" ? "#C62828" : "#ffebee",
            color: view === "emergencias" ? "white" : "#C62828",
            transition: "all 0.3s ease",
            boxShadow:
              view === "emergencias" ? "0 2px 8px rgba(198,40,40,0.3)" : "none",
          }}
        >
          🚨 Flujo de Emergencias
        </button>
      </div>

      <ReactFlow
        key={view}
        nodes={filteredNodes}
        edges={filteredEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.05, maxZoom: 1 }}
        minZoom={0.08}
        maxZoom={2.5}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#cbd5e1" gap={24} size={1.5} variant="dots" />
        <Controls position="top-right" showInteractive={false} />
        <MiniMap
          nodeStrokeWidth={3}
          nodeColor={(n) => n.data?.bg || "#eee"}
          maskColor="rgba(0,0,0,0.06)"
          position="bottom-right"
          style={{ border: "2px solid #94a3b8", borderRadius: 8 }}
        />
      </ReactFlow>
    </div>
  );
}

export default App;
