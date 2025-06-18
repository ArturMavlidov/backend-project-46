import { Command } from "commander";

export const gendiff = () => {
  const program = new Command();

  program
    .name("gendiff")
    .description("  Compares two configuration files and shows a difference.");

  program.parse();
};
