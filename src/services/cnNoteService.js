const API = `${import.meta.env.VITE_API_URL}/api/cn-notes`;

const getToken = () => localStorage.getItem("token");

const safeFetch = async (url, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) return null;
  return res.json();
};

export const getCnNotes = async () => {
  const data = await safeFetch(API);
  return Array.isArray(data) ? data : [];
};

export const createCnNote = async (title) => {
  return await safeFetch(API, {
    method: "POST",
    body: JSON.stringify({ title }),
  });
};

export const getCnNoteById = async (id) => {
  return await safeFetch(`${API}/${id}`);
};

export const updateCnNote = async (id, data) => {
  return await safeFetch(`${API}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteCnNote = async (id) => {
  await safeFetch(`${API}/${id}`, { method: "DELETE" });
};
