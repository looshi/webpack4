import greetings from "./alert.js";
import style from "./style.css";

const output = greetings("Affirmative", "Dave");

document.body.prepend(output);
document.body.prepend("output:");

document.body.prepend(JSON.stringify(style));
document.body.prepend("styles:");

const div = document.createElement("div");
div.innerHTML = `
<button class=${style["dog-border"]}>
Click Me
</button>
<img src='https://www.petful.com/wp-content/uploads/2013/07/Borzoi-1.jpg'/>
`;

document.body.appendChild(div);
document.body.appendChild("html:");
