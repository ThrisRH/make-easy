# TICKET-01: File and Folder Picker for Student Images

## Goal
Implement a UI control to select a folder containing student images or select individual image files.

## Tasks
1. Add Tauri dialog plugin (`@tauri-apps/plugin-dialog`) or use standard HTML `<input type="file" multiple>` to pick files/folders.
2. Store the list of selected image file paths or blobs in frontend state.
3. Validate that selected files are images (PNG, JPG/JPEG).
