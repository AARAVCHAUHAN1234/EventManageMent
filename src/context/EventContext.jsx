import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as storage from '../utils/storage';

const EventContext = createContext(null);

export function EventProvider({ children }) {
  const [events, setEvents] = useState(() => storage.getEvents());
  const [registrations, setRegistrations] = useState(() => storage.getRegistrations());

  // Reload data from localStorage
  const refreshData = useCallback(() => {
    setEvents(storage.getEvents());
    setRegistrations(storage.getRegistrations());
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Event actions
  const addNewEvent = useCallback((eventData) => {
    const created = storage.addEvent(eventData);
    refreshData();
    return created;
  }, [refreshData]);

  const editEvent = useCallback((id, updatedFields) => {
    const updated = storage.updateEvent(id, updatedFields);
    refreshData();
    return updated;
  }, [refreshData]);

  const removeEvent = useCallback((id) => {
    const result = storage.deleteEvent(id);
    refreshData();
    return result;
  }, [refreshData]);

  // Registration actions
  const registerStudent = useCallback((data) => {
    const result = storage.addRegistration(data);
    refreshData();
    return result;
  }, [refreshData]);

  const removeRegistration = useCallback((id) => {
    const result = storage.deleteRegistration(id);
    refreshData();
    return result;
  }, [refreshData]);

  const restoreDefaults = useCallback(() => {
    const result = storage.resetDemoData();
    refreshData();
    return result;
  }, [refreshData]);

  // Query helpers
  const getEventRegistrations = useCallback((eventId) => {
    return registrations.filter((r) => r.eventId === eventId);
  }, [registrations]);

  const getEventCapacity = useCallback((event) => {
    if (!event) return { count: 0, max: 0, percentage: 0, isFull: false, remaining: 0 };
    const count = registrations.filter((r) => r.eventId === event.id).length;
    const max = Number(event.maxParticipants) || 100;
    const percentage = Math.min(100, Math.round((count / max) * 100));
    const isFull = count >= max;
    const remaining = Math.max(0, max - count);
    return { count, max, percentage, isFull, remaining };
  }, [registrations]);

  return (
    <EventContext.Provider
      value={{
        events,
        registrations,
        refreshData,
        addNewEvent,
        editEvent,
        removeEvent,
        registerStudent,
        removeRegistration,
        restoreDefaults,
        getEventRegistrations,
        getEventCapacity,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
