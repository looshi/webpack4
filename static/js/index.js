import greetings from "./alert.js";
import style from "./style.css";
import { animals } from "./animals";
import { namedAnimals } from "./animals";

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
<div class=${style.dogBorder}>
  This should have an orange border.
  <p class=${style.blueText}>This text should be blue.</p>
  <p>The generated classname is ${style["blue-text"]}.</p>
  <p>style.blueText available ?  ${style.blueText !== undefined}.</p>
  <p>style["blue-text"] still available ?  ${style["blue-text"] !==
    undefined}. ( These dash classnames can be deleted from the styles object aka "locals" via camelCaseOnly option )</p>
  </div>
`);

// JS

//@babel/plugin-proposal-class-properties
class MyClass {
  classPropertiesWork = true;
}

A(`
<h2>@babel/plugin-proposal-export-default-from</h2>
<div>
  Is working ? ${JSON.stringify(animals)}
</div>
`);

A(`
<h2>@babel/plugin-proposal-export-namespace-from</h2>
<div>
  Is working ? ${JSON.stringify(namedAnimals)}
</div>
`);
