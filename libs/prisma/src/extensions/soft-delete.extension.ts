import { Prisma } from '@prisma/client';
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete';

const softDeleteColumn = 'deletedAt';

const AllModels = () => {
  const obj: Record<string, boolean> = {};
  const prismaModels = Prisma.dmmf.datamodel.models;

  for (const model of prismaModels) {
    const hasSoftDeleteField = model.fields.find((field) => field.name === softDeleteColumn);
    obj[model.name] = !!hasSoftDeleteField;
  }

  return obj;
};

export const SoftDeleteExtension = createSoftDeleteExtension({
  defaultConfig: {
    field: 'deletedAt',
    createValue: (deleted) => {
      if (deleted) return new Date();
      return null;
    },
  },
  models: AllModels(),
});
