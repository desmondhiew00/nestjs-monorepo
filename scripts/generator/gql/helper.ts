import fs from 'fs';
import handlebars from 'handlebars';
import _ from 'lodash';

// Entity source directory
export const sourceDir = 'libs/database/src/entities/';

// Exclude entity's columns
const excludeFields = [/password/];

export const getColumnDetails = (line: string, isEnum?: boolean) => {
  const nullable = line.includes('null');
  const variable = line.split(':')[0].trim();
  const type = line.split(':')[1].replace('| null', '').replace(';', '').trim();
  const isArray = line.includes('[]');
  return {
    nullable,
    variable,
    type,
    isArray,
    isEnum
  };
};

export const isVariable = (val: string) => {
  const splitted = val.trim().split(':');
  if (splitted.length <= 1) return false;
  const firstChar = splitted[1].trim().charAt(0);
  if (firstChar === "'" || firstChar === `"`) return false;
  if (val.slice(0, 4) === '    ') return false;
  return true;
};

export const getVariablesFromSourceFile = (filePath: string) => {
  const columnKey = '  @Column';
  const relationColumnKey = ['  @OneToMany', '  @ManyToOne', '  @ManyToMany'];

  const fileContent = fs.readFileSync(sourceDir + filePath, 'utf-8');
  const columns: ReturnType<typeof getColumnDetails>[] = [];
  const relations: ReturnType<typeof getColumnDetails>[] = [];
  const enums: string[] = [];

  let entityName = '';
  const hasBaseEntity = fileContent.includes('extends AppBaseEntity');
  const hasId = hasBaseEntity || fileContent.includes('@PrimaryGeneratedColumn');

  let isRelation = false;
  let isColumn = false;
  let isEnum = false;
  fileContent.split(/\r?\n/).forEach((line) => {
    if (isColumn || isRelation) {
      if (line.trim().charAt(0) === '@') return;
      if (!isVariable(line)) return;
    }

    if (!entityName) {
      const isEntityLine = line.includes('export class') && line.includes('Entity');
      if (isEntityLine) entityName = line.match(/\b(\w+)\b/g)[2];
    }

    if (isColumn) {
      columns.push(getColumnDetails(line, isEnum));
      isColumn = false;
      isEnum = false;
      return;
    }

    if (isRelation) {
      relations.push(getColumnDetails(line));
      isRelation = false;
      return;
    }

    // Check next line is column field
    if (line.includes(columnKey)) {
      isColumn = true;
      isEnum = line.includes('enum') || line.includes('ColumnEnum');
      return;
    }

    // Check next line is relation column field
    relationColumnKey.forEach((key) => {
      if (!isRelation) isRelation = line.includes(key);
    });
  });

  const moduleName = entityName.replace('Entity', '');
  _.remove(columns, (c) => {
    let match = false;
    excludeFields.map((regx) => {
      if (!match) match = !!_.toLower(c.variable).match(regx);
    });
    return match;
  });
  _.map(columns, (c) => {
    if (c.isEnum) enums.push(c.type);
  });

  return { columns, relations, enums, entityName, moduleName, hasBaseEntity, hasId };
};

handlebars.registerHelper('define_field', function (record) {
  const data = this as ReturnType<typeof getColumnDetails>;

  let field = `@FilterableField(${data.nullable ? `{ nullable: true }` : ''})`;
  if (data.isEnum) field = `@FilterableField(\(\) \=\> ${data.type}${data.nullable ? `, { nullable: true }` : ''})`;
  const variableName = data.variable;
  const variableType = `${data.type}${data.nullable ? ' | null' : ''}`;
  const last = record.data.last === true ? '' : `\n`;

  const result = `${field}\n  ${variableName}: ${variableType};${last}`;
  return result;
});

handlebars.registerHelper('define_relation', function (record) {
  const data = this as ReturnType<typeof getColumnDetails>;
  const dto = data.type.replace('Entity', 'DTO').replace('[]', '');
  const field = data.isArray ? `@GqlHasManyUnpaged(() => ${dto})` : `@GqlHasOne(() => ${dto})`;
  const last = record.data.last === true ? '' : `\n`;
  return `${field}\n  ${data.variable}: ${dto}${data.isArray ? '[]' : ''};${last}`;
});

handlebars.registerHelper('define_input_field', function (record) {
  const data = this as ReturnType<typeof getColumnDetails>;

  let field = `@Field(${data.nullable ? `{ nullable: true }` : ''})`;
  if (data.isEnum) field = `@Field(\(\) \=\> ${data.type}${data.nullable ? `, { nullable: true }` : ''})`;

  const validator = '';
  // if (data.type === 'string') validator = '@IsString()\n  ';
  // if (data.type === 'number') validator = '@IsNumber()\n  ';
  // if (data.type === 'boolean') validator = '@IsBoolean()\n  ';

  const variableName = `${data.variable}${data.nullable ? '?' : ''}`;
  const variableType = `${data.type}${data.nullable ? ' | null' : ''}`;
  const last = record.data.last === true ? '' : `\n`;
  return `${validator}${field}\n  ${variableName}: ${variableType};${last}`;
});
