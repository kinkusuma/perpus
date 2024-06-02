import { Not, getRepository } from 'typeorm';

// Entities
import { Borrow } from '../../entities/borrow/borrow.entity';
import { Book } from '../../entities/book/book.entity';
import { User } from '../../entities/user/user.entity';
import { Member } from '../../entities/member/member.entity';

// Utilities
import ApiUtility from '../../utilities/api.utility';

// Services
import memberService from '../member/member.service';

// Errors
import { StringError } from '../../errors/string.error';

const borrow = async (user: User, bookId: number) => {
  const member = await getRepository(Member).findOne({ user: user });
  if (!member) {
    throw new StringError('User is not a member');
  }
  if (
    member.status !== 'active' ||
    new Date(
      member.penaltizedAt?.setDate(member.penaltizedAt.getDate() + 3) ||
        0,
    ) > new Date()
  ) {
    throw new StringError('User is not allowed to borrow book');
  }

  const borrowRecord = await getRepository(Borrow).find({
    returnedAt: null,
    member: member,
  });
  if (borrowRecord.length == 2) {
    throw new StringError('User has reached maximum borrow limit');
  }

  const book = await getRepository(Book).findOne({ id: bookId });
  if (!book) {
    throw new StringError('Book is not existed');
  }
  if (book.stock < 1) {
    throw new StringError('Book is out of stock');
  }

  book.stock -= 1;
  await getRepository(Book).update({ id: book.id }, book);

  const borrow = new Borrow();
  borrow.member = member;
  borrow.book = book;

  const borrowData = await getRepository(Borrow).save(borrow);
  return ApiUtility.sanitizeData(borrowData);
};

const returnBook = async (user: User, bookId: number) => {
  const member = await getRepository(Member).findOne({ user: user });
  if (!member) {
    throw new StringError('User is not a member');
  }

  const book = await getRepository(Book).findOne({ id: bookId });
  if (!book) {
    throw new StringError('Book is not existed');
  }

  const borrow = await getRepository(Borrow).findOne({
    member: member,
    book: book,
    returnedAt: null,
  });
  if (!borrow) {
    throw new StringError(
      'Borrow record is not existed or already returned',
    );
  }

  if (
    borrow.createdAt <
    new Date(new Date().setDate(new Date().getDate() - 7))
  ) {
    await memberService.penaltize({ code: member.code });
  }

  book.stock += 1;
  await getRepository(Book).update({ id: book.id }, book);

  borrow.returnedAt = new Date();
  await getRepository(Borrow).update({ id: borrow.id }, borrow);

  return ApiUtility.sanitizeData(borrow);
};

const getRecords = async (user: User) => {
  const member = await getRepository(Member).findOne({ user: user });
  if (!member) {
    throw new StringError('User is not a member');
  }

  const borrows = await getRepository(Borrow).find({
    where: { member: member, returnedAt: Not(null) },
  });
  return borrows.map((borrow) => ApiUtility.sanitizeData(borrow));
};

export default {
  borrow,
  returnBook,
  getRecords,
};
