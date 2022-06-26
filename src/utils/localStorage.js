const getLocalStorage = (name) => {
    let list = localStorage.getItem(name);
    if (list) {
        return (list = JSON.parse(localStorage.getItem(name)));
    } else {
        return [];
    }
};

export { getLocalStorage };
