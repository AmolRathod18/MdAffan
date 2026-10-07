import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Activity, ArrowDown, ArrowDownRight, ArrowRight, ArrowUp, BarChart3, BrainCircuit, Check, ChevronDown, Code2, Database, Download, ExternalLink, Github, GraduationCap, Layers3, Leaf, Linkedin, Mail, MapPin, Menu, Moon, Network, Phone, ScanLine, Send, Sparkles, Sun, X } from 'lucide-react'

type Project = { title: string; category: string; description: string; date?: string; role?: string; demoUrl?: string; tech: string[]; features: string[]; kind: 'dashboard' | 'ml' | 'web' | 'agro' }
const projects: Project[] = [
  { title: 'IPL Analytics Dashboard', category: 'SPORTS ANALYTICS', description: 'Built an interactive dashboard to analyze IPL match and player data.', date: 'April 2026 – June 2026', tech: ['Power BI', 'SQL', 'Excel', 'Power Query'], features: ['Cleaned and transformed data using SQL and Power Query', 'Created KPIs for team performance, wins and player statistics', 'Developed interactive charts and season-wise filters', 'Generated insights on top teams, players and match trends'], kind: 'dashboard' },
  { title: 'Message & Email Spam Detection System', category: 'MACHINE LEARNING', description: 'Machine learning based application for classifying messages and emails as spam or legitimate.', date: 'March 2025 – June 2025', tech: ['Python', 'Flask', 'Scikit-learn', 'NLTK', 'Pandas'], features: ['Tokenization, stop-word removal and stemming', 'Dataset preprocessing', 'Multinomial Naive Bayes classification', 'Real-time prediction web interface'], kind: 'ml' },
  { title: 'Laptop & Desktop Rental Management System', category: 'WEB APPLICATION', description: 'Developed a web-based system to manage rental devices.', date: 'November 2022 – April 2023', tech: ['PHP', 'MySQL', 'WAMP'], features: ['User registration', 'Database management', 'System testing and debugging', 'Rental device management'], kind: 'web' },
  { title: 'AgroScan — Cauliflower Disease Detection', category: 'AI & AGRICULTURE', description: 'Contributed to AgroScan, a browser-based AI tool that helps identify cauliflower diseases from plant images.', role: 'PROJECT CONTRIBUTOR', demoUrl: 'https://cauliflower-plum.vercel.app/', tech: ['Deep Learning', 'Computer Vision', 'EfficientNetV2B0', 'On-device Inference'], features: ['Detects eight cauliflower disease classes', 'Reports 98.91% model accuracy', 'Returns predictions in under one second on modern devices', 'Supports offline diagnosis after the first load'], kind: 'agro' },
]
const skills = [
  { title: 'Programming & Query', icon: Code2, items: ['Python', 'SQL'] },
  { title: 'Data Science', icon: BrainCircuit, items: ['Machine Learning', 'Data Analysis', 'Data Cleaning', 'Data Preprocessing', 'Exploratory Data Analysis', 'Feature Engineering', 'Predictive Modeling', 'Statistics & Probability'] },
  { title: 'Libraries', icon: Layers3, items: ['Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'] },
  { title: 'Databases', icon: Database, items: ['MySQL', 'PostgreSQL'] },
  { title: 'Analytics & Tools', icon: BarChart3, items: ['Power BI', 'Microsoft Excel', 'Jupyter Notebook', 'Google Colab', 'Git & GitHub'] },
  { title: 'Core Concepts', icon: Network, items: ['DBMS', 'Data Structures', 'Statistics'] },
  { title: 'Soft Skills', icon: Sparkles, items: ['Analytical Thinking', 'Problem Solving', 'Critical Thinking', 'Communication', 'Attention to Detail', 'Team Collaboration', 'Time Management'] },
]
const journey = [
  { year: '2023 — 2025', degree: 'Master of Computer Applications', school: 'Karnatak University, Dharwad', result: 'CGPA 6.5', current: true },
  { year: '2021 — 2023', degree: 'Bachelor of Computer Application', school: 'Karnataka Science College', result: 'CGPA 6.5', current: false },
]
const education = [
  { name: 'Master of Computer Applications', type: 'MCA', school: 'Karnatak University, Dharwad', year: '2023 — 2025', result: 'CGPA 6.5' },
  { name: 'Bachelor of Computer Application', type: 'BCA', school: 'Karnataka Science College', year: '2021 — 2023', result: 'CGPA 6.5' },
  { name: 'PUC — Science', type: 'PUC', school: 'Prism PU Science College', year: '2019 — 2020', result: '62.2%' },
  { name: 'SSLC', type: 'SSLC', school: 'Pavan English School', year: '2018', result: '69%' },
]
const certificates = [
  { name: 'Web Development', issuer: 'Internz Learn', tags: ['Full-stack web development', 'Front-end & back-end', 'Database integration', 'REST APIs', 'Application deployment', 'Cloud computing fundamentals'], n: '01' },
  { name: 'Data Analytics and Data Science with GenAI', issuer: '', tags: ['Data Analytics', 'Machine Learning', 'Data Visualization', 'Statistical Analysis', 'Python · SQL · Excel · Power BI', 'Generative AI for data analysis and automation'], n: '02' },
]
const workflow = ['Raw Data', 'Data Cleaning', 'Exploratory Data Analysis', 'Feature Engineering', 'Machine Learning', 'Visualization', 'Actionable Insights']
const headlinePhrases = ['Meaningful Insights.', 'Smarter Decisions.', 'Data-Driven Impact.']

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .16 }} transition={{ duration: .55, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>
}
function ButtonLink({ href, children, secondary = false, onClick, download = false, icon }: { href: string; children: React.ReactNode; secondary?: boolean; onClick?: () => void; download?: boolean; icon?: React.ReactNode }) {
  return <a href={href} onClick={onClick} download={download || undefined} className={`button ${secondary ? 'button-secondary' : 'button-primary'}`}>{children}{icon ?? <ArrowRight size={15} />}</a>
}
function ProfilePortrait() {
  return <div className="portrait-art">
    <div className="portrait-glow" />
    <div className="portrait-frame">
      <img src="/images/affan-zia-portrait.png" alt="Affan Zia, data science and analytics professional" />
      <div className="portrait-caption"><span className="pulse-dot" /> AFFAN ZIA <i /> DATA &amp; ANALYTICS</div>
    </div>
    <div className="portrait-index mono">PROFILE / 001</div>
  </div>
}
function ProjectPreview({ kind }: { kind: Project['kind'] }) {
  if (kind === 'agro') return <div className="project-preview agro-preview"><div className="agro-scan-grid"/><div className="agro-plant"><Leaf size={48}/><span/><i/><i/><i/></div><div className="agro-scan-line"><ScanLine size={14}/> AI DIAGNOSIS</div><div className="agro-stat"><b>98.91%</b><span>ACCURACY</span></div><span className="agro-preview-label">AGROSCAN / 004</span></div>
  if (kind === 'dashboard') return <div className="project-preview dashboard-preview"><div className="preview-top"><span>IPL · SEASON OVERVIEW</span><span className="preview-live">● SEASON VIEW</span></div><div className="dash-kpis"><span><small>MATCHES</small><b>Overview</b></span><span><small>TEAM FORM</small><b>Compare</b></span><span><small>PLAYER STATS</small><b>Explore</b></span></div><div className="bars">{[34,52,44,68,53,80,62,91,71,59,78,48].map((h,i)=><i key={i} style={{height:`${h}%`, opacity:.35+(i%4)*.16}} />)}</div><div className="preview-bottom"><span>SEASON-WISE FILTERS</span><span>POWER BI + SQL</span></div></div>
  if (kind === 'ml') return <div className="project-preview ml-preview"><div className="ml-halo"/><div className="ml-window"><div className="window-bar"><i/><i/><i/><span>message_classifier.py</span></div><div className="window-code"><span><em>input</em> = <b>"Your message here..."</b></span><span><em>model</em>.predict(input)</span><span className="prediction"><Check size={12}/> Classification complete</span><span className="prediction-result">Legitimate <i>·</i> Spam</span></div></div><span className="ml-chip">Naive Bayes</span><span className="ml-orb orb-left"/><span className="ml-orb orb-right"/></div>
  return <div className="project-preview web-preview"><div className="web-grid"/><div className="rental-ui"><div className="rental-sidebar"><span className="rental-mark">R.</span><i/><i/><i/><i/></div><div className="rental-content"><div className="rental-label">DEVICE MANAGEMENT</div><b>Rental inventory</b><div className="device-row"><span>01</span><i/><div><b>Laptop</b><small>Available</small></div><span className="device-status">READY</span></div><div className="device-row"><span>02</span><i/><div><b>Desktop</b><small>On rent</small></div><span className="device-status muted-status">RENTED</span></div></div></div><span className="web-mark">PHP <i>×</i> MYSQL</span></div>
}
function App() {
  const reduceMotion = useReducedMotion()
  const [headlineIndex, setHeadlineIndex] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollControls, setShowScrollControls] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const [selected, setSelected] = useState<Project | null>(null)
  const [emailCopied, setEmailCopied] = useState(false)
  const [lightMode, setLightMode] = useState(() => window.localStorage.getItem('portfolio-theme') === 'light')
  useEffect(() => {
    if (reduceMotion) return
    const interval = window.setInterval(() => {
      setHeadlineIndex(index => (index + 1) % headlinePhrases.length)
    }, 3000)
    return () => window.clearInterval(interval)
  }, [reduceMotion])
  useEffect(() => {
    const updateScrollState = () => {
      setScrolled(window.scrollY > 20)
      setShowScrollControls(window.scrollY > window.innerHeight * .55)
    }
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])
  useEffect(() => {
    if (!selected) return
    const previousFocus = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null) }
    document.addEventListener('keydown', closeOnEscape)
    requestAnimationFrame(() => document.querySelector<HTMLButtonElement>('.modal-close')?.focus())
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', closeOnEscape)
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [selected])
  useEffect(() => {
    if (!menuOpen) return
    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target
      if (target instanceof Node && !navRef.current?.contains(target) && !menuToggleRef.current?.contains(target)) {
        setMenuOpen(false)
      }
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsidePointer)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])
  useEffect(() => {
    document.documentElement.dataset.theme = lightMode ? 'light' : 'dark'
    window.localStorage.setItem('portfolio-theme', lightMode ? 'light' : 'dark')
  }, [lightMode])
  const scrollPage = (direction: 'up' | 'down') => window.scrollTo({ top: direction === 'up' ? 0 : document.documentElement.scrollHeight, behavior: 'smooth' })
  const copyEmail = async () => { try { await navigator.clipboard.writeText('affaanzia642@gmail.com'); setEmailCopied(true); window.setTimeout(() => setEmailCopied(false), 1800) } catch { window.location.href = 'mailto:affaanzia642@gmail.com' } }
  const sendMessage = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = new FormData(event.currentTarget); const subject = `Portfolio inquiry from ${data.get('name')}`; const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`; window.location.href = `mailto:affaanzia642@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` }
  const closeMenu = () => setMenuOpen(false)
  return <>
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}><div className="nav-inner container"><a className="wordmark" href="#home" onClick={closeMenu}><span className="brand-mark">A</span><span className="wordmark-copy"><span className="wordmark-name">MOHAMMED AFFAN ZIA</span><small>DATA & ANALYTICS</small></span></a><button ref={menuToggleRef} className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button><nav ref={navRef} className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>{[['Home','#home'],['About','#about'],['Skills','#skills'],['Projects','#projects'],['Certificates','#certificates'],['Contact','#contact']].map(([label,href])=><a key={label} href={href} onClick={closeMenu}>{label}</a>)}<a className="nav-connect" href="#contact" onClick={closeMenu}>Let’s Connect <ArrowDownRight size={14}/></a></nav><button className="theme-toggle" type="button" onClick={() => setLightMode(!lightMode)} aria-label={`Switch to ${lightMode ? 'dark' : 'light'} mode`} title={`Switch to ${lightMode ? 'dark' : 'light'} mode`}>{lightMode ? <Moon size={17}/> : <Sun size={17}/>}</button></div></header>
    <main>
      <section id="home" className="hero"><div className="hero-noise"/><div className="container hero-layout"><div className="hero-copy"><motion.div className="hero-eyebrow" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.5}}><span className="pulse-dot"/> DATA SCIENCE <b>·</b> MACHINE LEARNING <b>·</b> ANALYTICS</motion.div><motion.h1 initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.1}}>Turning Data Into<br/><span className="hero-rotating-line" aria-live="polite"><AnimatePresence mode="wait" initial={false}><motion.span key={headlinePhrases[headlineIndex]} initial={{x:reduceMotion?0:'-100%'}} animate={{x:0}} exit={{x:reduceMotion?0:'100%'}} transition={{duration:reduceMotion?0:.55,ease:[.22,1,.36,1]}}>{headlinePhrases[headlineIndex]}</motion.span></AnimatePresence></span></motion.h1><motion.p className="hero-desc" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.22}}>MCA graduate and Data Science enthusiast passionate about Python, Machine Learning, Data Analytics and Data Visualization.</motion.p><motion.div className="hero-actions" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:.34}}><ButtonLink href="#projects">View My Projects</ButtonLink><ButtonLink href="#contact" secondary>Let’s Connect</ButtonLink><ButtonLink href="/Affan-Resume.pdf" secondary download icon={<Download size={15}/>} >Download Résumé</ButtonLink></motion.div><motion.div className="hero-socials" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.55}}><span>FIND ME</span><button aria-label="GitHub link not provided" title="GitHub link not provided" disabled><Github size={17}/></button><a href="https://www.linkedin.com/in/mohammed-affan-zia-086717399/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><Linkedin size={17}/></a><button aria-label="Copy email address" onClick={copyEmail}>{emailCopied ? <Check size={17}/> : <Mail size={17}/>}</button></motion.div></div><motion.div className="hero-visual" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:.8,delay:.18}}><ProfilePortrait/></motion.div></div><a href="#about" className="scroll-cue"><span/>SCROLL TO EXPLORE<ChevronDown size={13}/></a><div className="hero-index mono">01 / 06</div></section>
      <section id="about" className="section about-section"><div className="container"><Reveal><div className="section-kicker"><span className="eyebrow">A LITTLE ABOUT ME</span><span className="section-number">01 — PROFILE</span></div><h2 className="section-title">Curious by nature.<br/><span className="title-muted">Driven by data.</span></h2></Reveal><div className="about-grid"><Reveal className="about-copy"><p className="about-lead">Motivated MCA graduate with Data Science training and hands-on experience in data analysis, machine learning, and data visualization.</p><p>Skilled in Python, SQL, Pandas, NumPy, Scikit-learn and Power BI. I enjoy extracting meaningful insights from data and building predictive models.</p><div className="about-location"><MapPin size={15}/><span>Bengaluru, Karnataka</span><span className="location-divider"/> <span>Open to opportunities</span></div><div className="profile-chips"><span><GraduationCap/>MCA Graduate</span><span><BrainCircuit/>Data Science Enthusiast</span><span><Code2/>Python & Machine Learning</span></div></Reveal><Reveal className="journey-card surface" delay={.12}><div className="card-heading"><span>ACADEMIC JOURNEY</span><span className="journey-mark"><GraduationCap size={16}/></span></div>{journey.map(item=><div className="journey-item" key={item.year}><div className="journey-rail"><i className={item.current?'rail-active':''}/><span/></div><div className="journey-text"><span className="journey-year">{item.year}</span><h3>{item.degree}</h3><p>{item.school}</p><span className="journey-result">{item.result}</span></div></div>)}</Reveal></div></div></section>
      <section id="skills" className="section skills-section"><div className="container"><Reveal><div className="section-kicker"><span className="eyebrow">WHAT I WORK WITH</span><span className="section-number">02 — TOOLKIT</span></div><div className="skills-heading"><div><h2 className="section-title">Technical Arsenal</h2><p className="section-intro">A growing toolkit for exploring data, finding patterns and translating analysis into something useful.</p></div><div className="skills-stamp"><BrainCircuit/><span>DATA<br/>THINKING</span></div></div></Reveal><div className="skills-grid">{skills.map((group,i)=><Reveal key={group.title} delay={i*.045}><motion.article className="skill-card surface" whileHover={{y:-4,borderColor:'rgba(101,224,208,.26)'}} transition={{duration:.2}}><div className="skill-top"><span className="skill-icon"><group.icon size={17}/></span><span className="skill-index">0{i+1}</span></div><h3>{group.title}</h3><div className="skill-tags">{group.items.map(item=><span key={item}>{item}</span>)}</div></motion.article></Reveal>)}</div></div></section>
      <section className="workflow-section"><div className="container workflow-inner"><Reveal><div className="workflow-head"><div><span className="eyebrow">ANALYTICAL APPROACH</span><h2 className="section-title">From Raw Data<br/><span className="title-muted">to Insights.</span></h2></div><p className="section-intro">Every useful answer starts with a good question — and a thoughtful process.</p></div></Reveal><div className="workflow-track">{workflow.map((step,i)=><Reveal key={step} delay={i*.055}><motion.div className="workflow-step" whileHover={{y:-5}}><div className={`workflow-node ${i===6?'node-last':''}`}>{i===0?<Database size={17}/>:i===1?<Layers3 size={17}/>:i===2?<Activity size={17}/>:i===3?<Network size={17}/>:i===4?<BrainCircuit size={17}/>:i===5?<BarChart3 size={17}/>:<Sparkles size={17}/>}</div><span className="workflow-number">0{i+1}</span><span className="workflow-label">{step}</span>{i<workflow.length-1&&<span className="workflow-connector"><i/></span>}</motion.div></Reveal>)}</div><div className="workflow-foot"><span className="pulse-dot"/>A repeatable path from question to clarity.</div></div></section>
      <section id="projects" className="section projects-section"><div className="container"><Reveal><div className="section-kicker"><span className="eyebrow">SELECTED WORK</span><span className="section-number">03 — PROJECTS</span></div><div className="project-heading"><div><h2 className="section-title">Featured Projects</h2><p className="section-intro">A selection of work across analytics, machine learning, web development and agricultural AI.</p></div><span className="project-count mono">{String(projects.length).padStart(2,'0')} PROJECTS <ArrowDownRight size={15}/></span></div></Reveal><div className="projects-grid">{projects.map((project,i)=><Reveal key={project.title} delay={i*.09}><motion.article className="project-card surface" onClick={()=>setSelected(project)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setSelected(project)}}} role="button" tabIndex={0} aria-label={`View details for ${project.title}`} whileHover={{y:-5}} transition={{duration:.25}}><ProjectPreview kind={project.kind}/><div className="project-info"><div className="project-meta"><span>{project.category}</span><span>{project.role ?? project.date}</span></div><div className="project-title-row"><h3>{project.title}</h3><span className="project-arrow"><ArrowUpRightIcon/></span></div><p>{project.description}</p><div className="project-tech">{project.tech.map(tool=><span key={tool}>{tool}</span>)}</div><div className="project-open">VIEW PROJECT DETAILS <ArrowRight size={13}/></div></div></motion.article></Reveal>)}</div></div></section>
      <section id="certificates" className="section certificate-section"><div className="container"><Reveal><div className="section-kicker"><span className="eyebrow">CONTINUOUS LEARNING</span><span className="section-number">04 — CERTIFICATES</span></div><h2 className="section-title">Certifications & <span className="title-muted">Learning.</span></h2><p className="section-intro">Building a foundation through structured learning and hands-on exploration.</p></Reveal><div className="certificate-grid">{certificates.map((certificate,i)=><Reveal key={certificate.n} delay={i*.1}><motion.article className="certificate-card surface" whileHover={{y:-4}}><div className="certificate-top"><span className="certificate-index">{certificate.n} / 02</span><span className="certificate-icon"><GraduationCap size={19}/></span></div><h3>{certificate.name}</h3><p className="certificate-issuer" aria-hidden={!certificate.issuer}>{certificate.issuer || '\u00a0'}</p><div className="certificate-rule"/><div className="certificate-tags">{certificate.tags.map(tag=><span key={tag}><Check size={12}/>{tag}</span>)}</div><div className="certificate-footer"><span>LEARNING & DEVELOPMENT</span><ArrowDownRight size={15}/></div></motion.article></Reveal>)}</div></div></section>
      <section className="section education-section"><div className="container"><Reveal><div className="section-kicker"><span className="eyebrow">ACADEMIC BACKGROUND</span><span className="section-number">05 — EDUCATION</span></div><div className="education-heading"><h2 className="section-title">The foundation.</h2><span>Four steps in a learning journey.</span></div></Reveal><div className="education-list">{education.map((item,i)=><Reveal key={item.type} delay={i*.055}><div className="education-row"><span className="education-type">{item.type}</span><div className="education-school"><h3>{item.name}</h3><p>{item.school}</p></div><span className="education-year">{item.year}</span><span className="education-result">{item.result}</span><ArrowDownRight size={16} className="education-arrow"/></div></Reveal>)}</div></div></section>
      <section id="contact" className="section contact-section"><div className="contact-glow"/><div className="container"><Reveal><div className="section-kicker"><span className="eyebrow">START A CONVERSATION</span><span className="section-number">06 — CONTACT</span></div><div className="contact-heading"><h2 className="section-title">Let’s Build Something<br/><span>With Data.</span></h2><p>Have an opportunity, project or collaboration in mind? Let’s connect.</p></div></Reveal><div className="contact-grid"><Reveal className="contact-details"><button className="contact-detail" onClick={copyEmail}><span className="contact-icon">{emailCopied?<Check size={17}/>:<Mail size={17}/>}</span><span><small>EMAIL</small><b>{emailCopied?'Copied to clipboard':'affaanzia642@gmail.com'}</b></span><ArrowRight size={15} className="contact-arrow"/></button><a className="contact-detail" href="tel:+919886661502"><span className="contact-icon"><Phone size={17}/></span><span><small>PHONE</small><b>+91 9886661502</b></span><ArrowRight size={15} className="contact-arrow"/></a><div className="contact-detail"><span className="contact-icon"><MapPin size={17}/></span><span><small>LOCATION</small><b>Bengaluru, Karnataka</b></span><span className="contact-arrow location-pin"><span className="pulse-dot"/></span></div><div className="contact-social-row"><span>ELSEWHERE</span><button disabled title="GitHub link not provided" aria-label="GitHub link not provided"><Github size={16}/></button><a href="https://www.linkedin.com/in/mohammed-affan-zia-086717399/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><Linkedin size={16}/></a><span className="social-placeholder">GitHub link coming soon</span></div></Reveal><Reveal className="contact-form-wrap surface" delay={.12}><div className="form-heading"><div><span className="mini-label">YOUR MESSAGE</span><h3>Say hello.</h3></div><Send size={18}/></div><form onSubmit={sendMessage}><label>Your name<input name="name" type="text" placeholder="Jane Smith" required/></label><label>Email address<input name="email" type="email" placeholder="jane@example.com" required/></label><label>Your message<textarea name="message" placeholder="Tell me what you have in mind…" rows={4} required/></label><button className="button button-primary submit-button" type="submit">Send Message <ArrowRight size={15}/></button><span className="form-note">Opens your email app to send your message.</span></form></Reveal></div></div></section>
    </main>
    <footer className="footer"><div className="container footer-main"><a href="#home" className="footer-brand">MOHAMMED AFFAN ZIA<span>Data Science Enthusiast <i>·</i> MCA Graduate <i>·</i> Python & Machine Learning</span></a><a href="#home" className="back-top">BACK TO TOP <ArrowDownRight size={14}/></a></div><div className="container footer-bottom"><span>© 2026 Mohammed Affan Zia. All rights reserved.</span><span>BUILT WITH CURIOSITY <span className="footer-spark">✳</span></span></div></footer>
    <div className="page-scroll-controls" aria-label="Page scroll controls" hidden={!showScrollControls || menuOpen || Boolean(selected)}>
      <button type="button" onClick={() => scrollPage('up')} aria-label="Scroll to top" title="Scroll to top"><ArrowUp size={18}/></button>
      <button type="button" onClick={() => scrollPage('down')} aria-label="Scroll to bottom" title="Scroll to bottom"><ArrowDown size={18}/></button>
    </div>
    <AnimatePresence>
      {selected && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
          <motion.div className="project-modal surface" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{ opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ duration: .22 }} onClick={event => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close project details"><X size={18}/></button>
            <div className="modal-preview"><ProjectPreview kind={selected.kind}/></div>
            <span className="eyebrow">{selected.category}</span>
            <h2 id="modal-title">{selected.title}</h2>
            <p className="modal-description">{selected.description}</p>
            <div className="modal-date"><span>{selected.date ? 'TIMELINE' : 'ROLE'}</span><b>{selected.date ?? selected.role}</b></div>
            <div className="modal-block"><h3>TECHNOLOGIES</h3><div className="project-tech">{selected.tech.map(tool => <span key={tool}>{tool}</span>)}</div></div>
            <div className="modal-block"><h3>KEY FEATURES</h3><ul className="feature-list">{selected.features.map(feature => <li key={feature}><span><Check size={12}/></span>{feature}</li>)}</ul></div>
            <div className="modal-actions">
              {selected.demoUrl
                ? <a className="button button-primary" href={selected.demoUrl} target="_blank" rel="noopener noreferrer">Open Live Demo <ExternalLink size={15}/></a>
                : <span className="link-unavailable"><Github size={15}/> Project link not provided</span>}
              <button onClick={() => setSelected(null)} className="button button-secondary">Close <X size={14}/></button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
}
function ArrowUpRightIcon() { return <ArrowDownRight size={17} className="arrow-up-right"/> }
export default App
