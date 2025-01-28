export const retriveData = (id) => {
  return JSON.parse(localStorage.getItem(id));
};

export const saveData = (id, data) => {
  localStorage.setItem(id, JSON.stringify(data));
};
