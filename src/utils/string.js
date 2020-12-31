/**
 * Remove character from start and end of string,
 * if it exists.
 */
const trim = (string, character) => {
  return string.slice(
    string.startsWith(character) ? 1 : 0,
    string.endsWith(character) ? -1 : undefined
  );
}

export { trim };
