/**
 * Format ISO date string into readable formats.
 */
export function formatDate(dateString) {
  if (!dateString) return 'TBA';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString) {
  if (!dateString) return 'TBA';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return dateString;
  }
}

/**
 * Returns true if event date or deadline is in the past.
 */
export function isDatePassed(dateString) {
  if (!dateString) return false;
  const target = new Date(dateString);
  // Compare with end of the day or exact time
  const now = new Date();
  // Set target to end of that day if only YYYY-MM-DD was provided
  if (dateString.length === 10) {
    target.setHours(23, 59, 59, 999);
  }
  return target < now;
}

/**
 * Determine event status: 'upcoming' or 'past'
 */
export function getEventStatus(event) {
  if (!event || !event.date) return 'upcoming';
  return isDatePassed(event.date) ? 'past' : 'upcoming';
}

/**
 * Calculate days remaining until a deadline.
 */
export function getDaysRemaining(dateString) {
  if (!dateString) return null;
  const target = new Date(dateString);
  if (dateString.length === 10) {
    target.setHours(23, 59, 59, 999);
  }
  const now = new Date();
  const diffMs = target - now;
  if (diffMs <= 0) return 0;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
