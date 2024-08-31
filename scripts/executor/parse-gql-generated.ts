import * as fs from 'fs';

(async () => {
  const generatedSrc = 'generated/graphql';

  if (!fs.existsSync(generatedSrc)) {
    fs.mkdirSync(generatedSrc, { recursive: true });
  }

  const models = fs.readdirSync(generatedSrc);

  for (const dir of models) {
    const isDir = fs.lstatSync(`${generatedSrc}/${dir}`).isDirectory();
    if (isDir) {
      const files = fs.readdirSync(`${generatedSrc}/${dir}`);
      const removeSyntax = ['create', 'update', 'delete', 'upsert', 'first', 'index'];

      const removeFiles = files.filter((file) => removeSyntax.some((syntax) => file.includes(syntax)));
      const keepFiles = files.filter((file) => !removeSyntax.some((syntax) => file.includes(syntax)));

      for (const file of removeFiles) {
        fs.unlinkSync(`${generatedSrc}/${dir}/${file}`);
      }

      // create index.ts to export keepFiles
      const indexContent = keepFiles.map((file) => `export * from './${file.replace('.ts', '')}';`).join('\n');
      fs.writeFileSync(`${generatedSrc}/${dir}/index.ts`, `${indexContent}\n`);
    }
  }

  // create index.ts at root of generatedSrc
  let indexContent = '';
  models.map((model) => {
    if (model !== 'index.ts') {
      indexContent += `export * from './${model}';\n`;
    }
  });
  fs.writeFileSync(`${generatedSrc}/index.ts`, indexContent);
})();
