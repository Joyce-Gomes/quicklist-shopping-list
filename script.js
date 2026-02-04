const form = document.querySelector("#add-form");
const input = document.querySelector("#item-input");
const list = document.querySelector("#list");
const toast = document.querySelector("#toast");
const toastClose = document.querySelector(".toast-close");

let items = [
  { id: 1, name: "Pão de forma", done: false },
  { id: 2, name: "Café preto", done: false },
  { id: 3, name: "Suco de laranja", done: false },
  { id: 4, name: "Bolacha", done: false },
];

const showToast = () => {
  toast.classList.add("show");
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
};

const renderItems = () => {
  list.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "list-item";
    if (item.done) {
      li.classList.add("completed");
    }

    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.done;
    checkbox.addEventListener("change", () => {
      item.done = checkbox.checked;
      li.classList.toggle("completed", item.done);
    });

    const span = document.createElement("span");
    span.textContent = item.name;

    label.appendChild(checkbox);
    label.appendChild(span);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "delete-button";
    button.innerHTML = `<img src="assets/trash.svg" alt="Remover item">`;
    button.addEventListener("click", () => {
      items = items.filter((entry) => entry.id !== item.id);
      renderItems();
      showToast();
    });

    li.appendChild(label);
    li.appendChild(button);
    list.appendChild(li);
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) {
    return;
  }

  const newItem = {
    id: Date.now(),
    name: value,
    done: false,
  };

  items.unshift(newItem);
  renderItems();
  form.reset();
  input.focus();
});

toastClose.addEventListener("click", () => {
  toast.classList.remove("show");
});

renderItems();
