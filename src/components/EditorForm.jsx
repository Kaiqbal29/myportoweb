import { useState } from 'react';

function Field({ label, hint, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}

function SectionCard({ number, title, description, children }) {
  return (
    <section className="editor-card">
      <div className="card-heading">
        <span className="step-number">{number}</span>
        <div>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function EditorForm({
  portfolio,
  theme,
  setTheme,
  updateField,
  updateProject,
  addProject,
  removeProject,
  updateExperience,
  addExperience,
  removeExperience,
  updateCertification,
  addCertification,
  removeCertification,
  updateSocialLink,
  addSocialLink,
  removeSocialLink,
  addSkill,
  removeSkill,
}) {
  const [skillInput, setSkillInput] = useState('');

  function handleAddSkill(event) {
    event.preventDefault();
    addSkill(skillInput);
    setSkillInput('');
  }

  function handlePhotoUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      window.alert('Silakan pilih file gambar seperti JPG, PNG, atau WEBP.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      window.alert('Ukuran foto maksimal 2 MB agar penyimpanan browser tetap aman.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => updateField('avatar', reader.result);
    reader.readAsDataURL(file);
  }

  function handleProjectPhotoUpload(event, projectId) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      window.alert('Silakan pilih file gambar seperti JPG, PNG, atau WEBP.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      window.alert('Ukuran foto project maksimal 2 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => updateProject(projectId, 'image', reader.result);
    reader.readAsDataURL(file);
    event.target.value = '';
  }

  return (
    <div className="editor-stack">
      <SectionCard number="01" title="Informasi utama" description="Informasi yang pertama kali dilihat pengunjung.">
        <div className="form-grid two-columns">
          <Field label="Nama lengkap">
            <input value={portfolio.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Contoh: Budi Santoso" />
          </Field>
          <Field label="Role / pekerjaan">
            <input value={portfolio.role} onChange={(event) => updateField('role', event.target.value)} placeholder="Contoh: Frontend Developer" />
          </Field>
        </div>
        <Field label="Bio singkat" hint="Maksimal 160 karakter agar tetap ringkas.">
          <textarea rows="3" maxLength="160" value={portfolio.bio} onChange={(event) => updateField('bio', event.target.value)} placeholder="Contoh: Saya membangun website yang cepat dan mudah digunakan." />
        </Field>
        <div className="form-grid two-columns">
          <Field label="Lokasi">
            <input value={portfolio.location} onChange={(event) => updateField('location', event.target.value)} placeholder="Contoh: Yogyakarta, Indonesia" />
          </Field>
          <Field label="Email">
            <input type="email" value={portfolio.email} onChange={(event) => updateField('email', event.target.value)} placeholder="Contoh: nama@email.com" />
          </Field>
        </div>

        <div className="photo-editor">
          <div className="photo-editor-preview">
            {portfolio.avatar ? (
              <img src={portfolio.avatar} alt="Preview foto profil" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
            ) : (
              <span className="photo-placeholder">Foto</span>
            )}
          </div>
          <div className="photo-editor-content">
            <span className="field-label">Foto profil</span>
            <p className="field-hint">Upload foto sendiri dalam format JPG, PNG, atau WEBP. Maksimal 2 MB.</p>
            <div className="photo-actions">
              <label className="button button-secondary upload-button">
                Upload foto
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handlePhotoUpload} />
              </label>
              <button type="button" className="text-button" onClick={() => updateField('avatar', '')}>Hapus foto</button>
            </div>
          </div>
        </div>
        <Field label="Atau gunakan URL foto" hint="URL ini akan digantikan jika kamu upload foto baru.">
          <input type="url" value={portfolio.avatar.startsWith('data:') ? '' : portfolio.avatar} onChange={(event) => updateField('avatar', event.target.value)} placeholder="Contoh: https://..." />
        </Field>
      </SectionCard>

      <SectionCard number="02" title="Tentang saya" description="Tulis cerita singkat yang terasa personal.">
        <Field label="Deskripsi">
          <textarea rows="5" value={portfolio.about} onChange={(event) => updateField('about', event.target.value)} placeholder="Contoh: Saya adalah fresh graduate yang tertarik pada pengembangan produk digital." />
        </Field>
      </SectionCard>

      <SectionCard number="03" title="Keahlian" description="Tambahkan teknologi atau kemampuan utama.">
        <div className="tag-list editor-tags">
          {portfolio.skills.map((skill) => (
            <span className="tag removable-tag" key={skill}>
              {skill}
              <button type="button" onClick={() => removeSkill(skill)} aria-label={`Hapus ${skill}`}>×</button>
            </span>
          ))}
        </div>
        <form className="inline-form" onSubmit={handleAddSkill}>
          <input value={skillInput} onChange={(event) => setSkillInput(event.target.value)} placeholder="Contoh: JavaScript atau React" />
          <button className="button button-secondary" type="submit">Tambah</button>
        </form>
      </SectionCard>

      <SectionCard number="04" title="Project" description="Tunjukkan karya yang paling ingin kamu ceritakan.">
        <div className="repeatable-list">
          {portfolio.projects.map((project, index) => (
            <div className="repeatable-item" key={project.id}>
              <div className="repeatable-title">
                <span>Project {index + 1}</span>
                <button className="text-button danger" type="button" onClick={() => removeProject(project.id)}>Hapus</button>
              </div>
              <div className="project-photo-editor">
                <div className="project-photo-preview">
                  {project.image ? (
                    <img src={project.image} alt={`Preview ${project.title || 'foto project'}`} onError={(event) => { event.currentTarget.style.display = 'none'; }} />
                  ) : (
                    <span>Foto project</span>
                  )}
                </div>
                <div className="project-photo-content">
                  <span className="field-label">Gambar project</span>
                  <p className="field-hint">Opsional. JPG, PNG, atau WEBP, maksimal 2 MB.</p>
                  <div className="photo-actions">
                    <label className="button button-secondary upload-button">
                      Upload gambar
                      <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleProjectPhotoUpload(event, project.id)} />
                    </label>
                    <button type="button" className="text-button" onClick={() => updateProject(project.id, 'image', '')}>Hapus</button>
                  </div>
                </div>
              </div>
              <Field label="Nama project">
                <input value={project.title} onChange={(event) => updateProject(project.id, 'title', event.target.value)} placeholder="Contoh: Study Planner" />
              </Field>
              <Field label="Deskripsi">
                <textarea rows="3" value={project.description} onChange={(event) => updateProject(project.id, 'description', event.target.value)} placeholder="Jelaskan masalah yang diselesaikan oleh project ini." />
              </Field>
              <div className="form-grid two-columns">
                <Field label="Teknologi">
                  <input value={project.tech} onChange={(event) => updateProject(project.id, 'tech', event.target.value)} placeholder="Contoh: React, CSS" />
                </Field>
                <Field label="Link project">
                  <input type="url" value={project.link} onChange={(event) => updateProject(project.id, 'link', event.target.value)} placeholder="Contoh: https://github.com/..." />
                </Field>
              </div>
            </div>
          ))}
        </div>
        <button className="button button-secondary full-width" type="button" onClick={addProject}>+ Tambah project</button>
      </SectionCard>

      <SectionCard number="05" title="Pengalaman kerja" description="Edit pengalaman kerja, freelance, organisasi, atau project kampus.">
        <div className="repeatable-list">
          {portfolio.experience.map((item, index) => (
            <div className="repeatable-item" key={item.id}>
              <div className="repeatable-title">
                <span>Pengalaman {index + 1}</span>
                <button className="text-button danger" type="button" onClick={() => removeExperience(item.id)}>Hapus</button>
              </div>
              <div className="form-grid two-columns">
                <Field label="Posisi">
                  <input value={item.position} onChange={(event) => updateExperience(item.id, 'position', event.target.value)} placeholder="Contoh: Frontend Developer" />
                </Field>
                <Field label="Perusahaan / organisasi">
                  <input value={item.company} onChange={(event) => updateExperience(item.id, 'company', event.target.value)} placeholder="Contoh: Nama perusahaan" />
                </Field>
              </div>
              <Field label="Periode">
                <input value={item.period} onChange={(event) => updateExperience(item.id, 'period', event.target.value)} placeholder="Contoh: 2024 - Sekarang" />
              </Field>
              <Field label="Deskripsi kontribusi">
                <textarea rows="3" value={item.description} onChange={(event) => updateExperience(item.id, 'description', event.target.value)} placeholder="Contoh: Membangun landing page responsif untuk bisnis kecil." />
              </Field>
            </div>
          ))}
        </div>
        <button className="button button-secondary full-width" type="button" onClick={addExperience}>+ Tambah pengalaman</button>
      </SectionCard>

      <SectionCard number="06" title="Sertifikasi" description="Tampilkan sertifikasi untuk memperkuat kredibilitasmu.">
        <div className="repeatable-list">
          {portfolio.certifications.map((item, index) => (
            <div className="repeatable-item" key={item.id}>
              <div className="repeatable-title">
                <span>Sertifikasi {index + 1}</span>
                <button className="text-button danger" type="button" onClick={() => removeCertification(item.id)}>Hapus</button>
              </div>
              <Field label="Nama sertifikasi">
                <input value={item.name} onChange={(event) => updateCertification(item.id, 'name', event.target.value)} placeholder="Contoh: Dasar Pemrograman Web" />
              </Field>
              <div className="form-grid two-columns">
                <Field label="Penerbit">
                  <input value={item.issuer} onChange={(event) => updateCertification(item.id, 'issuer', event.target.value)} placeholder="Contoh: Dicoding, Google, AWS" />
                </Field>
                <Field label="Tahun">
                  <input value={item.year} onChange={(event) => updateCertification(item.id, 'year', event.target.value)} placeholder="Contoh: 2025" />
                </Field>
              </div>
              <Field label="Link sertifikat" hint="Opsional, bisa berupa link verifikasi.">
                <input type="url" value={item.link} onChange={(event) => updateCertification(item.id, 'link', event.target.value)} placeholder="Contoh: https://..." />
              </Field>
            </div>
          ))}
        </div>
        <button className="button button-secondary full-width" type="button" onClick={addCertification}>+ Tambah sertifikasi</button>
      </SectionCard>

      <SectionCard number="07" title="Tema desain" description="Pilih tampilan yang paling sesuai dengan personal brand-mu.">
        <div className="theme-picker theme-picker-expanded">
          {[
            ['light', 'Clean', 'Terang'],
            ['dark', 'Midnight', 'Gelap'],
            ['ocean', 'Ocean', 'Biru'],
            ['lavender', 'Lavender', 'Ungu'],
            ['sunset', 'Sunset', 'Hangat'],
          ].map(([value, name, label]) => (
            <button key={value} type="button" className={`theme-option theme-${value} ${theme === value ? 'selected' : ''}`} onClick={() => setTheme(value)}>
              <span className="theme-sample" />
              <span><strong>{name}</strong><small>{label}</small></span>
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard number="08" title="Social media" description="Pilih social media yang ingin ditampilkan di portfolio.">
        <div className="repeatable-list">
          {portfolio.socialLinks.map((social, index) => (
            <div className="social-editor-row" key={social.id}>
              <label className="switch-control">
                <input type="checkbox" checked={social.visible} onChange={(event) => updateSocialLink(social.id, 'visible', event.target.checked)} />
                <span className="switch-slider" />
              </label>
              <div className="social-editor-fields">
                <div className="form-grid two-columns">
                  <Field label="Nama platform">
                    <input value={social.label} onChange={(event) => updateSocialLink(social.id, 'label', event.target.value)} placeholder="Contoh: GitHub" />
                  </Field>
                  <Field label="URL">
                    <input type="url" value={social.url} onChange={(event) => updateSocialLink(social.id, 'url', event.target.value)} placeholder="Contoh: https://..." />
                  </Field>
                </div>
              </div>
              <button className="text-button danger social-remove" type="button" onClick={() => removeSocialLink(social.id)} aria-label={`Hapus ${social.label}`}>Hapus</button>
              <span className="social-index">{index + 1}</span>
            </div>
          ))}
        </div>
        <button className="button button-secondary full-width" type="button" onClick={addSocialLink}>+ Tambah social media</button>
        <p className="field-hint standalone-hint">Social media yang dimatikan tidak akan muncul di bagian footer portfolio.</p>
      </SectionCard>
    </div>
  );
}

export default EditorForm;
