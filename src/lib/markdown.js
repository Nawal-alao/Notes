let marked = null;
let hljs = null;
let markdownReady = false;
let loadingPromise = null;

export async function loadMarkdownLibs() {
  if (markdownReady) return { marked, hljs };
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    const markedModule = await import('https://cdn.jsdelivr.net/npm/marked@8.0.0/lib/marked.esm.js');
    marked = markedModule.marked || markedModule.default || markedModule;

    if (!window.hljs) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
        script.onload = resolve;
        script.onerror = () => reject(new Error('highlight.js failed to load'));
        document.head.appendChild(script);
      });
    }
    hljs = window.hljs;
    if (!hljs) throw new Error('highlight.js failed to initialize');

    marked.setOptions({
      gfm: true,
      breaks: false,
      headerIds: false,
      mangle: false,
      highlight: (code, lang) => {
        try {
          if (lang && hljs.getLanguage?.(lang)) {
            return hljs.highlight(code, { language: lang }).value;
          }
          return hljs.highlightAuto?.(code).value || escapeHtml(code);
        } catch (e) {
          return escapeHtml(code);
        }
      }
    });

    markdownReady = true;
    return { marked, hljs };
  })();

  return loadingPromise;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
