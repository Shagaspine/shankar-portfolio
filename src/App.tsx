import React, { useState } from 'react';
import profileData from './profile.json';
import * as Icons from 'lucide-react';

// ஐகான்களை JSON-ல் இருந்து தானாக எடுப்பதற்கான சின்ன ட்ரிக்
const DynamicIcon = ({ name, size = 24, className = "" }: { name: string, size?: number, className?: string }) => {
  // @ts-ignore
  const IconComponent = Icons[name] || Icons.Circle;
  return <IconComponent size={size} className={className} />;
};

function App() {
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('success');
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-black font-sans selection:bg-brand-yellow selection:text-brand-black">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-brand-bg/90 backdrop-blur-sm border-b-2 border-brand-black z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold text-xl tracking-tighter uppercase">{profileData.name}</span>
          <a href="#contact" className="bg-brand-yellow border-2 border-brand-black px-4 py-2 font-bold uppercase text-sm hover:shadow-brutal transition-all hover:-translate-y-0.5">
            Hire Me
          </a>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20 space-y-32">
        
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <div className="flex flex-wrap gap-2">
              {profileData.labels.map(label => (
                <span key={label} className="bg-white border-2 border-brand-black px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_#111]">
                  {label}
                </span>
              ))}
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter">
              {profileData.title.split(' & ').map((line, i) => (
                <React.Fragment key={i}>
                  {line} {i === 0 && <span className="text-brand-yellow">&</span>}<br/>
                </React.Fragment>
              ))}
            </h1>
            <p className="text-brand-gray text-lg md:text-xl max-w-md">
              {profileData.tagline}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#portfolio" className="bg-brand-black text-brand-yellow border-2 border-brand-black px-6 py-3 font-bold uppercase hover:bg-brand-yellow hover:text-brand-black shadow-brutal hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all flex items-center gap-2">
                Explore My Work <Icons.ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-square rounded-full border-4 border-brand-black overflow-hidden shadow-brutal-lg bg-brand-yellow">
              <img src={profileData.profileImage} alt={profileData.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        </section>

        {/* Link-in-Bio Hub */}
        <section className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-black uppercase text-center mb-8">Quick Links</h2>
          {profileData.links.map((link, idx) => (
            <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" 
               className={`block w-full border-2 border-brand-black p-4 flex items-center justify-between group transition-all duration-200
               ${link.primary ? 'bg-brand-yellow hover:bg-brand-black hover:text-brand-yellow' : 'bg-white hover:bg-brand-yellow'} 
               shadow-brutal hover:shadow-none hover:translate-y-1 hover:translate-x-1`}>
              <div className="flex items-center gap-4">
                <DynamicIcon name={link.icon} size={24} />
                <span className="font-bold text-lg uppercase tracking-wide">{link.title}</span>
              </div>
              <Icons.ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </section>

        {/* About & Experience */}
        <section className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-4xl font-black uppercase">About Me</h2>
            <p className="text-brand-gray leading-relaxed text-lg">{profileData.about}</p>
            <div className="flex flex-wrap gap-2 pt-4">
              {profileData.tools.map(tool => (
                <span key={tool} className="bg-brand-black text-white px-3 py-1 text-sm font-medium">{tool}</span>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-black uppercase">Experience</h2>
            <div className="space-y-6 border-l-4 border-brand-black pl-6 ml-2">
              {profileData.experience.map((exp, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute w-4 h-4 bg-brand-yellow border-2 border-brand-black rounded-full -left-[34px] top-1"></div>
                  <h3 className="font-bold text-xl uppercase">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-sm font-bold text-brand-gray mb-2">
                    <span className="text-brand-black">{exp.company}</span> • <span>{exp.period}</span>
                  </div>
                  <p className="text-brand-gray">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="space-y-12">
          <h2 className="text-4xl font-black uppercase text-center">Creative Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profileData.services.map((service, idx) => (
              <div key={idx} className="bg-white border-2 border-brand-black p-6 space-y-4 shadow-brutal hover:bg-brand-yellow transition-colors group cursor-default">
                <div className="group-hover:scale-110 transition-transform">
                   <DynamicIcon name={service.icon} size={32} />
                </div>
                <h3 className="font-bold text-xl uppercase leading-tight">{service.title}</h3>
                <p className="text-brand-gray group-hover:text-brand-black text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio Gallery */}
        <section id="portfolio" className="space-y-12">
          <h2 className="text-4xl font-black uppercase">Selected Work</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profileData.projects.map(project => (
              <a key={project.id} href={project.link} className="group block space-y-4">
                <div className="aspect-video bg-white border-2 border-brand-black overflow-hidden shadow-brutal group-hover:shadow-none group-hover:translate-y-1 group-hover:translate-x-1 transition-all relative">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-brand-yellow border-2 border-brand-black px-2 py-1 text-xs font-bold uppercase">
                    {project.category}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-xl uppercase group-hover:text-brand-yellow transition-colors">{project.title}</h3>
                  <p className="text-brand-gray text-sm">{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-brand-black text-white border-2 border-brand-black p-8 md:p-16 shadow-brutal-lg">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black uppercase leading-[1.1]"><span className="text-brand-yellow">Have an idea?</span><br/>Let's make something remarkable.</h2>
              <div className="space-y-4">
                <a href={`mailto:${profileData.email}`} className="flex items-center gap-4 hover:text-brand-yellow transition-colors">
                  <Icons.Mail size={24} /> <span className="text-lg">{profileData.email}</span>
                </a>
                <a href={`https://wa.me/${profileData.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-brand-yellow transition-colors">
                  <Icons.Phone size={24} /> <span className="text-lg">+{profileData.whatsapp.slice(0,2)} {profileData.whatsapp.slice(2,7)} {profileData.whatsapp.slice(7)}</span>
                </a>
              </div>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold uppercase mb-2">Name</label>
                <input type="text" required className="w-full bg-white text-brand-black border-2 border-transparent focus:border-brand-yellow px-4 py-3 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase mb-2">Email</label>
                <input type="email" required className="w-full bg-white text-brand-black border-2 border-transparent focus:border-brand-yellow px-4 py-3 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase mb-2">Project Details</label>
                <textarea required rows={4} className="w-full bg-white text-brand-black border-2 border-transparent focus:border-brand-yellow px-4 py-3 outline-none resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-yellow text-brand-black font-black uppercase tracking-wider py-4 hover:bg-white transition-colors">
                {formStatus === 'success' ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-brand-black bg-white">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-black uppercase text-xl">{profileData.name}</h3>
            <p className="text-brand-gray text-sm">{profileData.title} • {profileData.location}</p>
          </div>
          <div className="flex gap-4">
            <a href="#top" className="text-sm font-bold uppercase hover:text-brand-yellow transition-colors">Back to Top ↑</a>
          </div>
          <div className="text-brand-gray text-sm">
            © {new Date().getFullYear()} All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;