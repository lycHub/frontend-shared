import iconData from "../icon-data.json";
import { addCollection, listIcons } from "iconify-icon";
import "./main.css";

const isOk = addCollection(iconData);

if (isOk) {
  const list = listIcons(iconData);
  const iconsWrap = document.querySelector("#app .icons");
  if (list.length && iconsWrap) {
    let str = "";
    list.forEach((item) => {
      str += `<button class="icon-item" data-name="${item}">
          <iconify-icon icon="${item}"></iconify-icon>
          <p>${item}</p>
        </button>`;
    });
    iconsWrap.innerHTML = str;
  }

  const items = iconsWrap.querySelectorAll(".icon-item");
  const popoverNode = document.getElementById("mypopover");
  if (items.length && popoverNode) {
    items.forEach((item) => {
      item.addEventListener("click", (event) => {
        const button = event.target.closest(".icon-item");
        popoverNode.showPopover({ source: button });
        navigator.clipboard.writeText(button.dataset.name);
      });
    });
  }
}
