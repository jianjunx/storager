export const enjson = value => {
  try {
    return JSON.stringify({ value });
  } catch (error) {
    return 'Err: JSON stringify Error';
  }
};

export const dejson = value => {
  try {
    const data = JSON.parse(value);
    return data && data.value;
  } catch (error) {
    return 'Err: JSON parse Error';
  }
};

export const storage2map = storage => {
  const storageMap = new Map();
  for (const key in storage) {
    storageMap.set(key, storage[key]);
  }
  return storageMap;
};

export const getKeys = (storage, secret) => {
  const storageMap = storage2map(storage);
  return [...storageMap.keys()].filter(key => key.startsWith(secret));
};

export const getValues = (storage, keys) => {
  keys.reduce((arr, key) => {
    return arr.push(storage[key]);
  }, []);
};
