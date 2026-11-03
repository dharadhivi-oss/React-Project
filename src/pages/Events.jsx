import { useState } from 'react';
import AddEvent from './EventList.jsx';
import './Events.css';

function Events({
  events,
  favoriteIds,
  onToggleFavorite,
  onAddEvent,
  onDeleteEvent,
  onEditEvent,
  onRegister,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  function startEdit(event) {
    setEditingId(event.id);
    setEditData({ ...event });
  }

  function saveEdit() {
    onEditEvent(editData);
    setEditingId(null);
  }

  return (
    <section className="events-section" id="events">

      <div className="section-heading">
        <p className="section-label">DISCOVER YOUR CAMPUS</p>
        <h1>Upcoming Events</h1>
        <p>Find opportunities to learn, connect, and participate.</p>
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <article className="event-card" key={event.id}>

            <div className={`event-category ${(event.category || 'other').toLowerCase()}`}>
              {(event.category || 'Other').toUpperCase()}
            </div>

            <div className="event-details">

              {editingId === event.id ? (
                <>
                  <input
                    value={editData.title || ''}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    placeholder="Event title"
                  />

                  <input
                    value={editData.venue || ''}
                    onChange={(e) =>
                      setEditData({ ...editData, venue: e.target.value })
                    }
                    placeholder="Venue"
                  />

                  <input
                    type="date"
                    value={editData.date || ''}
                    onChange={(e) =>
                      setEditData({ ...editData, date: e.target.value })
                    }
                  />

                  <textarea
                    value={editData.description || ''}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  />

                  <button onClick={saveEdit} className="register-btn">
                    Save Changes
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="delete-btn"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>

                  <p className="event-info">
                    <strong>Date:</strong> {event.date}
                  </p>

                  <p className="event-info">
                    <strong>Venue:</strong> {event.venue}
                  </p>

                  <p className="event-info">
                    <strong>Registrations:</strong> {event.registrations ?? 0}
                  </p>

                  <p className="event-info">
                    <strong>Event ID:</strong> {event.id}
                  </p>

                  <div className="event-actions">
                    <button
                      className="register-btn"
                      onClick={() => onRegister(event.id)}
                    >
                      Register
                    </button>

                    <button
                      type="button"
                      className={`favorite-btn ${
                        favoriteIds.includes(event.id) ? 'favorited' : ''
                      }`}
                      onClick={() => onToggleFavorite(event.id)}
                    >
                      {favoriteIds.includes(event.id)
                        ? '♥ Added to Favorites'
                        : '♡ Add Favorite'}
                    </button>
                  </div>

                  <div className="manage-actions">
                    <button
                      className="edit-btn"
                      onClick={() => startEdit(event)}
                    >
                      Edit Event
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => onDeleteEvent(event.id)}
                    >
                      Delete Event
                    </button>
                  </div>
                </>
              )}

            </div>
          </article>
        ))}
      </div>

      <AddEvent onAddEvent={onAddEvent} />

    </section>
  );
}

export default Events;
