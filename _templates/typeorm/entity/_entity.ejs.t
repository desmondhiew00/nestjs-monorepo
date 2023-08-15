---
to: libs/database/src/entities/<%= h.kebabCase(h.singular(TABLE_NAME)) %>.entity.ts
unless_exists: true
sh: "yarn barrels && yarn eslint --fix libs/database/src/entities/index.ts"
---
import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '@db/base';

@Entity('<%= TABLE_NAME %>')
export class <%= ENTITY_NAME %>Entity extends AppBaseEntity {
  @Column('varchar')
  name: string;

  @Column('text', { nullable: true })
  description: string | null;

  @Column('boolean', { default: true })
  active: boolean;

  // @Column('int', { unsigned: true })
  // createdBy: number;

  /* -------------------------------- Relations ------------------------------- */
  // @ManyToOne(() => UserEntity, user => user.order, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  // @JoinColumn([{ name: 'createdBy', referencedColumnName: 'id' }])
  // creator: UserEntity;

  // @OneToMany(() => ItemsEntity, (item) => item.customer)
  // items: ItemsEntity[];
}

export default <%= ENTITY_NAME %>Entity;
