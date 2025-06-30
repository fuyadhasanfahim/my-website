'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    ContactFormInterface,
    ContactValidation,
} from '@/validations/contact.validator';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function RootContactPage() {
    const form = useForm({
        resolver: zodResolver(ContactValidation),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            website: '',
            howDidYouFindUs: '',
            message: '',
        },
    });

    const onSubmit = async (data: ContactFormInterface) => {
        try {
            const response = await fetch('/api/contacts/new-contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok || response.status === 200) {
                toast.success('Form submitted successfully!');
                form.reset();
            } else {
                toast.error(
                    'Failed to submit the form. Please try again later.'
                );
            }
        } catch (error) {
            toast.error(
                (error as Error).message ||
                    'Failed to submit the form. Please try again later.'
            );
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="w-full max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">Contact us</CardTitle>
                        <CardDescription>
                            We&apos;re here to help you find the right solution.
                            Fill out the form below and we&apos;ll get back to
                            you as soon as possible.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 items-center gap-6">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Doe"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="john@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Phone Number (Optional)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="tel"
                                                placeholder="(123) 456-7890"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Website (Optional)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="url"
                                                placeholder="https://yourwebsite.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="howDidYouFindUs"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            How did you find us?
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select an option" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="search">
                                                    Search Engine
                                                </SelectItem>
                                                <SelectItem value="friend">
                                                    Friend or Colleague
                                                </SelectItem>
                                                <SelectItem value="social">
                                                    Social Media
                                                </SelectItem>
                                                <SelectItem value="other">
                                                    Other
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us a little bit about yourself or your inquiry"
                                                className="resize-none h-32"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={
                                form.formState.isLoading ||
                                form.formState.isSubmitting ||
                                !form.formState.isValid
                            }
                        >
                            {form.formState.isLoading ||
                            form.formState.isSubmitting
                                ? 'Submitting...'
                                : 'Submit'}{' '}
                            {form.formState.isLoading ||
                            form.formState.isSubmitting ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <Send />
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
