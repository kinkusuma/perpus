import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '../../interfaces/IController';
import {
  IPenaltizeMember,
  IUpdateStatusMember,
} from '../../interfaces/member.interface';

// Services
import memberService from '../../services/member/member.service';

// Errors
import { StringError } from '../../errors/string.error';

// Utilities
import ApiResponse from '../../utilities/api-response.utility';

const create: IController = async (req, res) => {
  try {
    const member = await memberService.create(req.user);
    return ApiResponse.result(res, member, httpStatusCodes.CREATED);
  } catch (e) {
    if (e instanceof StringError) {
      return ApiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        e.message,
      );
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const getByUserId: IController = async (req, res) => {
  try {
    const member = await memberService.getByUserId(req.user);
    return ApiResponse.result(res, member, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const update: IController = async (req, res) => {
  try {
    const params: IUpdateStatusMember = {
      status: req.body.status,
    };
    const member = await memberService.update(req.user, params);
    return ApiResponse.result(res, member, httpStatusCodes.OK);
  } catch (e) {
    if (e instanceof StringError) {
      return ApiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        e.message,
      );
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const penaltize: IController = async (req, res) => {
  try {
    const member = await memberService.penaltize({
      code: req.body.code,
    } as IPenaltizeMember);
    return ApiResponse.result(res, member, httpStatusCodes.OK);
  } catch (e) {
    if (e instanceof StringError) {
      return ApiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        e.message,
      );
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const list: IController = async (req, res) => {
  try {
    const members = await memberService.list();
    return ApiResponse.result(res, members, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

export default {
  create,
  getByUserId,
  update,
  penaltize,
  list,
};
