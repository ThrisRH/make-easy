# TICKET-04: Bulk PDF Export

## Goal
Export all configured certificates into a single multi-page PDF document.

## Tasks
1. Integrate a PDF generation library (e.g., `jspdf` combined with `html2canvas` or drawing directly to PDF canvas).
2. Loop through all student certificates and render each on a separate page of the PDF.
3. Save/Download the compiled PDF file to the user's system (using Tauri's dialog to choose save path, or auto-download).
