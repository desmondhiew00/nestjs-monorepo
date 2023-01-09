// const changeCase = require('change-case');
const { plural, singular } = require('pluralize');

let pluralize;

function enablePluralization(value) {
  pluralize = value;
}

function relationIdName(relationId, relation, _owner) {
  const columnOldName = relationId.fieldName;

  const isRelationToMany = relation.relationType === 'OneToMany' || relation.relationType === 'ManyToMany';
  let newColumnName = columnOldName.replace(/[0-9]$/, '');

  if (!Number.isNaN(parseInt(newColumnName[newColumnName.length - 1], 10))) {
    newColumnName = newColumnName.substring(0, newColumnName.length - 1);
  }
  if (!Number.isNaN(parseInt(newColumnName[newColumnName.length - 1], 10))) {
    newColumnName = newColumnName.substring(0, newColumnName.length - 1);
  }
  if (isRelationToMany && pluralize) {
    newColumnName = plural(newColumnName);
  }

  return newColumnName;
}

function relationName(relation, _owner) {
  const columnOldName = relation.fieldName;

  const isRelationToMany = relation.relationType === 'OneToMany' || relation.relationType === 'ManyToMany';
  let newColumnName = columnOldName.replace(/[0-9]$/, '');

  if (newColumnName.toLowerCase().endsWith('id') && !newColumnName.toLowerCase().endsWith('guid')) {
    newColumnName = newColumnName.substring(0, newColumnName.toLowerCase().lastIndexOf('id'));
  }
  if (!Number.isNaN(parseInt(newColumnName[newColumnName.length - 1], 10))) {
    newColumnName = newColumnName.substring(0, newColumnName.length - 1);
  }
  if (!Number.isNaN(parseInt(newColumnName[newColumnName.length - 1], 10))) {
    newColumnName = newColumnName.substring(0, newColumnName.length - 1);
  }
  if (isRelationToMany && pluralize) {
    newColumnName = plural(newColumnName);
  }
  return newColumnName;
}

function entityName(oldEntityName, _entity) {
  return singular(oldEntityName) + 'Entity';
}

function columnName(oldColumnName, _column) {
  return oldColumnName;
}

function fileName(oldFileName) {
  return singular(oldFileName).replace('Entity', '').toLowerCase();
}

module.exports = {
  enablePluralization,
  relationIdName,
  relationName,
  entityName,
  columnName,
  fileName
};
