---
inject: true
to: libs/database/src/graphql/<%= DTO_FILE %>/<%= h.removeExt(DTO_FILE) %>.dto.ts
before: "@DTORelations"
sh: "yarn eslint --fix libs/database/src/graphql/<%= DTO_FILE %>/<%= h.removeExt(DTO_FILE) %>.dto.ts"
---
@BeforeCreateOne(Hook.<%= h.pascalCase(h.moduleName(DTO_FILE)) %>CreateOneHook)
@BeforeUpdateOne(Hook.<%= h.pascalCase(h.moduleName(DTO_FILE)) %>UpdateOneHook)
@BeforeDeleteOne(Hook.<%= h.pascalCase(h.moduleName(DTO_FILE)) %>DeleteOneHook)