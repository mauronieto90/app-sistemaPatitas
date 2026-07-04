/* =========================================================================
   ICONOS SVG — dibujos "más acordes al tema" para conceptos que el emoji
   no representa bien (partes de la planta, órganos del sistema digestivo…).
   Se usan en los datos escribiendo la imagen como  "svg:nombre"
   (por ejemplo  b:"svg:root"  en un par de emparejar).
   Son SVG en línea: livianos, nítidos y funcionan sin internet.
   ========================================================================= */
window.OWEN_ICONS = {
  // ---- Partes de la planta ----
  root:
    '<svg viewBox="0 0 64 64" role="img" aria-label="root">' +
    '<rect x="0" y="0" width="64" height="26" rx="4" fill="#CDE8FF"/>' +
    '<rect x="0" y="26" width="64" height="38" rx="4" fill="#E7C9A0"/>' +
    '<path d="M32 6v22" stroke="#3FA34D" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M24 12c4 3 6 6 8 10M40 12c-4 3-6 6-8 10" stroke="#3FA34D" stroke-width="4" fill="none" stroke-linecap="round"/>' +
    '<path d="M32 28c0 8-1 16 0 30M32 34c-6 4-10 8-13 16M32 38c6 4 11 7 14 18M32 44c-3 3-5 6-6 12M32 46c4 3 6 6 8 12" ' +
    'stroke="#B9752E" stroke-width="3.4" fill="none" stroke-linecap="round"/>' +
    '</svg>',
  stem:
    '<svg viewBox="0 0 64 64" role="img" aria-label="stem">' +
    '<path d="M32 60V14" stroke="#3FA34D" stroke-width="7" stroke-linecap="round"/>' +
    '<path d="M32 30c-9 0-15-5-17-11 8-1 15 2 17 8" fill="#57C15E"/>' +
    '<path d="M32 42c9 0 15-5 17-11-8-1-15 2-17 8" fill="#57C15E"/>' +
    '<circle cx="32" cy="12" r="7" fill="#F5A9C7"/>' +
    '</svg>',

  // ---- Sistema digestivo ----
  esophagus:
    '<svg viewBox="0 0 64 64" role="img" aria-label="esophagus">' +
    '<path d="M32 6v52" stroke="#E88AA6" stroke-width="12" fill="none" stroke-linecap="round"/>' +
    '<path d="M32 6v52" stroke="#F6C6D5" stroke-width="5" fill="none" stroke-linecap="round"/>' +
    '<path d="M20 18h24M20 32h24M20 46h24" stroke="#D46A88" stroke-width="2.5" stroke-linecap="round"/>' +
    '</svg>',
  stomach:
    '<svg viewBox="0 0 64 64" role="img" aria-label="stomach">' +
    '<path d="M28 6v12c-10 2-16 10-16 22 0 12 9 20 20 20 12 0 18-8 18-16 0-7-4-12-12-13 3-6 1-13-4-16" ' +
    'fill="#F2A7A0" stroke="#D46A6A" stroke-width="2.5" stroke-linejoin="round"/>' +
    '</svg>',
  intestineSmall:
    '<svg viewBox="0 0 64 64" role="img" aria-label="small intestine">' +
    '<path d="M14 12c8 0 8 8 0 8s-8 8 0 8 8 8 0 8 8 8 0 8M30 12c8 0 8 8 0 8s-8 8 0 8 8 8 0 8 8 8 0 8M46 12c8 0 8 8 0 8s-8 8 0 8 8 8 0 8 8 8 0 8" ' +
    'fill="none" stroke="#F0B27A" stroke-width="5" stroke-linecap="round"/>' +
    '</svg>',
  intestineLarge:
    '<svg viewBox="0 0 64 64" role="img" aria-label="large intestine">' +
    '<path d="M14 54V20a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v34" fill="none" stroke="#E8A0A0" stroke-width="9" stroke-linecap="round"/>' +
    '<path d="M14 54V20a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v34" fill="none" stroke="#F6C9C9" stroke-width="3.5" stroke-linecap="round"/>' +
    '</svg>'
};
