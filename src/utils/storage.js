import { INITIAL_EVENTS, INITIAL_REGISTRATIONS } from '../data/initialEvents';

const STORAGE_KEYS = {
  EVENTS: 'club_events',
  REGISTRATIONS: 'club_registrations',
  ADMIN_AUTH: 'club_admin_logged_in',
};

// Safe JSON parser helper
function safeParse(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return fallback;
  }
}

// Safe JSON setter helper
function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
    return false;
  }
}

/**
 * Initialize storage with default demo data if not present.
 */
export function initStorage() {
  const events = localStorage.getItem(STORAGE_KEYS.EVENTS);
  if (!events) {
    safeSet(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  }

  const registrations = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
  if (!registrations) {
    safeSet(STORAGE_KEYS.REGISTRATIONS, INITIAL_REGISTRATIONS);
  }
}

// ==========================================
// EVENTS OPERATIONS
// ==========================================

export function getEvents() {
  initStorage();
  return safeParse(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
}

export function saveEvents(events) {
  return safeSet(STORAGE_KEYS.EVENTS, events);
}

export function getEventById(id) {
  const events = getEvents();
  return events.find((e) => e.id === id) || null;
}

export function addEvent(eventData) {
  const events = getEvents();
  const newEvent = {
    ...eventData,
    id: eventData.id || `evt-${Date.now()}`,
    createdAt: new Date().toISOString(),
    isFeatured: !!eventData.isFeatured,
  };

  // If new event is featured, mark all others as non-featured
  let updatedEvents;
  if (newEvent.isFeatured) {
    updatedEvents = [
      newEvent,
      ...events.map((e) => ({ ...e, isFeatured: false })),
    ];
  } else {
    updatedEvents = [newEvent, ...events];
  }

  saveEvents(updatedEvents);
  return newEvent;
}

export function updateEvent(id, updatedFields) {
  const events = getEvents();
  const targetIndex = events.findIndex((e) => e.id === id);
  if (targetIndex === -1) return null;

  const willBeFeatured = !!updatedFields.isFeatured;

  const updatedEvents = events.map((event) => {
    if (event.id === id) {
      return { ...event, ...updatedFields };
    }
    // If updating this event to featured, ensure all other events become unfeatured
    if (willBeFeatured) {
      return { ...event, isFeatured: false };
    }
    return event;
  });

  saveEvents(updatedEvents);
  return updatedEvents.find((e) => e.id === id);
}

export function deleteEvent(id) {
  const events = getEvents();
  const updatedEvents = events.filter((e) => e.id !== id);
  saveEvents(updatedEvents);

  // Also remove associated registrations
  const registrations = getRegistrations();
  const updatedRegistrations = registrations.filter((r) => r.eventId !== id);
  saveRegistrations(updatedRegistrations);

  return true;
}

// ==========================================
// REGISTRATIONS OPERATIONS
// ==========================================

export function getRegistrations() {
  initStorage();
  return safeParse(STORAGE_KEYS.REGISTRATIONS, INITIAL_REGISTRATIONS);
}

export function saveRegistrations(registrations) {
  return safeSet(STORAGE_KEYS.REGISTRATIONS, registrations);
}

export function getRegistrationsByEvent(eventId) {
  const registrations = getRegistrations();
  return registrations.filter((r) => r.eventId === eventId);
}

export function isEmailRegisteredForEvent(eventId, email) {
  const registrations = getRegistrations();
  const normalizedEmail = (email || '').trim().toLowerCase();
  return registrations.some(
    (r) => r.eventId === eventId && r.email.trim().toLowerCase() === normalizedEmail
  );
}

export function addRegistration(registrationData) {
  const registrations = getRegistrations();
  const newRegistration = {
    ...registrationData,
    id: registrationData.id || `reg-${Date.now()}`,
    registeredAt: new Date().toISOString(),
  };

  const updated = [newRegistration, ...registrations];
  saveRegistrations(updated);
  return newRegistration;
}

export function deleteRegistration(id) {
  const registrations = getRegistrations();
  const updated = registrations.filter((r) => r.id !== id);
  saveRegistrations(updated);
  return true;
}

// ==========================================
// ADMIN AUTHENTICATION
// ==========================================

export function getAdminAuth() {
  try {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuth(isLoggedIn) {
  try {
    if (isLoggedIn) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
    return true;
  } catch (error) {
    console.error('Error saving auth state:', error);
    return false;
  }
}

export function logoutAdmin() {
  return setAdminAuth(false);
}

// ==========================================
// RESET DEMO DATA
// ==========================================

export function resetDemoData() {
  safeSet(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  safeSet(STORAGE_KEYS.REGISTRATIONS, INITIAL_REGISTRATIONS);
  return { events: INITIAL_EVENTS, registrations: INITIAL_REGISTRATIONS };
}
