export const enjson = value => {
  try {
    const data = JSON.stringify({ value });
    return encodeURIComponent(data);
  } catch (error) {
    return 'Err: JSON stringify Error';
  }
};

export const dejson = value => {
  try {
    value = decodeURIComponent(value);
    const data = JSON.parse(value);
    return data && data.value;
  } catch (error) {
    return 'Err: JSON parse Error';
  }
};

export const toMap = storage => new Map(Object.entries(storage));

export const getKeys = (storage, secret) => {
  const storageMap = toMap(storage);
  return [...storageMap.keys()].filter(key => key.startsWith(secret));
};

export const getValues = (storage, keys) => {
  keys.reduce((arr, key) => {
    return arr.push(storage[key]);
  }, []);
};
