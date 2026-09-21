function PortfolioPreview({ portfolio, theme }) {
  const visibleSocialLinks = portfolio.socialLinks.filter((social) => social.visible && social.url);
  const firstName = portfolio.name ? portfolio.name.split(' ')[0] : 'nama kamu';

  return (
    <article className={`portfolio-preview preview-${theme}`}>
      <div className="portfolio-inner">
        <nav className="portfolio-nav">
          <span className="portfolio-logo">{portfolio.name.slice(0, 1) || 'M'}</span>
          <div className="portfolio-nav-links">
            <a href="#about-preview">Tentang</a>
            <a href="#projects-preview">Project</a>
            <a href="#experience-preview">Pengalaman</a>
            <a href={`mailto:${portfolio.email}`}>Kontak</a>
          </div>
        </nav>

        <section className="portfolio-hero">
          <div className="hero-copy">
            <p className="portfolio-eyebrow">Halo, saya {firstName}.</p>
            <h2>{portfolio.role || 'Role kamu di sini'}</h2>
            <p>{portfolio.bio || 'Bio singkat yang kamu tulis akan tampil di area ini.'}</p>
            <div className="hero-actions">
              <a className="portfolio-button" href="#projects-preview">Lihat project</a>
              <a className="portfolio-text-link" href={`mailto:${portfolio.email}`}>Hubungi saya ↗</a>
            </div>
          </div>
          <div className="avatar-wrap">
            {portfolio.avatar ? (
              <img src={portfolio.avatar} alt={`Foto ${portfolio.name}`} onError={(event) => { event.currentTarget.style.display = 'none'; }} />
            ) : (
              <div className="avatar-placeholder">Foto</div>
            )}
            <span className="avatar-decoration" />
          </div>
        </section>

        <section id="about-preview" className="portfolio-section about-preview-section">
          <div className="section-label">01 / TENTANG</div>
          <div>
            <h3>Sedikit tentang saya</h3>
            <p className={portfolio.about ? '' : 'preview-placeholder'}>{portfolio.about || 'Tentang kamu akan tampil di sini.'}</p>
            <p className={`location-line ${portfolio.location ? '' : 'preview-placeholder'}`}>⌖ {portfolio.location || 'Lokasi kamu'}</p>
          </div>
        </section>

        <section className="portfolio-section skills-preview-section">
          <div className="section-label">02 / KEAHLIAN</div>
          <div className="tag-list preview-tags">
            {portfolio.skills.length > 0 ? portfolio.skills.map((skill) => <span className="tag" key={skill}>{skill}</span>) : <p className="preview-placeholder">Keahlian yang kamu tambahkan akan tampil di sini.</p>}
          </div>
        </section>

        <section id="projects-preview" className="portfolio-section projects-preview-section">
          <div className="section-label">03 / PROJECT</div>
          <div className="project-grid">
            {portfolio.projects.length > 0 ? portfolio.projects.map((project, index) => (
              <a className="project-card" href={project.link || '#'} target="_blank" rel="noreferrer" key={project.id}>
                {project.image && (
                  <img className="project-image" src={project.image} alt={project.title || 'Foto project'} onError={(event) => { event.currentTarget.style.display = 'none'; }} />
                )}
                <div className="project-number">0{index + 1}</div>
                <h3>{project.title || 'Project tanpa judul'}</h3>
                <p>{project.description || 'Deskripsi project kamu.'}</p>
                <span className="project-tech">{project.tech || 'Teknologi'}</span>
                <span className="project-arrow">↗</span>
              </a>
            )) : <p className="preview-placeholder">Project yang kamu tambahkan akan tampil di sini.</p>}
          </div>
        </section>

        <section id="experience-preview" className="portfolio-section experience-preview-section">
          <div className="section-label">04 / PENGALAMAN</div>
          <div className="timeline-list">
            {portfolio.experience.length > 0 ? portfolio.experience.map((item) => (
              <article className="timeline-item" key={item.id}>
                <div className="timeline-period">{item.period || 'Periode'}</div>
                <div>
                  <h3>{item.position || 'Posisi kamu'}</h3>
                  <p className="timeline-company">{item.company || 'Nama perusahaan'}</p>
                  <p>{item.description || 'Deskripsi pengalaman kamu.'}</p>
                </div>
              </article>
            )) : <p className="preview-placeholder">Pengalaman kerja atau organisasi akan tampil di sini.</p>}
          </div>
        </section>

        {portfolio.certifications.length > 0 && (
          <section className="portfolio-section certifications-preview-section">
            <div className="section-label">05 / SERTIFIKASI</div>
            <div className="certification-grid">
              {portfolio.certifications.map((item) => (
                <a className="certification-card" href={item.link || '#'} target="_blank" rel="noreferrer" key={item.id}>
                  <span className="certificate-icon">✦</span>
                  <div>
                    <h3>{item.name || 'Nama sertifikasi'}</h3>
                    <p>{item.issuer || 'Penerbit'} · {item.year || 'Tahun'}</p>
                  </div>
                  <span className="project-arrow">↗</span>
                </a>
              ))}
            </div>
          </section>
        )}

        <section className="contact-banner">
          <div>
            <p className="portfolio-eyebrow">Punya project menarik?</p>
            <h3>Mari bekerja sama.</h3>
          </div>
          <a className="portfolio-button" href={`mailto:${portfolio.email}`}>Kirim email ↗</a>
        </section>

        <footer className="portfolio-footer">
          <span>© {new Date().getFullYear()} {portfolio.name || 'Nama kamu'}</span>
          {visibleSocialLinks.length > 0 && (
            <div className="social-links">
              {visibleSocialLinks.map((social) => (
                <a href={social.url} target="_blank" rel="noreferrer" key={social.id}>{social.label}</a>
              ))}
            </div>
          )}
        </footer>
      </div>
    </article>
  );
}

export default PortfolioPreview;
