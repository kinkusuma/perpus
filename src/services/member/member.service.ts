import { getRepository } from 'typeorm';

// Entities
import { User } from '../../entities/user/user.entity';
import { Borrow } from '../../entities/borrow/borrow.entity';
import {
  Member,
  EMemberStatus,
} from '../../entities/member/member.entity';

// Utilities
import ApiUtility from '../../utilities/api.utility';

// Interfaces
import {
  IPenaltizeMember,
  IUpdateStatusMember,
} from 'member.interface';

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

  memberData.code = `M${memberData.id.toString().padStart(3, '0')}`;
  await getRepository(Member).update({ id: memberData.id }, memberData);

  return ApiUtility.sanitizeData(memberData);
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

  await getRepository(Member).update(
    { user: user },
    { status: params.status },
  );

  return ApiUtility.sanitizeData(member);
};

const penaltize = async (params: IPenaltizeMember) => {
  const member = await getRepository(Member).findOne({
    code: params.code,
  });
  if (!member) {
    throw new StringError('Member is not existed');
  }

  member.status = EMemberStatus.PENALTIZED;
  member.penaltizedAt = new Date();
  await getRepository(Member).update({ code: params.code }, member);

  return ApiUtility.sanitizeData(member);
};

const list = async () => {
  const data = await getRepository(Member)
    .createQueryBuilder('member')
    .leftJoinAndSelect('member.user', 'user')
    .leftJoinAndSelect('member.borrows', 'borrows')
    .leftJoinAndSelect('borrows.book', 'book')
    .getMany();

  return data.map((item) => ApiUtility.sanitizeData(item));
};

export default {
  create,
  getByUserId,
  update,
  penaltize,
  list,
};
