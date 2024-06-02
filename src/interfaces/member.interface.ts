import { EMemberStatus } from '../entities/member/member.entity';

export interface IUpdateStatusMember {
  status: EMemberStatus;
}

export interface IPenaltizeMember {
  code: string;
}
