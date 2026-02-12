function cleanMarkdownFences(text) {
  return text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();
}

export function parseJsonFromGemini(text) {
  try {
    const cleanedText = cleanMarkdownFences(text);
    const parsed = JSON.parse(cleanedText);
    return { data: parsed, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

