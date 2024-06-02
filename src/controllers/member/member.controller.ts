import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '../../interfaces/IController';
import { IUpdateStatusMember } from '../../interfaces/member.interface';

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
    await memberService.update(req.user, params);
    return ApiResponse.result(res, null, httpStatusCodes.OK);
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

export default {
  create,
  getByUserId,
  update,
};
