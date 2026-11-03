import { useState } from 'react';
import './EventList.css';

function AddEvent({ onAddEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Tech',
    date: '',
    venue: '',
    description: '',
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddEvent(formData);

    setFormData({
      title: '',
      category: 'Tech',
      date: '',
      venue: '',
      description: '',
    });
  }

  return (
    <div className="add-event-section">
      <h3>Add a New Event</h3>
      <p>Fill in the event details below.</p>

      <form onSubmit={handleSubmit}>
        <div className="add-event-grid">

          <div>
            <label>Event title *</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. React Workshop"
              required
            />
          </div>

          <div>
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Tech">Tech</option>
              <option value="Culture">Culture</option>
              <option value="Sports">Sports</option>
              <option value="Design">Design</option>
              <option value="Workshop">Workshop</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Venue *</label>
            <input
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="e.g. Seminar Hall"
              required
            />
          </div>

          <div className="add-event-full">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the event"
              rows="4"
              required
            />
          </div>

        </div>

        <button className="add-event-btn" type="submit">
          Add Event
        </button>
      </form>
    </div>
  );
}

export default AddEvent;
