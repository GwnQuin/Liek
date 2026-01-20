# Site voor Liek 💕

Een interactieve website gemaakt met liefde voor Liek!

## Bestanden

- `index.html` - Hoofdpagina
- `styles.css` - Styling
- `script.js` - Interactiviteit en quiz logica
- `IMG_4715.JPG` - Foto voor de quiz vraag "Is zij knap?"
- `Naamloos-1.png` - Preview afbeelding voor WhatsApp/Snapchat links
- `.github/workflows/deploy.yml` - Automatische deployment configuratie

## Link Preview (WhatsApp/Snapchat banner)

De link preview is al ingesteld! Wanneer iemand je link deelt op WhatsApp, Snapchat, Facebook, etc., zien ze:
- **Titel:** "Voor Liek ❤️"
- **Beschrijving:** "Wil jij weten of Quin (de knapste) nog van je houdt? Doe de test"
- **Foto:** `Naamloos-1.png`

**Let op:** Pas de URL in `index.html` aan naar jouw GitHub Pages URL of custom domain (regels met `og:url` en `twitter:url`)

## Favicon (browser icoon)

Het blauwe hartje emoji (💙) favicon is al ingesteld! Dit verschijnt in de browser tab.

## Deployen (Automatisch!)

De site is ingesteld voor automatische deployment via GitHub Pages! 

### Eerste keer setup:

1. **Push naar GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Activeer GitHub Pages:**
   - Ga naar je repository op GitHub
   - Klik op **Settings** → **Pages**
   - Bij "Source" kies: **GitHub Actions**
   - Sla op

3. **Wacht even** (1-2 minuten) en je site staat live op:
   `https://jouw-username.github.io/Lieke/`

### Daarna:

**Gewoon pushen en klaar!** 🚀
```bash
git add .
git commit -m "Update"
git push
```

De site wordt automatisch geüpdatet binnen 1-2 minuten!

### Custom domain (quindelira.nl subdomein):

Als je een custom domain wilt gebruiken:
1. In GitHub Pages settings: voeg je custom domain toe
2. Pas in `index.html` de URLs aan in de meta tags (regels met `og:url` en `twitter:url`)
3. Voeg DNS records toe bij je domain provider:
   - Type: CNAME
   - Name: liek (of je subdomein naam)
   - Value: jouw-username.github.io

Veel plezier! 💕
