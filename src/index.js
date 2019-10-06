import greetings from "./alert.js";
import style from "./style.css";

function A(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  document.body.appendChild(div);
}

// CSS
A(`
<h2>CSS</h2>
<p class='blue-border'>
This should have a blue border.
</p>
`);

// CSS Modules
A(`
<h2>CSS Modules</h2>
<p class=${style["dog-border"]}>
This should have an orange border.
<span class=${style["blue-text"]}>This text should be blue.</span>
</p>
`);
