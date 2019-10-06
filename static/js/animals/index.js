/*
@babel/plugin-proposal-export-default-from
Imports the default export, then exports it a named export under
whatever name you provide here.
*/
export animals from "./animals.js";

/*
@babel/plugin-proposal-export-namespace-from
Imports all exports ( including default ), then exports them as object
properties of the named export you export here.
*/
export * as namedAnimals from "./animals.js";
