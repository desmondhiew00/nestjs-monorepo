---
inject: true
to: libs/database/src/graphql/<%= DTO_FILE %>/<%= h.removeExt(DTO_FILE) %>.dto.ts
skip_if: "import { Authorize"
after: "@nestjs/graphql"
---
import { Authorize } from '@nestjs-query/query-graphql';