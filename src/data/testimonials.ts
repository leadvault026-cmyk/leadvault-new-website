// Real, approved customer testimonials only. Leave empty until there are real
// quotes with the customer's permission. The Testimonials component renders
// nothing while this list is empty, so no placeholder quotes can appear.
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [];
