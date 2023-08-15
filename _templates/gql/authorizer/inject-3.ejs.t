---
inject: true
to: libs/database/src/graphql/<%= DTO_FILE %>/<%= h.removeExt(DTO_FILE) %>.dto.ts
skip_if: "@Authorize(<%= h.parseAuthorizerName(NAME) %>)"
before: "@DTORelations"
sh: "yarn eslint --fix libs/database/src/graphql/<%= DTO_FILE %>/<%= h.removeExt(DTO_FILE) %>.dto.ts"
---
@Authorize(<%= h.parseAuthorizerName(NAME) %>)