import type { Metadata } from 'next';
import { CountryLinks } from '@/components/designo/country-links';
import { ContactForm } from '@/components/designo/contact-form';
export const metadata:Metadata={title:'Contact',description:'Have a project in mind? Tell Designo about your idea. Explore web design, app design, and graphic design with a collaborative creative team.'};
export default function Contact(){return <main id="main-content" className="container contact-page"><section className="contact-hero"><div className="contact-copy"><span className="eyebrow">Let’s make something meaningful</span><h1>Contact us</h1><p>Have an idea, a question, or a challenge you’d love to solve? We’d like to hear it. Tell us a little about your business and where you want to go.</p><p className="contact-note">From your first sketch to your next big chapter,<br/>we’re here to help you find the way forward.</p></div><ContactForm/></section><CountryLinks/></main>;}
