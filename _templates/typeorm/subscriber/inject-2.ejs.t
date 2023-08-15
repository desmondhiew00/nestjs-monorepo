---
inject: true
to: libs/database/src/database.module.ts
skip_if: <%= h.pascalCase(NAME) %>Subscriber,
after: "// Inject: Subscriber Array"
sh: "yarn eslint --fix libs/database/src/database.module.ts"
---

  <%= h.pascalCase(NAME) %>Subscriber,