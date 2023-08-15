---
inject: true
to: libs/database/src/database.module.ts
skip_if: <%= ENTITY_NAME %>Entity,
after: "// Inject: Entity Array"
sh: "yarn eslint --fix libs/database/src/database.module.ts"
---

  <%= ENTITY_NAME %>Entity,