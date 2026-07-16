/**
 * Copies a given text string to the system clipboard, falling back to a text area selector if needed.
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Resolves to true if successful, false otherwise
 */
export async function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn("navigator.clipboard failed, falling back", err);
    }
  }

  // Fallback method
  const textArea = document.createElement("textarea");
  textArea.value = text;
  // Prevent scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error("Fallback copy failed", err);
    document.body.removeChild(textArea);
    return false;
  }
}
