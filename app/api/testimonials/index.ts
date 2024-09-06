export async function getTestimonials() {
  const response = await fetch('/api/testimonials');
  if (!response.ok) {
    throw new Error('Failed to fetch testimonials');
  }
  return response.json();
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
