import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '../../interfaces/IController';

// Services
import borrowService from '../../services/borrow/borrow.service';

// Errors
import { StringError } from '../../errors/string.error';

// Utilities
import ApiResponse from '../../utilities/api-response.utility';

const borrow: IController = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const borrowData = await borrowService.borrow(req.user, bookId);
    return ApiResponse.result(res, borrowData, httpStatusCodes.CREATED);
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

const returnBook: IController = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const borrowData = await borrowService.returnBook(req.user, bookId);
    return ApiResponse.result(res, borrowData);
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

const record: IController = async (req, res) => {
  try {
    const borrowData = await borrowService.getRecords(req.user);
    return ApiResponse.result(res, borrowData);
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
  borrow,
  returnBook,
  record,
};
