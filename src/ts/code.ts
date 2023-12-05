import {delay} from "./std";

export const parseAllCode = async function () {
  let codeLoaded: NodeListOf<Element> | null = null
  for (let i = 0; i < 40; i++) {
    codeLoaded = document.querySelectorAll('code.block');
    if (codeLoaded != null && codeLoaded.length > 0) {
      break;
    }
    await delay(50);
  }

  if (codeLoaded == null) {
    console.error("Error parsing code!");
    return;
  }

  codeLoaded.forEach(code => {
    transformCode(code);
  });
}

function transformCode(code: Element) {
  const lines = code.innerHTML.split('\n');

  while (lines.length > 0 && lines[0].trim() == "") {
    lines.shift();
  }

  while (lines.length > 0 && lines[lines.length - 1].trim() == "") {
    lines.pop();
  }

  const transformedLines = lines.map(transfromLine);
  const minLeft = Math.min.apply(null, transformedLines.map(line => line.left).filter(notNull));
  const parsedLines = transformedLines.map(line => {
    return {text: line.text, left: asNumber(line.left) - minLeft}
  });
  const newCode = parsedLines.map(line => `<span class="line" style="padding-left: ${line.left * 10 + 5}px">${line.text}</span>`).join('\n');

  code.innerHTML = newCode;
}

function notNull<T>(val: T | null): val is T {
  return val !== null;
}

function asNumber(val: number | null): number {
  return val == null ? 0 : val;
}

function transfromLine(line: string): { text: string, left: number | null } {
  line = line.replace('\t', "   ");
  const codePart = line.trim();
  if (codePart.length == 0) {
    return {text: "", left: null};
  }

  const whiteSpace = line.split(codePart, 1)[0];
  return {text: codePart, left: whiteSpace.length};
}
