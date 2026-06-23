# DBF Charlotte Website

This folder is the local working copy for the DBF Charlotte website.

## Recommended setup

Use **VS Code + Codex together**:

- VS Code is best for browsing files, dragging in images/videos, and using a live preview.
- Codex is best for making code changes, replacing sections, cleaning up layout, and explaining what changed.

## Live preview

The easiest beginner workflow is the VS Code **Live Server** extension.

1. Open this folder in VS Code:
   `C:\Users\ryanm\Documents\dbf website`
2. Install the VS Code extension named **Live Server** by Ritwick Dey.
3. Right-click `index.html`.
4. Choose **Open with Live Server**.
5. Edit and save `index.html`; the browser refreshes automatically.

This project also includes a tiny built-in preview server:

Double-click:

```text
start-preview.bat
```

Or run:

```powershell
"C:\Users\ryanm\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" dev-server.js
```

Then open:

```text
http://127.0.0.1:5500
```

The page reloads automatically when files in this folder change.

## Images and videos

Put your files here:

- Images: `assets/images/`
- Videos: `assets/videos/`

Then reference them from `index.html` like this:

```html
<img src="assets/images/team-photo.jpg" alt="DBF team in the workshop">
```

```html
<video controls src="assets/videos/flight-test.mp4"></video>
```

## Publishing

After previewing locally:

1. Save your changes.
2. Commit and push them to the GitHub repository that hosts the site.
3. GitHub Pages or Cloudflare Pages should deploy the update, depending on how the domain is connected.
4. Cloudflare DNS should keep pointing `dbfcharlotte.org` at the GitHub/Pages host.

## Beginner notes

- Keep image filenames simple: `team-photo.jpg`, `aircraft-wing.jpg`, `flight-test.mp4`.
- Avoid spaces in filenames.
- Use compressed images when possible so the website loads quickly.
- Videos can get large; for big videos, consider embedding YouTube/Vimeo instead of uploading the file directly.
