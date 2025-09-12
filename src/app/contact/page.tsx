import { ContactForm } from './components/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | UrbanEos AI',
    description: 'Get in touch with the UrbanEos AI team.',
};


export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We&apos;d love to hear from you! Whether you have a question, feedback, or just want to say hello.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="bg-card p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold font-headline mb-6">Contact Form</h2>
                <ContactForm />
            </div>
            <div className="space-y-8 pt-8">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Email</h3>
                        <p className="text-muted-foreground">General Inquiries</p>
                        <a href="mailto:hello@urbaneos.ai" className="text-primary hover:underline">hello@urbaneos.ai</a>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Phone</h3>
                        <p className="text-muted-foreground">Customer Support</p>
                        <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Office</h3>
                        <p className="text-muted-foreground">123 Green St, Urban City, 12345</p>
                        <a href="#" className="text-primary hover:underline">Get Directions</a>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
