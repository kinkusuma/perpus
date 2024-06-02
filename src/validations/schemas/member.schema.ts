import joi from 'joi';
import { EMemberStatus } from '../../entities/member/member.entity';

export default {
  updateStatusMember: {
    body: {
      status: joi
        .string()
        .valid(...Object.values(EMemberStatus))
        .required(),
    },
  },
};
