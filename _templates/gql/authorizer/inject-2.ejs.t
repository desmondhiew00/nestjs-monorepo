---
inject: true
to: libs/database/src/graphql/<%= DTO_FILE %>/<%= h.removeExt(DTO_FILE) %>.dto.ts
before: "@DTORelations"
---
import { <%= h.parseAuthorizerName(NAME) %> } from './<%= h.kebabCase(h.singular(NAME)) %>.authorizer';
