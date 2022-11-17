const hamb = document.querySelector(".hamburger");
const navic = document.querySelector(".nav");
hamb.addEventListener("click", () => toogleClass());

const navClassList = navic.className;

let active = false;

const toogleClass = () => {
  active = !active;
  navic.className = active
    ? `${navClassList} active`
    : `${navClassList} not-active`;
};
