"use server";

import { statSync } from "fs";
import { readdir } from "fs/promises";
import { join } from "path";

export const getDirectories = async (srcPath: string) => {
  return readdir(srcPath).then((data) =>
    data.filter((file) => {
      return statSync(join(srcPath, file)).isDirectory();
    })
  );
};
