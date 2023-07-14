import z from 'zod';

const wishlistSchema = z.object({
  bookId: z.string({
    required_error: 'BookId is required',
  }),
});

export const WishlistValidation = {
  wishlistSchema,
};
