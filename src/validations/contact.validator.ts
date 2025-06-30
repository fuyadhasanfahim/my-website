import { z } from 'zod';

export const ContactValidation = z.object({
    firstName: z.string().nonempty({ message: 'First name is required.' }),
    lastName: z.string().nonempty({ message: 'Last name is required.' }),
    email: z
        .string()
        .email({ message: 'Please enter a valid email address.' })
        .nonempty({ message: 'Email is required.' }),
    phone: z.string().optional(),
    website: z
        .string()
        .url({ message: 'Please enter a valid URL.' })
        .optional(),
    howDidYouFindUs: z
        .string()
        .nonempty({ message: 'Please let us know how you found us.' }),
    message: z.string().nonempty({ message: 'Message is required.' }),
});

export type ContactFormInterface = z.infer<typeof ContactValidation>;
