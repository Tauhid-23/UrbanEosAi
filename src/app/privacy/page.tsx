import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | UrbanEos AI',
    description: 'Read the privacy policy for UrbanEos AI.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-h1:font-headline prose-h2:font-headline prose-p:text-muted-foreground">
        <h1>Privacy Policy</h1>
        <p>
          Your privacy is important to us. It is UrbanEos AI's policy to respect your privacy regarding any information we may collect from you across our website.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect in various ways, including to:
          <ul>
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>
        </p>
        
        <h2>3. Security</h2>
        <p>
          We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
        </p>

        <h2>4. Your Rights</h2>
        <p>
            You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
        </p>

        <p>
          This policy is effective as of June 2024.
        </p>
      </div>
    </div>
  );
}
