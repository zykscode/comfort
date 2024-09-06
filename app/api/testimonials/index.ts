export async function getTestimonials() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (typeof baseUrl !== 'string') {
    throw new Error('NEXT_PUBLIC_BASE_URL is not defined or not a string');
  }
  const res = await fetch(`${baseUrl}/api/testimonials`);
  if (!res.ok) {
    throw new Error('Failed to fetch testimonials');
  }
  return res.json();
}

export async function submitTestimonial(text: string) {
  const response = await fetch('/api/testimonials/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit testimonial');
  }

  return response.json();
}
