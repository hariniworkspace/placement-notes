const API = `${import.meta.env.VITE_API_URL}/api/oops-notes`;

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

  if (res.status === 401) return null;
  if (!res.ok) return null;

  return res.json();
};

export const getOopsNotes = async () => {
  const data = await safeFetch(API);
  return Array.isArray(data) ? data : [];
};

export const createOopsNote = async (title) => {
  return await safeFetch(API, {
    method: "POST",
    body: JSON.stringify({ title }),
  });
};

export const getOopsNoteById = async (id) => {
  return await safeFetch(`${API}/${id}`);
};

export const updateOopsNote = async (id, data) => {
  return await safeFetch(`${API}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteOopsNote = async (id) => {
  await safeFetch(`${API}/${id}`, { method: "DELETE" });
};


