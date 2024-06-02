import { getRepository, MoreThan } from 'typeorm';

// Entities
import { Book } from '../../entities/book/book.entity';

// Utilities
import ApiUtility from '../../utilities/api.utility';

// Interfaces
import { IAddBook, IUpdateBook } from '../../interfaces/book.interface';

// Errors
import { StringError } from '../../errors/string.error';

const add = async (params: IAddBook) => {
  const book = await getRepository(Book).findOne({ code: params.code });
  if (book) {
    throw new StringError('Book is already existed');
  }

  const item = new Book();
  item.code = params.code;
  item.title = params.title;
  item.author = params.author;
  item.stock = params.stock;
  const bookData = await getRepository(Book).save(item);
  return ApiUtility.sanitizeData(bookData);
};

const getAll = async () => {
  const books = await getRepository(Book).find({
    where: { stock: MoreThan(0) },
  });
  return books.map((book) => ApiUtility.sanitizeData(book));
};

const get = async (id: number) => {
  const book = await getRepository(Book).findOne({ id: id });
  if (!book) {
    throw new StringError('Book is not existed');
  }

  return ApiUtility.sanitizeData(book);
};

const update = async (params: IUpdateBook) => {
  const book = await getRepository(Book).findOne({ id: params.id });
  if (!book) {
    throw new StringError('Book is not existed');
  }

  book.code = params.code;
  book.title = params.title;
  book.author = params.author;
  book.stock = params.stock;

  await getRepository(Book).update({ id: params.id }, book);
  return ApiUtility.sanitizeData(book);
};

const updateStock = async (id: number, stock: number) => {
  const book = await getRepository(Book).findOne({ id: id });
  if (!book) {
    throw new StringError('Book is not existed');
  }

  book.stock = stock;
  await getRepository(Book).update({ id: id }, book);
  return ApiUtility.sanitizeData(book);
};

const remove = async (id: number) => {
  const book = await getRepository(Book).findOne({ id: id });
  if (!book) {
    throw new StringError('Book is not existed');
  }

  await getRepository(Book).delete({ id: id });
  return ApiUtility.sanitizeData(book);
};

export default { add, getAll, get, update, updateStock, remove };
