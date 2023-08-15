---
inject: true
to: libs/database/src/database.module.ts
skip_if: "import { <%= ENTITY_NAME %>Entity"
before: "// Inject: Import"
---
import { <%= ENTITY_NAME %>Entity } from './entities/<%= h.kebabCase(h.singular(TABLE_NAME)) %>.entity';