// NotificationContext.js
import { EventSourcePolyfill } from 'event-source-polyfill';
import React, { createContext, useContext, useEffect, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [eventSource, setEventSource] = useState(null);
  const [permission, setPermission] = useState('default');

  // Solicita permissão para notificações
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(perm => {
        setPermission(perm);
      });
    }
  }, []);

  // Configura o EventSource
  useEffect(() => {
    const initializeEventSource = () => {

    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdLCJzdWJzY3JpYmUiOlsiaHR0cHM6Ly9leGFtcGxlLmNvbS9teS1wcml2YXRlLXRvcGljIiwie3NjaGVtZX06Ly97K2hvc3R9L2RlbW8vYm9va3Mve2lkfS5qc29ubGQiLCIvLndlbGwta25vd24vbWVyY3VyZS9zdWJzY3JpcHRpb25zey90b3BpY317L3N1YnNjcmliZXJ9Il0sInBheWxvYWQiOnsidXNlciI6Imh0dHBzOi8vZXhhbXBsZS5jb20vdXNlcnMvZHVuZ2xhcyIsInJlbW90ZUFkZHIiOiIxMjcuMC4wLjEifX19.KKPIikwUzRuB3DTpVw6ajzwSChwFw5omBMmMcWKiDcM'
    const url = new URL("https://localhost/.well-known/mercure");
    url.searchParams.append("topic", "https://example.com/my-private-topic");

    const eventSource = new EventSourcePolyfill(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        showNativeNotification(data);
      };

      setEventSource(eventSource);
    };

    initializeEventSource();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  const showNativeNotification = (data) => {
    if (permission !== 'granted') return;
    
    const options = {
      body: data.message,
    };
    
    new Notification(data.title || 'Nova notificação', options);
  };

  return (
    <NotificationContext.Provider value={{ permission }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);