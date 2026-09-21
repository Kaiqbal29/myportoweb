import { useEffect, useState } from 'react';
import EditorForm from './components/EditorForm';
import PortfolioPreview from './components/PortfolioPreview';

// Data awal sengaja kosong. Contoh hanya muncul sebagai placeholder di form.
const dataAwal = {
  name: '',
  role: '',
  bio: '',
  location: '',
  email: '',
  avatar: '',
  about: '',
  skills: [],
  projects: [],
  experience: [],
  certifications: [],
  socialLinks: [],
};

function cloneData(data) {
  return JSON.parse(JSON.stringify(data));
}

function bacaDataTersimpan() {
  try {
    const dataTersimpan = localStorage.getItem('myporto-data');
    if (!dataTersimpan) return cloneData(dataAwal);

    const dataLama = JSON.parse(dataTersimpan);
    let socialLinks = dataLama.socialLinks;

    // Migrasi data versi pertama yang masih memakai object "social".
    if (!Array.isArray(socialLinks)) {
      socialLinks = Object.entries(dataLama.social || {}).map(([label, url]) => ({
        id: label,
        label: label.charAt(0).toUpperCase() + label.slice(1),
        url,
        visible: true,
      }));
    }

    return {
      ...cloneData(dataAwal),
      ...dataLama,
      skills: Array.isArray(dataLama.skills) ? dataLama.skills : [],
      projects: Array.isArray(dataLama.projects) ? dataLama.projects : [],
      experience: Array.isArray(dataLama.experience) ? dataLama.experience : [],
      certifications: Array.isArray(dataLama.certifications) ? dataLama.certifications : [],
      socialLinks: socialLinks || [],
    };
  } catch {
    return cloneData(dataAwal);
  }
}

