import { UserInputError } from 'apollo-server-core'
import { Book } from '../../../services/bookService/bookService.types'
import { Context } from '../../../types/serverTypes'

export type CreateBookProps = {
  book: Book
}

export type UpdateBookProps = {
  book: Book
}

export const bookMutations = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createBook: async (parent: never, args: CreateBookProps, context: Context) => {
    args.book.authorId = parseInt(String(args.book.authorId))
    args.book.name = args.book.name.trim()
    if (isNaN(args.book.authorId) || args.book.authorId === 0)
      throw new UserInputError(`Can't update book, something is wrong with your book authorId.`)
    if (args.book.name.length === 0) throw new UserInputError(`Missing book name, can not create book.`)

    const { data, success, safeError } = await context.services.bookService.createBook(args)
    if (!success) {
      throw new Error(`Error in BookService: ${safeError}`)
    }
    return data
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateBook: async (parent: never, args: UpdateBookProps, context: Context) => {
    args.book.id = parseInt(String(args.book.id))
    args.book.authorId = parseInt(String(args.book.authorId))
    args.book.name = args.book.name.trim()
    if (isNaN(args.book.authorId) || args.book.authorId === 0)
      throw new UserInputError(`Can't update book, something is wrong with your book authorId.`)
    if (isNaN(args.book.id) || args.book.id === 0) throw new UserInputError(`Can't update book, something is wrong with your book id.`)
    if (args.book.name.length === 0) throw new UserInputError('Missing book name, can not create book.')

    const { data, success, safeError } = await context.services.bookService.updateBook(args)
    if (!success) {
      throw new Error(`Error in BookService: ${safeError}`)
    }
    return data
  },
}
