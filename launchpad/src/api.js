import axios from "axios";

const URL = "https://launchpad-twh3.onrender.com";
const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
let allObjectIDs = [];

//     -----     CHICAGO     -----

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

export async function getGalleriesPage(page = 1) {
  const response = await axios.get(
    `https://api.artic.edu/api/v1/artworks?page=${page}&limit=80&fields=id,title,artist_display,date_display,image_id`
  );
  return response.data;
}

export async function getChicagoGallery(id) {
  try {
    let response = await axios.get(
      `https://api.artic.edu/api/v1/artworks/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
//     -----     MET     -----

// Calls API for Object ID's - Grabs full list of ONLY Id's
export async function initializeMetIDs() {
  try {
    const response = await axios.get(
      `${BASE_URL}/search?hasImages=true&q=*&departmentId=9`
    );
    const objectIDs = response.data?.objectIDs || [];
    allObjectIDs = [...new Set(objectIDs)].slice(0, 1000);
  } catch (err) {
    console.error("Failed to fetch MET object IDs:", err);
  }
}

// Makes specific calls using acquired ID's - Runs useable ID's through again
export async function getMetArtworks(page = 1, pageSize = 20) {
  const startIndex = (page - 1) * pageSize;
  const artworks = [];
  let currentIndex = startIndex;

  while (artworks.length < pageSize && currentIndex < allObjectIDs.length) {
    const id = allObjectIDs[currentIndex];
    currentIndex++;

    try {
      const { data } = await axios.get(`${BASE_URL}/objects/${id}`);
      if (
        data &&
        data.primaryImageSmall &&
        data.title &&
        data.artistDisplayName
      ) {
        artworks.push(data);
      }
    } catch (err) {
      console.error(`Failed to fetch object ${id}`, err);
    }
  }

  return artworks;
}

// Returns batches(page) of formatted results (title, image, etc.)
export async function getMetArtworksBatch(start = 0, batchSize = 20) {
  const artworks = [];
  const idsToFetch = allObjectIDs.slice(start, start + batchSize);

  for (let id of idsToFetch) {
    try {
      const { data } = await axios.get(`${BASE_URL}/objects/${id}`);
      if (
        data &&
        data.primaryImageSmall &&
        data.title &&
        data.artistDisplayName
      ) {
        artworks.push(data);
      }
    } catch (err) {}
  }

  return artworks;
}

export async function getMetGallery(id) {
  let response = await axios.get(`${BASE_URL}/objects/${id}`);

  const post = response.data;
  return post;
}

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
