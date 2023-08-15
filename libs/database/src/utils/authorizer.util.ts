import { AdminEntity } from '@db/entities';
import { AppContext } from '@lib/database/types';

export const countryCodeAuthorize = async (context: AppContext) => {
  const { user } = context.req;
  if (user && user.countryCode) {
    if (user.type === 'ADMIN') {
      const admin = await AdminEntity.findOne({ where: { id: user.id }, select: ['id', 'superUser'] });
      if (admin.superUser) return {};
    }
    return { countryCode: { eq: user.countryCode } };
  }
  return {};
};
