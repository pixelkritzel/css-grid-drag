export async function urlExists(url: string) {
  try {
    const result = await fetch(url, { method: 'HEAD' });
    return result.status < 400;
  } catch (e) {
    return false;
  }
}
