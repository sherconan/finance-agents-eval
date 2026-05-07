// Tiny markdown → HTML for our own controlled markdown.
// Avoids extra deps. Handles: headings, bold, italic, code, links, lists, tables, blockquote, hr.

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(s: string): string {
  s = s
    .replace(/`([^`]+)`/g, (_m, c) => `<code>${escapeHtml(c)}</code>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return s;
}

export function mdToHtml(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let i = 0;
  let inCode = false;
  let codeBuf: string[] = [];
  let inList: "ul" | "ol" | null = null;
  let inTable = false;
  let tableRows: string[][] = [];
  let tableAligns: string[] = [];

  function closeList() {
    if (inList) {
      out.push(`</${inList}>`);
      inList = null;
    }
  }

  function flushTable() {
    if (!inTable) return;
    if (tableRows.length === 0) {
      inTable = false;
      return;
    }
    const [head, ...body] = tableRows;
    let html = "<table>";
    html += "<thead><tr>";
    head.forEach((c, idx) => {
      const a = tableAligns[idx] || "left";
      html += `<th style="text-align:${a}">${inline(escapeHtml(c.trim()))}</th>`;
    });
    html += "</tr></thead><tbody>";
    body.forEach((r) => {
      html += "<tr>";
      r.forEach((c, idx) => {
        const a = tableAligns[idx] || "left";
        html += `<td style="text-align:${a}">${inline(escapeHtml(c.trim()))}</td>`;
      });
      html += "</tr>";
    });
    html += "</tbody></table>";
    out.push(html);
    inTable = false;
    tableRows = [];
    tableAligns = [];
  }

  while (i < lines.length) {
    const line = lines[i];

    // code fence
    if (line.startsWith("```")) {
      if (inCode) {
        out.push(`<pre><code>${escapeHtml(codeBuf.join("\n"))}</code></pre>`);
        codeBuf = [];
        inCode = false;
      } else {
        closeList();
        flushTable();
        inCode = true;
      }
      i++;
      continue;
    }
    if (inCode) {
      codeBuf.push(line);
      i++;
      continue;
    }

    // table detection: header line then divider
    if (
      line.includes("|") &&
      i + 1 < lines.length &&
      /^\s*\|?[\s\-:|]+\|?\s*$/.test(lines[i + 1]) &&
      lines[i + 1].includes("-")
    ) {
      closeList();
      // start table
      const split = (s: string) =>
        s.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|");
      tableAligns = split(lines[i + 1]).map((c) => {
        const t = c.trim();
        if (t.startsWith(":") && t.endsWith(":")) return "center";
        if (t.endsWith(":")) return "right";
        return "left";
      });
      tableRows.push(split(line));
      inTable = true;
      i += 2;
      while (i < lines.length && lines[i].includes("|") && lines[i].trim() !== "") {
        tableRows.push(split(lines[i]));
        i++;
      }
      flushTable();
      continue;
    }

    // headings
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      closeList();
      out.push(`<h${h[1].length}>${inline(escapeHtml(h[2]))}</h${h[1].length}>`);
      i++;
      continue;
    }

    // hr
    if (/^---+\s*$/.test(line)) {
      closeList();
      out.push("<hr/>");
      i++;
      continue;
    }

    // blockquote
    if (line.startsWith("> ")) {
      closeList();
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        buf.push(lines[i].slice(2));
        i++;
      }
      out.push(`<blockquote>${inline(escapeHtml(buf.join(" ")))}</blockquote>`);
      continue;
    }

    // unordered list
    if (/^[-*]\s+/.test(line)) {
      if (inList !== "ul") {
        closeList();
        out.push("<ul>");
        inList = "ul";
      }
      out.push(`<li>${inline(escapeHtml(line.replace(/^[-*]\s+/, "")))}</li>`);
      i++;
      continue;
    }
    // ordered
    if (/^\d+\.\s+/.test(line)) {
      if (inList !== "ol") {
        closeList();
        out.push("<ol>");
        inList = "ol";
      }
      out.push(`<li>${inline(escapeHtml(line.replace(/^\d+\.\s+/, "")))}</li>`);
      i++;
      continue;
    }

    // empty line
    if (line.trim() === "") {
      closeList();
      i++;
      continue;
    }

    // paragraph
    closeList();
    out.push(`<p>${inline(escapeHtml(line))}</p>`);
    i++;
  }

  closeList();
  flushTable();
  if (inCode) {
    out.push(`<pre><code>${escapeHtml(codeBuf.join("\n"))}</code></pre>`);
  }
  return out.join("\n");
}
