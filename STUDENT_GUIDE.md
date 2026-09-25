# Games Programming Portfolio: Student Guide

This is a template for a one-page games programming portfolio. It is plain HTML, CSS and a little JavaScript,
with no build step and no framework. Fork it, rename the repo to `<your-username>.github.io`, and it's live.

## Files

| File | What to change |
| --- | --- |
| `index.html` | All your content. Sections are marked with `EDIT` comments. |
| `css/portfolio.css` | Only the tokens at the top, if you want. `--accent` re-colours the whole site. |
| `js/portfolio.js` | Nothing. It plays videos while they're on screen, adds pause buttons, and highlights code. |
| `Content/` | Your images, videos, posters, CV and WebGL builds. |

## What recruiters look for, in order

1. **Who you are and what you want**, in the first screen. Name, a specific role ("Gameplay Programmer",
   not "Game Developer"), and when you're available.
2. **Something they can play or watch** within one click. A WebGL build or a 20–30 second clip beats any description.
3. **Your part in it.** For every project, say what *you* built. Team projects are fine; vague ones aren't.
4. **Code.** A short snippet you can explain, plus a link to the repo. Make sure the repo has a README.
5. **A way to contact you** and a CV to download.

## Writing a project card

Replace the example text with your own, following this pattern:

- **One-line hook:** what the project *is*, in plain words.
- **2–3 bullets:** things you built, starting with a verb. Name the system or class involved.
- **Numbers where you have them:** "38 ms → 6 ms", "60 fps on WebGL", "2-week solo project".
- **Tags:** engine, language, and one or two techniques.

> ✗ "Worked on the player and some AI stuff."
> ✓ "Built a behaviour-tree enemy that flanks the player using EQS cover queries."

The example project text in `index.html` shows the style. It is sample copy, so replace it with what you actually did.

## Media checklist

- Videos: 10–30 s, muted, no audio track, H.264 MP4, under ~3 MB each.
  With ffmpeg: `ffmpeg -i in.mp4 -an -c:v libx264 -crf 26 -movflags +faststart out.mp4`
- Give every video a `poster` image (one frame saved as a JPG) so the page looks right before it loads.
- Screenshots: resize to 1280 px wide and save as JPG or WebP. A 2 MB PNG thumbnail slows everything down.
- Write `alt` text that describes what is on screen.
- Don't use a screenshot of your IDE as a code sample. Paste the code into the code block instead.

## Before you share the link

- [ ] No lorem ipsum, `you@example.com`, or `your-profile` placeholders left
- [ ] Every "Source" link goes to a public repo with a README and build instructions
- [ ] `Content/CV.pdf` is your real CV
- [ ] Checked on a phone
- [ ] Pasted the link into Discord or LinkedIn to check the preview looks right (`og:` tags in the `<head>`)
