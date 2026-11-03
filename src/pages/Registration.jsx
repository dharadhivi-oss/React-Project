
import { useState } from 'react';
import './Registration.css';

function Registration({ events, onRegister }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
    year: '',
    password: '',
    attendance: 'In person',
    eventId: '',
    accessibility: false,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setSubmitted(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onRegister(Number(form.eventId));

    setSubmitted(true);

    setForm((previous) => ({
      ...previous,
      password: '',
    }));
  }

  function resetForm() {
    setForm({
      name: '',
      email: '',
      department: '',
      year: '',
      password: '',
      attendance: 'In person',
      eventId: '',
      accessibility: false,
      message: '',
    });

    setSubmitted(false);
  }

  return (
    <section className="registration-section">
      <h2>Student Event Registration</h2>
      <p>Complete the required fields to register for a campus event.</p>

      <form onSubmit={handleSubmit}>
        <div className="registration-grid">

          <div>
            <label>Student name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label>Email address *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="student@example.com"
              required
            />
          </div>

          <div>
            <label>Department *</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value="">Select your department</option>
              <option>Cybersecurity</option>
              <option>Computer Science</option>
              <option>Information Technology</option>
              <option>Electronics</option>
              <option>Mechanical</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label>Year of study</label>
            <input
              type="number"
              name="year"
              min="1"
              max="8"
              value={form.year}
              onChange={handleChange}
              placeholder="Example: 2"
            />
          </div>

          <div>
            <label>Create a demo password (optional)</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password input example"
              autoComplete="new-password"
            />
            <small>
              This is a teaching example only. No password is saved or sent.
            </small>
          </div>

          <fieldset className="attendance-field">
            <legend>How will you attend?</legend>

            <label>
              <input
                type="radio"
                name="attendance"
                value="In person"
                checked={form.attendance === 'In person'}
                onChange={handleChange}
              />
              In person
            </label>

            <label>
              <input
                type="radio"
                name="attendance"
                value="Online"
                checked={form.attendance === 'Online'}
                onChange={handleChange}
              />
              Online
            </label>
          </fieldset>

          <div className="registration-full">
            <label>Choose an event *</label>
            <select
              name="eventId"
              value={form.eventId}
              onChange={handleChange}
              required
            >
              <option value="">Select a campus event</option>

              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>

          <div className="registration-full">
            <label className="check-label">
              <input
                type="checkbox"
                name="accessibility"
                checked={form.accessibility}
                onChange={handleChange}
              />
              I would like the team to contact me about accessibility support.
            </label>
          </div>

          <div className="registration-full">
            <label>Message (optional)</label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              placeholder="Any questions or notes for the event team?"
            />
          </div>

        </div>

        <div className="registration-actions">
          <button type="submit">Submit Registration</button>

          <button type="button" onClick={resetForm}>
            Reset Form
          </button>
        </div>

        {submitted && (
          <p className="registration-success">
            Demo registration submitted successfully!
            No information has been sent to a server.
          </p>
        )}
      </form>
    </section>
  );
}

export default Registration;
