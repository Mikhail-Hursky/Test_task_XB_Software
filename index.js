const form = document.querySelector(".form_container");
const tagsContainer = document.querySelector(".tag_container");
const isReadOnly = document.querySelector(".checkbox");

window.onload = () => {
  isReadOnly.checked =
    JSON.parse(localStorage.getItem("READ_ONLY")) === null
      ? false
      : JSON.parse(localStorage.getItem("READ_ONLY"));
  getSaveTags();
  removeOrShowForm(isReadOnly.checked);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const str = event.target[0].value;
  if (str !== "") {
    createTag(event.target[0].value);
    setSaveTags(event.target[0].value);
  }

  event.target[0].value = "";
});

isReadOnly.addEventListener("change", (event) => {
  cleanTagsContainer();
  removeOrShowForm(event.target.checked);
  localStorage.setItem("READ_ONLY", JSON.stringify(event.target.checked));
  getSaveTags();
});

const createTag = (str) => {
  const btn = document.createElement("button");
  btn.classList.add("tag_button");
  btn.innerHTML = `<i class="bi bi-x"></i>`;

  const tag = document.createElement("span");
  tag.classList.add("tag");
  tag.innerHTML = str;
  tag.value = str;

  if (!isReadOnly.checked) {
    tag.appendChild(btn);
  }

  btn.addEventListener("click", () => {
    removeTag(tag);
  });

  tagsContainer.appendChild(tag);
};

const setSaveTags = (str) => {
  const arr = JSON.parse(localStorage.getItem("TAGS"));
  arr.push(str);
  localStorage.setItem("TAGS", JSON.stringify(arr));
};

const getSaveTags = () => {
  const arr = JSON.parse(localStorage.getItem("TAGS"));
  if (arr !== null) {
    arr.forEach((element) => {
      createTag(element);
    });
  } else {
    localStorage.setItem("TAGS", JSON.stringify([]));
  }
};

const removeTag = (tag) => {
  const arr = JSON.parse(localStorage.getItem("TAGS"));
  arr.splice(arr.indexOf(tag.value), 1);
  localStorage.setItem("TAGS", JSON.stringify(arr));
  tag.remove();
};

const cleanTagsContainer = () => {
  tagsContainer.innerHTML = "";
};

const removeOrShowForm = (isCheck) => {
  const inputs = Array.from(form.children);
  isCheck
    ? inputs.forEach((element) => element.setAttribute("disabled", "disabled"))
    : inputs.forEach((element) => element.removeAttribute("disabled"));
};

const getListTag = () => {
  return Json.parse(localStorage.getItem("TAGS"));
};

const setListTag = (array) => {
  localStorage.setItem("TAGS", JSON.stringify(array));
};
