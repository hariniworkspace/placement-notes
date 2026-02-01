import API from "./api";

export const getSystemDesignNotes = async () => {
  const { data } = await API.get("/api/system-design-notes");
  return data;
};

export const createSystemDesignNote = async (title) => {
  const { data } = await API.post("/api/system-design-notes", { title });
  return data;
};

export const getSystemDesignNoteById = async (id) => {
  const { data } = await API.get(`/api/system-design-notes/${id}`);
  return data;
};

export const updateSystemDesignNote = async (id, body) => {
  const { data } = await API.put(`/api/system-design-notes/${id}`, body);
  return data;
};

export const deleteSystemDesignNote = async (id) => {
  await API.delete(`/api/system-design-notes/${id}`);
};
