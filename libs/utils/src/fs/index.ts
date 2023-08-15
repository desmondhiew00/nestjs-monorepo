import fs from 'fs';

export const getDirectories = (path: string) => {
  const result = fs
    .readdirSync(path, { withFileTypes: true })
    .filter((file) => file.isDirectory())
    .map((folder) => folder.name);

  return result;
};

export const getFiles = (path: string, withFileTypes?: boolean) => {
  const result = fs.readdirSync(path, withFileTypes ? { withFileTypes } : undefined);
  return result;
};
