import axios from "axios";

const URL = "http://localhost:3000";

export async function getGalleries() {
  const response = await axios.get(`${URL}/gallery`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function getGallery(id) {
  const response = await axios.get(`${URL}/gallery/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function createGallery(post) {
  const response = await axios.post(`${URL}/gallery`, post);
  return response;
}

export async function updateGallery(id, post) {
  const response = await axios.put(`${URL}/gallery/${id}`, post);
  return response;
}

export async function deleteGallery(id) {
  const response = await axios.delete(`${URL}/gallery/${id}`);
  return response;
}
