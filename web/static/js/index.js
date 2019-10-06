import greetings from "./alert.js";
import style from "./style.css";
import { animals } from "./animals";
import { namedAnimals } from "./animals";
import salukis from "../assets/images/salukis.jpeg";

function A(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = `<section>${htmlString}</section>`;
  document.body.appendChild(div);
}

function H(htmlString) {
  const h1 = document.createElement("h1");
  h1.innerHTML = htmlString;
  document.body.appendChild(h1);
}

H(`Loaders`);

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

// Fonts
A(`
<div class="font">
  <h2>Fonts via file-loader</h2>
  This should be Sailec font.
</div>
`);

// Images
A(`
<h2>Images via file-loader</h2>
<p>Images loaded via \`import\` statements.</p>
This should be a painting of Salukis:
<div>path = ${salukis}</div>
<img src=${salukis} />
`);

H(`Plugins`);

A(`
<h2><a href="https://webpack.js.org/plugins/provide-plugin/">ProvidePlugin</a></h2>
<p>Automatically loads modules instead of having to import or require them.</p>
Is working?  ${React !== undefined}
React: ${React}
`);

A(`
<h2><a href="https://webpack.js.org/plugins/copy-webpack-plugin/">CopyWebpackPlugin</a></h2>
<p>Images loaded via paths to static assets.</p>
<p>Copies files from one directory to another directory upon build.</p>
This should be a painting of some horses and dogs:<br/>
<img src="priv/static/images/borzois.jpeg" />
`);
