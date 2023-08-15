---
inject: true
to: libs/database/src/database.module.ts
skip_if: "<%= h.pascalCase(NAME) %>Subscriber"
before: "// Inject: Import"
---
import { <%= h.pascalCase(NAME) %>Subscriber } from './subscribers/<%= h.kebabCase(h.singular(NAME)) %>.subscriber';