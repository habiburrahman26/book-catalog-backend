import z from 'zod';

const bookSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  author: z.string({
    required_error: 'Author is required',
  }),
  image: z
    .string({
      required_error: 'Image is required',
    })
    .url({
      message: 'Image must be a valid URL',
    }),
  genre: z.string({
    required_error: 'Genre is required',
  }),
  publicationDate: z.number({
    required_error: 'Publication date is required',
  }),
});

const updateBookSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  image: z.string().url().optional(),
  genre: z.string().optional(),
  publicationDate: z.number().optional(),
});

export const BookValidation = {
  bookSchema,
  updateBookSchema
};