function App() {
  const [portfolio, setPortfolio] = useState(bacaDataTersimpan);
  const [mode, setMode] = useState('editor');
  const [theme, setTheme] = useState(() => localStorage.getItem('myporto-theme') || 'light');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('myporto-data', JSON.stringify(portfolio));
      localStorage.setItem('myporto-theme', theme);
    } catch (error) {
      console.warn('Data terlalu besar untuk localStorage:', error);
    }

    setIsSaved(true);
    const timer = setTimeout(() => setIsSaved(false), 1500);
    return () => clearTimeout(timer);
  }, [portfolio, theme]);

  function updateField(field, value) {
    setPortfolio((current) => ({ ...current, [field]: value }));
  }

  function updateProject(projectId, field, value) {
    setPortfolio((current) => ({
      ...current,
      projects: current.projects.map((project) =>
        project.id === projectId ? { ...project, [field]: value } : project,
      ),
    }));
  }

  function addProject() {
    setPortfolio((current) => ({
      ...current,
      projects: [
        ...current.projects,
        { id: Date.now(), title: '', description: '', tech: '', link: '', image: '' },
      ],
    }));
  }

  function removeProject(projectId) {
    setPortfolio((current) => ({
      ...current,
      projects: current.projects.filter((project) => project.id !== projectId),
    }));
  }

  function updateExperience(experienceId, field, value) {
    setPortfolio((current) => ({
      ...current,
      experience: current.experience.map((item) =>
        item.id === experienceId ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function addExperience() {
    setPortfolio((current) => ({
      ...current,
      experience: [
        ...current.experience,
        { id: Date.now(), company: '', position: '', period: '', description: '' },
      ],
    }));
  }

  function removeExperience(experienceId) {
    setPortfolio((current) => ({
      ...current,
      experience: current.experience.filter((item) => item.id !== experienceId),
    }));
  }

  function updateCertification(certificationId, field, value) {
    setPortfolio((current) => ({
      ...current,
      certifications: current.certifications.map((item) =>
        item.id === certificationId ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function addCertification() {
    setPortfolio((current) => ({
      ...current,
      certifications: [
        ...current.certifications,
        { id: Date.now(), name: '', issuer: '', year: '', link: '' },
      ],
    }));
  }

  function removeCertification(certificationId) {
    setPortfolio((current) => ({
      ...current,
      certifications: current.certifications.filter((item) => item.id !== certificationId),
    }));
  }

  function updateSocialLink(socialId, field, value) {
    setPortfolio((current) => ({
      ...current,
      socialLinks: current.socialLinks.map((social) =>
        social.id === socialId ? { ...social, [field]: value } : social,
      ),
    }));
  }

  function addSocialLink() {
    setPortfolio((current) => ({
      ...current,
      socialLinks: [
        ...current.socialLinks,
        { id: Date.now(), label: '', url: '', visible: true },
      ],
    }));
  }

  function removeSocialLink(socialId) {
    setPortfolio((current) => ({
      ...current,
      socialLinks: current.socialLinks.filter((social) => social.id !== socialId),
    }));
  }

  function addSkill(skill) {
    const skillBersih = skill.trim();
    if (!skillBersih || portfolio.skills.includes(skillBersih)) return;
    setPortfolio((current) => ({ ...current, skills: [...current.skills, skillBersih] }));
  }

  function removeSkill(skillToRemove) {
    setPortfolio((current) => ({
      ...current,
      skills: current.skills.filter((skill) => skill !== skillToRemove),
    }));
  }

  function resetData() {
    if (window.confirm('Hapus semua data dan mulai dari form kosong?')) {
      setPortfolio(cloneData(dataAwal));
      setTheme('light');
    }
  }

  function exportPdf() {
    const judulLama = document.title;
    const judulBaru = portfolio.name ? `MyPorto - ${portfolio.name}` : 'MyPorto - Portfolio';
    const kembalikanJudul = () => {
      document.title = judulLama;
      window.removeEventListener('afterprint', kembalikanJudul);
    };

    document.title = judulBaru;
    window.addEventListener('afterprint', kembalikanJudul);
    window.print();
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="MyPorto beranda">
          <span className="brand-mark">M</span>
          <span>MyPorto</span>
        </a>
        <div className="topbar-actions">
          <span className={`save-status ${isSaved ? 'visible' : ''}`}>✓ Tersimpan otomatis</span>
          <button className="button button-ghost" onClick={resetData}>Reset data</button>
          <button className="button button-secondary export-button" onClick={exportPdf}>Export PDF</button>
          <a className="button button-primary" href="#preview">Lihat portfolio</a>
        </div>
      </header>

      <main id="top" className="workspace">
        <section className="intro-section">
          <div>
            <p className="eyebrow">PORTFOLIO BUILDER</p>
            <h1>Bangun portfolio yang mencerminkan dirimu.</h1>
            <p className="intro-copy">Isi informasi di panel editor. Tampilan portfolio akan berubah secara langsung di sebelah kanan.</p>
          </div>
          <div className="view-switcher" aria-label="Pilih tampilan">
            <button className={mode === 'editor' ? 'active' : ''} onClick={() => setMode('editor')}>Editor</button>
            <button className={mode === 'preview' ? 'active' : ''} onClick={() => setMode('preview')}>Preview</button>
          </div>
        </section>

        <div className={`builder-grid mode-${mode}`}>
          <section className="editor-column" aria-label="Editor portfolio">
            <EditorForm
              portfolio={portfolio}
              theme={theme}
              setTheme={setTheme}
              updateField={updateField}
              updateProject={updateProject}
              addProject={addProject}
              removeProject={removeProject}
              updateExperience={updateExperience}
              addExperience={addExperience}
              removeExperience={removeExperience}
              updateCertification={updateCertification}
              addCertification={addCertification}
              removeCertification={removeCertification}
              updateSocialLink={updateSocialLink}
              addSocialLink={addSocialLink}
              removeSocialLink={removeSocialLink}
              addSkill={addSkill}
              removeSkill={removeSkill}
            />
          </section>

          <section id="preview" className="preview-column" aria-label="Preview portfolio">
            <div className="preview-heading">
              <div>
                <p className="eyebrow">LIVE PREVIEW</p>
                <h2>Portfolio kamu</h2>
              </div>
              <span className="preview-dot"><i /> Live</span>
            </div>
            <PortfolioPreview portfolio={portfolio} theme={theme} />
          </section>
        </div>
      </main>

      <footer className="footer">
        <span>MyPorto · dibuat untuk belajar React</span>
        <span>Data tersimpan di browser kamu</span>
      </footer>
    </div>
  );
}

export default App;
