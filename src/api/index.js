
const KEY =
    `?client_id=${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`;
const URL = `https://api.unsplash.com/photos/`;

const fetchImages = async page => {
    const response = await fetch(`${URL}${KEY}&per_page=6&page=${page}`);
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
};

const fetchImageStats = async id => {
    const response = await fetch(`${URL}/${id}/statistics${KEY}`);
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
};

export { fetchImages, fetchImageStats };