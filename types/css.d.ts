// TypeScript 7 reports TS2882 for side-effect imports it cannot resolve to a
// module or type declaration, which `import "./globals.css"` in app/layout.tsx
// triggers. Next ships a declaration for `*.module.css` but not for plain
// stylesheet imports, so declare them here.
declare module "*.css";
