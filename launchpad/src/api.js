import axios from "axios";

const URL = "http://localhost:3000";

export async function getGalleries() {
  const response = await axios.get(
    "https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,image_id"
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function getGallery(id) {
  const response = await axios.get(`https://api.artic.edu/api/v1/artworks
/${id}`);
const post = response.data;
return post;
}

export async function createGallery(post) {
  // const data = await createImage(post.file);
  // const imageId = data.data.VersionId;
  // post.imageId = imageId;

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

//     -----      Users     ------

export async function getUser(user) {
  const response = await axios.get(`${URL}/users/${user}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function createUser(user) {
  const response = await axios.post(`${URL}/users`, user);
  return response;
}

export async function updateUser(id, user) {
  const response = await axios.put(`${URL}/users/${id}`, user);
  return response;
}

export async function verifyUser(user) {
  const response = await axios.post(`${URL}/users/login`, user);

  if (response.data.success) {
    return response.data.token;
  }
}

// export async function createImage(file) {
//   const formData = new FormData();
//   formData.append("image", file);
//   const response = await axios.post(`${URL}/images`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// }

// export async function getImage(id) {
//   const response = await axios.get(`${URL}/images/${id}`);
//   return response;
// }
