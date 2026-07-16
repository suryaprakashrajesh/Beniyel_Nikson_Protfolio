/**
 * Extracts the 11-character YouTube video ID from a given URL.
 * @param {string} url - YouTube URL
 * @returns {string} YouTube Video ID or empty string
 */
export function getYoutubeId(url) {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

/**
 * Converts a "MM:SS" or "HH:MM:SS" time string into total seconds.
 * @param {string} timeStr - Time string (e.g. "02:30")
 * @returns {number} Time in seconds
 */
export function timeToSeconds(timeStr) {
  if (!timeStr) return 0;
  const parts = timeStr.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  } else if (parts.length === 3) {
    return parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10);
  }
  return 0;
}
