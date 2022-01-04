const BASE_URL  = 'http://localhost:8082/';
const ADMIN_URL = `${BASE_URL}admin/`;

const PAGE_SIZE = 50;

export const changeLabelStatus = async (id, token, accepted) => {
  const response = await fetch(`${ADMIN_URL}labels/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `bearer ${token}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ accepted: accepted })
  });
  if (response.ok)
    return await response.json();

  console.error(response);
  return Promise.reject(`Status: ${response.status} ${response.statusText}`);
};

export const getLabels = async (token, page_no, accepted) => {
  const params = { page_no, page_size: PAGE_SIZE };
  if (accepted === undefined)
    params.get_all = true;
  else if (accepted !== null)
    params.accepted = accepted;

  const response = await fetch(`${ADMIN_URL}labels?${new URLSearchParams(params).toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    }
  });
  if (response.ok)
    return await response.json();

  console.error(response);
  return Promise.reject(`Status: ${response.status} ${response.statusText}`);
};
