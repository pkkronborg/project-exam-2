const accessToken = localStorage.getItem("accessToken");
const BASE_URL = "https://v2.api.noroff.dev/holidaze/venues";

async function handleResponse(response) {
  if (!response.ok) {
    // Extract error message if available
    const errorData = await response.json();
    const errorMessage = errorData.message || "Something went wrong";
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function createVenue(data) {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": "8c35aa6e-85b0-4670-96b8-6d1763511936",
    },
  });
  return handleResponse(response);
}

export async function updateVenue(data, id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": "8c35aa6e-85b0-4670-96b8-6d1763511936",
    },
  });
  return handleResponse(response);
}

export async function deleteVenue(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": "8c35aa6e-85b0-4670-96b8-6d1763511936",
    },
  });
  if (!response.ok) {
    // Extract error message if available
    const errorData = await response.json();
    const errorMessage = errorData.message || "Something went wrong";
    throw new Error(errorMessage);
  }

  return;
}

export async function getVenuesBySearch(searchInput, page = 1) {
  const response = await fetch(
    `${BASE_URL}/search?q=${searchInput}&page=${page}&limit=20`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return handleResponse(response);
}

export async function getAllVenues(page = 1) {
  const response = await fetch(`${BASE_URL}?page=${page}&limit=20`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(response);
}

export async function getVenueById(id) {
  const response = await fetch(`${BASE_URL}/${id}?_bookings=true&_owner=true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(response);
}
