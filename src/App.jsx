import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';
import Registration from './pages/Registration.jsx';

import './App.css';
function App() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Cultural Day',
      category: 'Culture',
      date: '2026-11-12',
      venue: 'Open Air Stage',
      description: 'Celebrate music, dance, art, and cultures from across campus.',
      registrations: 0,
    },
    {
      id: 2,
      title: 'Sports Meet',
      category: 'Sports',
      date: '2026-11-20',
      venue: 'College Ground',
      description: 'Support your classmates and take part in campus sports activities.',
      registrations: 0,
    },
    {
      id: 3,
      title: 'Web Design Session',
      category: 'Design',
      date: '2026-11-25',
      venue: 'Computer Lab',
      description: 'Learn the basics of web design and create your first web page layout.',
      registrations: 0,
    },
  ]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  // Add or remove an event from favourites
  function toggleFavorite(eventId) {
    setFavoriteIds((previous) =>
      previous.includes(eventId)
        ? previous.filter((id) => id !== eventId)
        : [...previous, eventId]
    );
  }
  // Add a new event
  function addEvent(newEvent) {
    setEvents((previous) => [
      ...previous,
      {
        ...newEvent,
        id: Date.now(),
        registrations: 0,
      },
    ]);
  }
  // Delete an event
  function deleteEvent(eventId) {
    setEvents((previous) =>
      previous.filter((event) => event.id !== eventId)
    );

    setFavoriteIds((previous) =>
      previous.filter((id) => id !== eventId)
    );
  }

  // Edit an event
  function editEvent(updatedEvent) {
    setEvents((previous) =>
      previous.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  }

  // Register for an event
  function registerEvent(eventId) {
    setEvents((previous) =>
      previous.map((event) =>
        event.id === eventId
          ? {
              ...event,
              registrations: (event.registrations || 0) + 1,
            }
          : event
      )
    );
  }

  return (
    <div className="website">

      {/* Navigation Bar */}
      <nav className="navbar">
        <Link to="/" className="logo">
          CampusConnect
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/register">Register</Link>

          <span className="favorites-count">
            <span className="nav-heart">♥</span>
            Favourites ({favoriteIds.length})
          </span>
        </div>
      </nav>

      {/* Page Navigation */}
      <main>
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/events"
            element={
              <Events
                events={events}
                favoriteIds={favoriteIds}
                onToggleFavorite={toggleFavorite}
                onAddEvent={addEvent}
                onDeleteEvent={deleteEvent}
                onEditEvent={editEvent}
                onRegister={registerEvent}
              />
            }
          />

          <Route
            path="/register"
            element={
              <Registration
                events={events}
                onRegister={registerEvent}
              />
            }
          />

        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        <h3>CampusConnect</h3>
        <p>Discover events. Meet people. Make memories.</p>
        <p>© 2026 CampusConnect. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;
