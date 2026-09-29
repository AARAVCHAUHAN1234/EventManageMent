/**
 * Form field validators for student registration and event creation
 */

export function validateEmail(email) {
  if (!email || !email.trim()) {
    return 'Email address is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return null;
}

export function validatePhone(phone) {
  if (!phone || !phone.trim()) {
    return 'Phone number is required';
  }
  const cleaned = phone.replace(/[\s\-\+\(\)]/g, '');
  if (cleaned.length < 8 || cleaned.length > 15 || !/^\d+$/.test(cleaned)) {
    return 'Please enter a valid phone number (at least 8-10 digits)';
  }
  return null;
}

export function validateRegistrationForm(formData) {
  const errors = {};

  if (!formData.name || !formData.name.trim()) {
    errors.name = 'Full Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  if (!formData.college || !formData.college.trim()) {
    errors.college = 'College / University name is required';
  }

  if (!formData.year || !formData.year.trim()) {
    errors.year = 'Please select your academic year';
  }

  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateEventForm(formData) {
  const errors = {};

  if (!formData.title || !formData.title.trim()) {
    errors.title = 'Event title is required';
  }

  if (!formData.category || !formData.category.trim()) {
    errors.category = 'Category is required';
  }

  if (!formData.date) {
    errors.date = 'Event date is required';
  }

  if (!formData.time || !formData.time.trim()) {
    errors.time = 'Event time is required';
  }

  if (!formData.venue || !formData.venue.trim()) {
    errors.venue = 'Venue location is required';
  }

  if (!formData.shortDescription || !formData.shortDescription.trim()) {
    errors.shortDescription = 'Short description is required';
  } else if (formData.shortDescription.trim().length < 15) {
    errors.shortDescription = 'Short description must be at least 15 characters';
  }

  if (!formData.description || !formData.description.trim()) {
    errors.description = 'Full description is required';
  }

  if (!formData.registrationDeadline) {
    errors.registrationDeadline = 'Registration deadline is required';
  }

  if (formData.date && formData.registrationDeadline) {
    if (new Date(formData.registrationDeadline) > new Date(formData.date)) {
      errors.registrationDeadline = 'Deadline cannot be later than event date';
    }
  }

  const max = Number(formData.maxParticipants);
  if (!max || isNaN(max) || max <= 0) {
    errors.maxParticipants = 'Max participants must be a positive number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
