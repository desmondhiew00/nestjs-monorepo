---
to: libs/database/src/subscribers/<%= h.kebabCase(h.singular(NAME)) %>.subscriber.ts
---
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';

import { <%= h.pascalCase(h.removeExt(ENTITY_FILE)) %> } from '../entities/<%= h.removeExt(ENTITY_FILE) %>';

@EventSubscriber()
export class <%= h.pascalCase(NAME) %>Subscriber implements EntitySubscriberInterface<<%= h.pascalCase(h.removeExt(ENTITY_FILE)) %>> {
  listenTo() {
    return <%= h.pascalCase(h.removeExt(ENTITY_FILE)) %>;
  }

  async beforeInsert(event: InsertEvent<<%= h.pascalCase(h.removeExt(ENTITY_FILE)) %>>) {
    const entity = event.entity;
    return entity;
  }

  async beforeUpdate(event: UpdateEvent<<%= h.pascalCase(h.removeExt(ENTITY_FILE)) %>>) {
    const entity = event.entity as <%= h.moduleName(ENTITY_FILE, "Entity") %>;
    return entity;
  }
}
