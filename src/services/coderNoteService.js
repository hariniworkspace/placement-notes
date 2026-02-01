import API from "./api";

export const getCoderNotes = async () => {
  return (await API.get("/api/codernotes")).data;
};

export const getCoderNoteById = async (id) => {
  return (await API.get(`/api/codernotes/${id}`)).data;
};

export const createCoderNote = async (note) => {
  return (await API.post("/api/codernotes", note)).data;
};

export const updateCoderNote = async (id, note) => {
  return (await API.put(`/api/codernotes/${id}`, note)).data;
};

export const deleteCoderNote = async (id) => {
  return (await API.delete(`/api/codernotes/${id}`)).data;
};

export const toggleRevision = async (id) => {
  return (await API.patch(`/api/codernotes/${id}/revision`)).data;
};
