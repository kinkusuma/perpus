import { getRepository } from 'typeorm';

// Entities
import { User } from '../../entities/user/user.entity';
import { Member } from '../../entities/member/member.entity';

// Utilities
import ApiUtility from '../../utilities/api.utility';

// Interfaces
import { IUpdateStatusMember } from 'member.interface';

// Errors
import { StringError } from '../../errors/string.error';

const create = async (user: User) => {
  const member = await getRepository(Member).findOne({ user: user });
  if (member) {
    throw new StringError('User is already a member');
  }

  const item = new Member();
  item.user = user;
  item.code = 'XXXXX';
  const memberData = await getRepository(Member).save(item);

  item.code = `M${memberData.id.toString().padStart(3, '0')}`;
  await getRepository(Member).update(
    { id: memberData.id },
    { code: item.code },
  );

  return ApiUtility.sanitizeData({
    ...memberData,
    code: item.code,
  } as Member);
};

const getByUserId = async (user: User) => {
  try {
    const data = await getRepository(Member).findOne({ user: user });
    return ApiUtility.sanitizeData(data);
  } catch (e) {
    return null;
  }
};

const update = async (user: User, params: IUpdateStatusMember) => {
  const member = await getRepository(Member).findOne({ user: user });
  if (!member) {
    throw new StringError('Member is not existed');
  }

  return await getRepository(Member).update(
    { user: user },
    { status: params.status },
  );
};

export default {
  create,
  getByUserId,
  update,
};
