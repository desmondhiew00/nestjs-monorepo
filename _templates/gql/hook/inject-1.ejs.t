---
inject: true
to: libs/database/src/graphql/<%= DTO_FILE %>/<%= h.removeExt(DTO_FILE) %>.dto.ts
after: "import"
---
import { BeforeCreateOne, BeforeDeleteOne, BeforeUpdateOne } from '@nestjs-query/query-graphql';
import * as Hook from './<%= h.removeModuleExt(DTO_FILE) %>.hook';