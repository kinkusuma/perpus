import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '../../interfaces/IController';
import { IAddBook, IUpdateBook } from '../../interfaces/book.interface';

// Services
import bookService from '../../services/book/book.service';

// Errors
import { StringError } from '../../errors/string.error';

// Utilities
import ApiResponse from '../../utilities/api-response.utility';

const add: IController = async (req, res) => {
  try {
    const params: IAddBook = {
      code: req.body.code,
      title: req.body.title,
      author: req.body.author,
      stock: req.body.stock,
    };
    const book = await bookService.add(params);
    return ApiResponse.result(res, book, httpStatusCodes.CREATED);
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
    const books = await bookService.getAll();
    return ApiResponse.result(res, books);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const get: IController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const book = await bookService.get(id);
    return ApiResponse.result(res, book);
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

const update: IController = async (req, res) => {
  try {
    const params: IUpdateBook = {
      id: parseInt(req.params.id),
      code: req.body.code,
      title: req.body.title,
      author: req.body.author,
      stock: req.body.stock,
    };
    const book = await bookService.update(params);
    return ApiResponse.result(res, book);
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

const updateStock: IController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const stock = parseInt(req.body.stock);
    const book = await bookService.updateStock(id, stock);
    return ApiResponse.result(res, book);
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

const remove: IController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const book = await bookService.remove(id);
    return ApiResponse.result(res, book);
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

export default { add, list, get, update, updateStock, remove };
