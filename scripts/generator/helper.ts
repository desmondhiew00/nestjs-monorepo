/* eslint-disable no-console */

import chalk from 'chalk';
import fs from 'fs';
import handlebars from 'handlebars';

export const getDirectories = (path: string) => {
  const result = fs
    .readdirSync(path, { withFileTypes: true })
    .filter((file) => file.isDirectory())
    .map((folder) => folder.name);

  return result;
};

/**
 *
 * @param path
 * @param include String.includes
 * @returns
 */
export const getFiles = (path: string, include?: string) => {
  const result = fs
    .readdirSync(path, { withFileTypes: true })
    .filter((file) => {
      let valid = file.isFile();
      if (valid && include) valid = file.name.includes(include);
      return valid;
    })
    .map((folder) => folder.name);
  return result;
};

export const createDirectory = (path: string) => {
  const nested = path.split('/').filter((val) => !!val);

  const parseSlash = (val: string) => {
    if (val.charAt(val.length - 1) === '/') return val;
    const result = val + '/';
    return result;
  };

  let current = '';
  nested.map((val) => {
    current += parseSlash(val);
    if (!fs.existsSync(current)) {
      fs.mkdirSync(current);
    }
  });
};

export const writeFile = (outputPath: string, content: string, force?: boolean): Promise<void> => {
  const splitted = outputPath.split('/');

  const filename = splitted[splitted.length - 1];
  const dir = outputPath.replace(filename, '');

  createDirectory(dir);

  return new Promise((resolve, reject) => {
    if (!force && fs.existsSync(outputPath)) {
      console.log(
        `${chalk.bgYellow(' skipped ')}  ${chalk.yellow.underline(outputPath)} ${chalk.yellow('already exists.')}`
      );
      return resolve();
    }

    fs.writeFile(outputPath, content, (err) => {
      if (err) {
        console.log(chalk.bgRedBright('Error'), `  ${err}`);
        reject(err);
      } else {
        console.log(`${chalk.bgGreenBright(' created ')}  ${chalk.green.underline(outputPath)}`);
        resolve();
      }
    });
  });
};

export const insertToLine = (
  filePath: string,
  value: string,
  toLine: number | string,
  skipIfExists?: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (skipIfExists && content.includes(skipIfExists)) {
      resolve();
      return;
    }

    const lines = content.split('\n');
    const lineIndex = typeof toLine === 'string' ? lines.findIndex((line) => line.includes(toLine)) : toLine;
    lines.splice(lineIndex + 1, 0, value);

    const modifiedFileContents = lines.join('\n');
    fs.writeFile(filePath, modifiedFileContents, async (err) => {
      if (err) return reject(err);
      console.log(`${chalk.bgGreenBright(`injected`)} (${chalk.yellow(filePath)})`, value);
      resolve();
    });
  });
};

export const removeLineFromFile = (filePath: string, lineNumber: number | string) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const lineIndex = typeof lineNumber === 'string' ? lines.findIndex((line) => line.includes(lineNumber)) : lineNumber;
  lines.splice(lineIndex, 1);
  const modifiedFileContents = lines.join('\n');
  fs.writeFileSync(filePath, modifiedFileContents);
};

export const replaceStringFromFile = (filePath: string, searchString: string, replaceValue: string): Promise<void> => {
  return new Promise((rs, rj) => {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(searchString, replaceValue);
    fs.writeFile(filePath, content, (err) => {
      if (err) rj(err);
      rs();
    });
  });
};

export const handlebarCompile = (templatePath: string, data: any, parser?: (content: string) => string) => {
  const template = fs.readFileSync(templatePath, 'utf-8');
  const dtoTemplate = handlebars.compile(template, { noEscape: true });
  let content = dtoTemplate(data);
  if (parser) content = parser(content);
  return content;
};
