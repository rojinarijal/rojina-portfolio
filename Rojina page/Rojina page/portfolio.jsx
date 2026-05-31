import React, { useState, useEffect } from 'react';
import profileImg from './frontend/src/assets/profile.png';

export default function Portfolio() {
  // Preloader and Form States
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manage Preloader Timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Form Submission Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        }),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully! I will respond soon.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Animated Text Preloader */}
      <div className={`preloader ${!loading ? 'is-hidden' : ''}`} id="preloader" aria-hidden="true">
        <div className="preloader-mark" aria-label="Rojina Rijal loading">
          <span>R</span><span>O</span><span>J</span><span>I</span><span>N</span><span>A</span>
          <span>&nbsp;</span><span>&nbsp;</span>
          <span>R</span><span>I</span><span>J</span><span>A</span><span>L</span>
        </div>
        <button className="outline-button preloader-skip" id="skipLoader" type="button" onClick={() => setLoading(false)}>Skip</button>
      </div>

      <a className="skip-link" href="#main-content">Skip to main content</a>
           {/* Main Navigation Header */}
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Go to homepage">
          <span>Rojina Rijal</span>
          <small>Computing Student</small>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#education">Education</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="outline-button header-cta" href="#contact">Book a Call</a>
      </header>

      <main id="main-content">
        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Computing Student &bull; Web Dev &bull; Python</p>
            <h1><span>Rojina Rijal</span></h1> 
            <h2>creates simple and clean web projects, improving problem-solving and attention to detail.</h2>
            <p className="hero-text">
              I am a B.Sc (Hons) Computing student actively learning Python, HTML, and CSS. I am motivated to learn quickly, write clean code, and contribute effectively to web development tasks and team projects.
            </p>

            <div className="hero-actions" aria-label="Hero actions">
              <a className="solid-button" href="#contact">Start a Project</a>
              <a className="outline-button" href="#education">Explore Education</a>
            </div>

            <div className="hero-notes">
              <span>Student portfolio</span>
              <span>Web Development</span>
              <span>Problem Solving</span>
            </div>
          </div>

          <div className="hero-card" aria-label="Profile overview">
            <div className="portrait-frame">
              <img src={profileImg} alt="Rojina Rijal profile" />
            </div>

            <div className="stats-grid">
              <div>
                <span>Computing</span>
                <strong>Learning</strong>
              </div>
              <div>
                <span>Python</span>
                <strong>Focused</strong>
              </div>
              <div>
                <span>Web Dev</span>
                <strong>Growing</strong>
              </div>
              <div>
                <span>Projects</span>
                <strong>Building</strong>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section about-section" id="about">
          <div className="section-label">About</div>
          <div className="section-grid">
            <h2>Computing student focused on writing clean code and improving logical thinking.</h2>
            <div className="section-body">
              <p>
                I am Rojina Rijal, currently studying B.Sc (Hons) Computing at Itahari International College. I enjoy hands-on practice, improving logical thinking, problem-solving, and attention to detail.
              </p>
              <p>
                My focus is on actively learning Python, HTML, and CSS to create simple and clean web projects while contributing effectively to web development tasks.
              </p>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="section" id="education">
          <div className="section-label">Education</div>
          <div className="card-grid">
            <article className="feature-card">
              <span>2024 - Present</span>
              <h3>B.Sc (Hons) Computing</h3>
              <p>Itahari International College. Currently studying as a 4th semester student.</p>
            </article>
            <article className="feature-card">
              <span>2021 - 2024</span>
              <h3>+2 Computer Science</h3>
              <p>Himalaya Secondary School. Completed with a grade of 3.38.</p>
            </article>
            <article className="feature-card">
              <span>Certificates</span>
              <h3>Java OOP & Cyber Security</h3>
              <p>Completed Java OOP (Apr 2025) and Cyber Security (Aug 2025).</p>
            </article>
          </div>
        </section>

        {/* Skills Section */}
        <section className="section skills-section" id="skills">
          <div className="section-label">Skills</div>
          <div className="skill-list">
            <div><span>Programming</span><strong>HTML, CSS, JS, Python</strong></div>
            <div><span>Design</span><strong>UI/UX, Canva, Figma</strong></div>
            <div><span>Database</span><strong>MySQL, MariaDB</strong></div>
            <div><span>Version Control</span><strong>Git, GitHub</strong></div>
            <div><span>Soft Skills</span><strong>Problem Solving, Teamwork</strong></div>
            <div><span>Time Management</span><strong>Hardworking, Punctual</strong></div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="section" id="projects">
          <div className="section-label">Projects</div>
          <div className="card-grid">
            <article className="feature-card project-card">
              <span>Featured</span>
              <h3>Personal Portfolio</h3>
              <p>A professional website for Rojina Rijal with student profile, skills, and contact information.</p>
            </article>
            <article className="feature-card project-card">
              <span>Practice</span>
              <h3>Web Design Samples</h3>
              <p>Space reserved for future website concepts, landing pages, and class or personal projects.</p>
            </article>
            <article className="feature-card project-card">
              <span>Upcoming</span>
              <h3>Coding Projects</h3>
              <p>Placeholder for coding work, GitHub links, assignments, or apps you want to show later.</p>
            </article>
          </div>
        </section>
      </main>

      {/* Footer & Active Contact Section */}
      <footer className="site-footer" id="contact">
        <div className="footer-grid">
          <div>
            <a className="brand footer-brand" href="#home">
              <span>Rojina Rijal</span>
              <small>Computing Student</small>
            </a>
            <p>Computing &bull; Web Dev &bull; Python</p>
            <p className="contact-line">pujarijal0219@gmail.com</p>
            <p className="contact-line">+977 9709095224</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Start a Project</h2>
            <p>Send a quick message and I will respond soon.</p>
            
            {status.message && (
              <div className={`alert-${status.type}`} style={{ marginBottom: '1rem', padding: '0.5rem', borderRadius: '4px' }}>
                {status.message}
              </div>
            )}

            <label>
              <span>Your Name</span>
              <input 
                type="text" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required 
              />
            </label>
            <label>
              <span>Your Email</span>
              <input 
                type="email" 
                placeholder="Your Email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required 
              />
            </label>
            <label>
              <span>Project Details</span>
              <textarea 
                placeholder="Project Details"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>
            </label>
            <button className="solid-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="connect">
            <h2>Connect</h2>
            <div className="social-row" aria-label="Social links">
              <a href="https://www.linkedin.com/in/rojina-rijal-4b2108354" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">Linked in</a>
              <a href="https://github.com/rojinarijal" target="_blank" rel="noopener noreferrer" aria-label="GitHub">Github</a>
              <a href="https://www.instagram.com/the_rojinaa?igsh=MXNmOWJwMWRyNmRtcQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
              <a href="https://www.facebook.com/share/1CuGbM5inf/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
            </div>
            <div className="footer-nav">
              <a href="#about">About</a>
              <a href="#education">Education</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Rojina Rijal. All rights reserved.</span>
          <span>Damak, Jhapa &bull; Nepal</span>
        </div>
      </footer>
    </>
  );
}