const BASE_URL  = 'http://localhost:8082/';
const ADMIN_URL = `${BASE_URL}admin/`;

const PAGE_SIZE = 50;

export const changeBookmarkStatus = async (id, token, accepted) => {
  const response = await fetch(`${ADMIN_URL}bookmarks/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `bearer ${token}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ accepted: accepted })
  });
  return await response.json();
};

export const getBookmarks = async (token, page_no, status) => {
  const params   = { page_no, page_size: PAGE_SIZE, status };
  const response = await fetch(`${ADMIN_URL}bookmarks?${new URLSearchParams(params).toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    }
  });
  return await response.json();
};
