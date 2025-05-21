export async function checkLocalMP3FileExists(src: string) {
  if (!src) return false;
  try {
    const response = await new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('HEAD', src, true);
      xhr.onload = () => resolve(xhr);
      xhr.onerror = () => reject(xhr);
      xhr.send();
    });
    return response.status === 200 && response.getResponseHeader('Content-Type') === 'audio/mpeg';
  } catch (error) {
    console.warn(error);
    return false;
  }
}

export function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  let clone = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
}
