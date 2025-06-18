import { Command } from "commander";

import { parser } from "./parser.js";

export const gendiff = () => {
  const program = new Command();

  program
    .name("gendiff")
    .description("Compares two configuration files and shows a difference.")
    .arguments("filepath1 filepath2")
    .option("-V, --version", "output the version number")
    .option("-f, --format [type]", "output format")
    .action(() => {
      console.log(parser(program.args[0]));
    });

  program.parse();
};
