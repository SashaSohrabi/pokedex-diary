/**
 * Render HTML or Nodes into a target element.
 * Simpler API with a single mode:
 * - 'set' (default): innerHTML for strings or replaceChildren for Nodes
 * - 'append': append content (supports multiple nodes)
 * - 'replace': replace the element node itself
 *
 * Back-compat: accepts the old options object ({ replace, multiple, clear })
 * and maps it to the appropriate mode.
 *
 * @param {string} selector - CSS selector, e.g. "#app-root"
 * @param {string|Node|Node[]} content - HTML string or Node(s)
 * @param {('set'|'append'|'replace')|object} [mode='set'] - render mode or legacy options
 */
export function renderUI(selector, content, mode = 'set') {
  const el = document.querySelector(selector);
  if (!el) {
    console.warn(`Selector not found: ${selector}`);
    return null;
  }

  // Legacy options object support
  let resolved = typeof mode === 'string' ? mode : 'set';
  let clear = false;
  if (mode && typeof mode === 'object') {
    const { replace = false, multiple = false, append = false } = mode;
    clear = Boolean(mode.clear);
    resolved = replace ? 'replace' : multiple || append ? 'append' : 'set';
  }

  if (resolved === 'replace') {
    if (typeof content === 'string') el.outerHTML = content;
    else if (content instanceof Node) el.replaceWith(content);
    else el.replaceWith(toFragment(content));
    return el;
  }

  if (resolved === 'append') {
    const frag = toFragment(content);
    if (clear) el.innerHTML = '';
    el.appendChild(frag);
    return el;
  }

  // 'set' default
  if (typeof content === 'string') el.innerHTML = content;
  else if (content instanceof Node) el.replaceChildren(content);
  else el.replaceChildren(toFragment(content));
  return el;
}

// Convert various content inputs to a DocumentFragment for safe appending
function toFragment(content) {
  const frag = document.createDocumentFragment();
  const pushHTML = (html) => {
    const tpl = document.createElement('template');
    tpl.innerHTML = String(html).trim();
    frag.append(...tpl.content.childNodes);
  };

  if (typeof content === 'string') {
    pushHTML(content);
  } else if (content instanceof Node) {
    frag.appendChild(content);
  } else if (Array.isArray(content)) {
    for (const item of content) {
      if (typeof item === 'string') pushHTML(item);
      else if (item instanceof Node) frag.appendChild(item);
    }
  }
  return frag;
}
