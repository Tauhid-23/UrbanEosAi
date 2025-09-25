
'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { createBlogPost, BlogPostState } from '@/lib/actions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters.'),
  content: z.string().min(50, 'Content must be at least 50 characters.'),
  category: z.string().min(2, 'Category must be at least 2 characters.'),
  author: z.string().min(2, 'Author must be at least 2 characters.'),
  imageId: z.string().min(1, 'Image ID is required.'),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Create Post
    </Button>
  );
}

export default function CreateBlogPostForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const initialState: BlogPostState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(createBlogPost, initialState);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      category: 'Beginner Tips',
      author: 'Jane Doe',
      imageId: 'blog-post-1',
    },
  });

  useEffect(() => {
    if (state.message && !state.errors) {
      toast({
        title: 'Success!',
        description: state.message,
      });
      form.reset();
      formRef.current?.reset();
    } else if (state.message && state.errors) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast, form]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={dispatch}
        onSubmit={form.handleSubmit(() => dispatch(new FormData(formRef.current!)))}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input placeholder="Your amazing post title" {...field} />
              </FormControl>
              <FormMessage>{state.errors?.title}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A short summary of your post"
                  {...field}
                />
              </FormControl>
              <FormMessage>{state.errors?.excerpt}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content (HTML)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="<p>Start writing your post content here...</p>"
                  className="resize-y"
                  rows={8}
                  {...field}
                />
              </FormControl>
              <FormMessage>{state.errors?.content}</FormMessage>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Beginner Tips" {...field} />
                </FormControl>
                <FormMessage>{state.errors?.category}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Jane Doe" {...field} />
                </FormControl>
                <FormMessage>{state.errors?.author}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="imageId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a placeholder image" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PlaceHolderImages.map((img) => (
                    <SelectItem key={img.id} value={img.id}>
                      {img.description} ({img.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage>{state.errors?.imageId}</FormMessage>
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}

    