# La Casa del Perfume

Catálogo de perfumes para Android. Cada cambio en `main` compila el APK automáticamente (pestaña **Actions**) y lo publica en **Releases → app → LaCasaDelPerfume.apk**.

- La app web vive en `app/src/main/assets/www/` (index.html, catalog.js, fotos en `assets/cat/`).
- `tools/fetch_vendor.py` descarga React, Lucide y las fuentes para que funcione sin internet.
