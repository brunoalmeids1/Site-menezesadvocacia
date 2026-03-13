import React, { useState, useEffect } from 'react';
import { 
  Scale, ShieldCheck, Briefcase, FileText, MapPin, Phone, Instagram, Linkedin, 
  Facebook, Menu, X, ChevronRight, Clock, UserCheck, Award, Globe, ArrowUpRight, 
  MessageSquare, Mail, Calendar, BookOpen, Megaphone, Sparkles, Loader2
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');
  const [showPopup, setShowPopup] = useState(false); // Inicia como falso para o delay
  const [lang, setLang] = useState('pt');
  const [loadingNews, setLoadingNews] = useState(false);
  
  const apiKey = "";

  // DICIONÁRIO DE TRADUÇÕES
  const content = {
    pt: {
      nav: ["Escritório", "Atuação", "Blog", "Contacto"],
      consultBtn: "Consultoria Online",
      popupTitle: "Comunicado Importante",
      popupAviso: "AVISO (15/03/26): Devido ao excesso de recebimento de ligações robóticas de telemarketing, solicitamos que o primeiro contato seja realizado via WhatsApp.",
      popupFooter: "As respostas serão fornecidas por nossa equipe através do WhatsApp e/ou chamadas telefônicas convencionais.",
      popupClose: "Compreendi",
      heroBadge: "Excelência Jurídica desde 2002",
      heroTitle: "Justiça que",
      heroTitleItalic: "Protege.",
      heroDesc: "Combinamos duas décadas de tradição jurídica com as soluções digitais mais avançadas para defender os seus direitos em todo o país.",
      heroCTA: "Agendar Reunião",
      heroDigital: "Digital-First",
      heroRegion: "Atendimento em todo o Brasil",
      expSubtitle: "O que fazemos",
      expTitle: "Domínio Técnico Especializado",
      areas: [
        { title: "Direito Previdenciário", desc: "Especialistas em reformas, pensões e revisões de benefícios do INSS." },
        { title: "Ações Indemnizatórias", desc: "Defesa técnica em casos de danos morais, materiais e responsabilidade civil." },
        { title: "Ativos Judiciais", desc: "Gestão e antecipação de precatórios com total segurança e transparência." },
        { title: "Direito Imobiliário", desc: "Assessoria em escrituras, registos e regularização de bens imóveis." }
      ],
      blogSubtitle: "Conhecimento Automatizado via IA",
      blogTitle: "Notícias Jurídicas em Tempo Real",
      blogMore: "Atualizar Notícias",
      readMore: "Ler mais",
      contactTitle: "Estratégia personalizada para o seu caso.",
      formName: "Nome do Titular",
      formPhone: "WhatsApp / Telemóvel",
      formSubject: "Assunto Jurídico",
      formSubmit: "Enviar Solicitação",
      formSuccess: "Enviado com Sucesso!",
      footerDesc: "Empresarial Rio Mar, Torre C, Sala 2801, Recife/PE."
    },
    en: {
      nav: ["About", "Expertise", "Blog", "Contact"],
      consultBtn: "Online Consulting",
      popupTitle: "Important Notice",
      popupAviso: "NOTICE (02/15/24): Due to an excess of robotic telemarketing calls, we request that the first contact be made via WhatsApp.",
      popupFooter: "Responses will be provided by our team via WhatsApp and/or conventional telephone calls.",
      popupClose: "Understood",
      heroBadge: "Legal Excellence since 2002",
      heroTitle: "Justice that",
      heroTitleItalic: "Protects.",
      heroDesc: "We combine two decades of legal tradition with the most advanced digital solutions to defend your rights nationwide.",
      heroCTA: "Schedule Meeting",
      heroDigital: "Digital-First",
      heroRegion: "Nationwide Service",
      expSubtitle: "What we do",
      expTitle: "Specialized Technical Domain",
      areas: [
        { title: "Social Security Law", desc: "Specialists in retirement, pensions, and INSS benefit reviews." },
        { title: "Indemnity Actions", desc: "Technical defense in cases of moral/material damages and civil liability." },
        { title: "Judicial Assets", desc: "Management and anticipation of court-ordered debts with total security." },
        { title: "Real Estate Law", desc: "Assistance in deeds, registrations, and regularization of real estate assets." }
      ],
      blogSubtitle: "Automated AI Knowledge",
      blogTitle: "Real-Time Legal News",
      blogMore: "Refresh News",
      readMore: "Read more",
      contactTitle: "Personalized strategy for your case.",
      formName: "Full Name",
      formPhone: "WhatsApp / Mobile",
      formSubject: "Legal Subject",
      formSubmit: "Send Request",
      formSuccess: "Sent Successfully!",
      footerDesc: "Rio Mar Business Center, Tower C, Room 2801, Recife/PE."
    },
    es: {
      nav: ["Despacho", "Actuación", "Blog", "Contacto"],
      consultBtn: "Consultoría Online",
      popupTitle: "Comunicado Importante",
      popupAviso: "AVISO (15/2/24): Debido al exceso de llamadas robóticas de telemarketing, solicitamos que o primeiro contacto se realice vía WhatsApp.",
      popupFooter: "Las respuestas serão fornecidas por nuestro equipo a través de WhatsApp y/o chamadas telefónicas convencionales.",
      popupClose: "Entendido",
      heroBadge: "Excelencia Jurídica desde 2002",
      heroTitle: "Justicia que",
      heroTitleItalic: "Protege.",
      heroDesc: "Combinamos dos décadas de tradición jurídica con as soluciones digitales más avanzadas para defender sus derechos en todo o país.",
      heroCTA: "Agendar Reunión",
      heroDigital: "Digital-First",
      heroRegion: "Atención em todo o Brasil",
      expSubtitle: "Qué hacemos",
      expTitle: "Dominio Técnico Especializado",
      areas: [
        { title: "Derecho Previsional", desc: "Especialistas en jubilaciones, pensiones y revisiones de beneficios del INSS." },
        { title: "Acciones de Indemnización", desc: "Defensa técnica en casos de daños morales, materiales y responsabilidad civil." },
        { title: "Activos Judiciales", desc: "Gestión y anticipación de mandatos judiciales con total seguridad." },
        { title: "Derecho Inmobiliario", desc: "Asesoría en escrituras, registros y regularización de bienes inmuebles." }
      ],
      blogSubtitle: "Conocimiento Automatizado por IA",
      blogTitle: "Noticias Jurídicas en Tiempo Real",
      blogMore: "Actualizar Noticias",
      readMore: "Leer más",
      contactTitle: "Estrategia personalizada para su caso.",
      formName: "Nombre Completo",
      formPhone: "WhatsApp / Celular",
      formSubject: "Asunto Jurídico",
      formSubmit: "Enviar Solicitud",
      formSuccess: "¡Enviado con Éxito!",
      footerDesc: "Empresarial Rio Mar, Torre C, Sala 2801, Recife/PE."
    }
  };

  const t = content[lang];

  // BLOG DATA STATE
  const [blogPosts, setBlogPosts] = useState([
    { 
      title: "Impacto da IA no Direito em 2025", 
      excerpt: "Como as novas tecnologias estão acelerando processos judiciais no Brasil.", 
      date: "01 Mar", category: "Inovação", 
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600" 
    },
    { 
      title: "Novas Regras de Precatórios Federais", 
      excerpt: "Conselho de Justiça aprova mudanças no cronograma de pagamentos para 2026.", 
      date: "28 Fev", category: "Ativos", 
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600" 
    }
  ]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Timer de 3 segundos para o pop-up
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => { 
      window.removeEventListener('scroll', handleScroll); 
      clearTimeout(popupTimer); 
    };
  }, []);

  const fetchLegalNews = async () => {
    setLoadingNews(true);
    const prompt = `Gere 3 notícias jurídicas fictícias e atuais para um blog de advocacia em formato JSON. Tópicos: Precatórios, INSS e Direito Imobiliário. A resposta deve ser APENAS o JSON com os campos: title, excerpt, date, category. Retorne em Português.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      const result = await response.json();
      const newsJson = JSON.parse(result.candidates[0].content.parts[0].text);
      
      const updatedNews = newsJson.map((item, i) => ({
        ...item,
        image: `https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=600&sig=${i}`
      }));
      
      setBlogPosts(updatedNews);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
    } finally {
      setLoadingNews(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  const doublePosts = [...blogPosts, ...blogPosts];

  return (
    <div className="min-h-screen bg-[#0B1120] font-sans text-slate-300 antialiased selection:bg-[#C5A059] selection:text-white overflow-x-hidden">
      
      {/* LANGUAGE SELECTOR TOPBAR */}
      <div className="bg-[#0f172a] py-2 px-6 border-b border-white/5 relative z-[110]">
        <div className="container mx-auto flex justify-end gap-6 text-[10px] font-bold tracking-widest uppercase">
          <button onClick={() => setLang('pt')} className={`flex items-center gap-2 hover:text-[#C5A059] transition ${lang === 'pt' ? 'text-[#C5A059]' : 'text-slate-500'}`}>🇧🇷 PT</button>
          <button onClick={() => setLang('en')} className={`flex items-center gap-2 hover:text-[#C5A059] transition ${lang === 'en' ? 'text-[#C5A059]' : 'text-slate-500'}`}>🇺🇸 EN</button>
          <button onClick={() => setLang('es')} className={`flex items-center gap-2 hover:text-[#C5A059] transition ${lang === 'es' ? 'text-[#C5A059]' : 'text-slate-500'}`}>🇪🇸 ES</button>
        </div>
      </div>

      {/* POP-UP MODAL (Corrigido para ser sobreposto) */}
      {showPopup && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fade-in" onClick={() => setShowPopup(false)}></div>
          <div className="relative bg-white w-full max-w-sm md:max-w-md rounded-[30px] overflow-hidden shadow-2xl animate-zoom-in">
            <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-slate-400 hover:text-[#1a2b45] transition-colors z-20">
              <X size={24} />
            </button>
            <div className="bg-[#1a2b45] p-8 md:p-10 flex flex-col items-center text-center">
              <div className="bg-white/10 p-4 rounded-full mb-4">
                <Megaphone size={32} className="text-[#C5A059] animate-bounce-slow" />
              </div>
              <h2 className="text-white text-lg font-black tracking-widest uppercase mb-3 leading-tight">{t.popupTitle}</h2>
              <div className="w-10 h-1 bg-[#C5A059] rounded-full mb-6"></div>
              <p className="text-slate-300 text-xs leading-relaxed mb-6">{t.popupAviso}</p>
              <button 
                onClick={() => setShowPopup(false)} 
                className="w-full bg-[#C5A059] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#b08d4a] transition-all"
              >
                {t.popupClose}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVIGATION */}
      <nav className={`fixed w-full z-[100] transition-all duration-500 px-6 top-0 mt-8 ${scrolled ? 'py-4 bg-[#0B1120]/95 backdrop-blur-md shadow-2xl mt-0' : 'py-8 bg-transparent'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex flex-col cursor-pointer group">
            <span className="text-2xl font-black tracking-tighter text-white transition-colors group-hover:text-[#C5A059]">MENEZES</span>
            <span className="text-[10px] tracking-[0.4em] font-bold text-[#C5A059]">ADVOCACIA</span>
          </div>
          <div className="hidden lg:flex items-center gap-10">
            {t.nav.map((link, i) => (
              <a key={i} href={`#${link.toLowerCase()}`} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#C5A059] transition-all relative group">{link}</a>
            ))}
            <button className="bg-[#C5A059] text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#b08d4a] transition-all">{t.consultBtn}</button>
          </div>
          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(true)}><Menu size={28} /></button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#1e293b,transparent_50%)]"></div>
        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20">
          <div className="flex flex-col justify-center animate-slide-in-left">
            <div className="inline-flex items-center gap-3 bg-[#C5A059]/10 text-[#C5A059] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 w-fit border border-[#C5A059]/20">{t.heroBadge}</div>
            
            <h1 className="text-5xl md:text-8xl font-bold text-white leading-[0.95] tracking-tighter mb-8">
              {t.heroTitle} <br /> <span className="text-[#C5A059] italic">{t.heroTitleItalic}</span>
            </h1>
            
            <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed font-light">{t.heroDesc}</p>

            {/* REDES SOCIAIS NA PÁGINA INICIAL */}
            <div className="flex gap-6 mb-10 items-center">
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-[#C5A059] hover:text-white transition-all border border-white/10 group" aria-label="Facebook">
                <Facebook size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-[#C5A059] hover:text-white transition-all border border-white/10 group" aria-label="Instagram">
                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-[#C5A059] hover:text-white transition-all border border-white/10 group" aria-label="LinkedIn">
                <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <div className="w-12 h-[1px] bg-white/10"></div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="bg-white text-[#0B1120] px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#C5A059] hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95">
                {t.heroCTA} <ArrowUpRight size={18} />
              </button>
            </div>
          </div>

          <div className="relative hidden md:block animate-zoom-in">
            <div className="rounded-[40px] overflow-hidden border-8 border-white/5 shadow-2xl group relative">
              <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1000" className="w-full h-[600px] object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent"></div>
            </div>
            <div className="absolute -bottom-10 -right-10 bg-[#1E293B] p-10 rounded-[40px] shadow-2xl border border-white/10 animate-bounce-slow">
              <div className="text-5xl font-black text-white mb-2 tracking-tighter">22</div>
              <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.3em] leading-tight">Anos de <br /> Excelência</p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE SECTION */}
      <section className="py-32 bg-[#0F172A] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.4em] mb-4 block text-[#C5A059]">{t.expSubtitle}</span>
            <h3 className="text-3xl md:text-5xl font-bold text-white">{t.expTitle}</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.areas.map((area, idx) => (
              <div key={idx} className="bg-[#1E293B]/50 p-10 rounded-3xl border border-white/5 group hover:-translate-y-2 transition-all">
                <ShieldCheck size={28} className="text-[#C5A059] mb-8" />
                <h4 className="text-xl font-bold text-white mb-4">{area.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-8">{area.desc}</p>
                <div className="w-8 h-[2px] bg-[#C5A059] group-hover:w-full transition-all"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI AUTOMATED BLOG SECTION */}
      <section id="blog" className="py-32 bg-[#0B1120] overflow-hidden">
        <div className="container mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-[0.4em] mb-4 block text-[#C5A059]">{t.blogSubtitle}</span>
              <h3 className="text-3xl md:text-5xl font-bold text-white italic">{t.blogTitle}</h3>
            </div>
            <button 
              onClick={fetchLegalNews}
              disabled={loadingNews}
              className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#C5A059] hover:text-white transition-all bg-[#C5A059]/10 px-6 py-3 rounded-full border border-[#C5A059]/20 mx-auto md:mx-0"
            >
              {loadingNews ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
              {t.blogMore}
            </button>
          </div>
        </div>

        <div className="relative w-full flex overflow-hidden py-10">
          <div className="flex gap-8 animate-infinite-scroll hover:pause">
            {doublePosts.map((post, idx) => (
              <div key={idx} className="w-[320px] md:w-[450px] shrink-0 group cursor-pointer bg-[#1E293B]/30 p-4 rounded-[40px] border border-white/5 transition-all hover:bg-[#1E293B]/60">
                <div className="relative h-56 overflow-hidden rounded-[32px] mb-6">
                  <img src={post.image} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 left-4 bg-[#C5A059] text-white text-[9px] font-bold uppercase px-3 py-1 rounded-full tracking-widest">{post.category}</div>
                </div>
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] mb-3 uppercase"><Calendar size={12} className="text-[#C5A059]" /> {post.date}</div>
                  <h4 className="text-lg font-bold text-white mb-3 group-hover:text-[#C5A059] transition-colors line-clamp-2">{post.title}</h4>
                  <p className="text-xs text-slate-400 mb-6 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-widest"><BookOpen size={14} className="text-[#C5A059]" /> {t.readMore}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contacto" className="py-32 bg-[#0B1120] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="bg-[#1E293B] rounded-[60px] overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-white/5">
            <div className="lg:w-1/2 p-12 md:p-24 bg-[#0F172A]">
              <span className="text-xs font-bold uppercase tracking-[0.4em] mb-4 block text-[#C5A059]">Contato</span>
              <h3 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-8">{t.contactTitle}</h3>
              <div className="space-y-8">
                <div className="flex items-center gap-6 group cursor-pointer"><Mail className="text-[#C5A059] group-hover:scale-110 transition-transform" /> <span className="text-slate-300">atendimento@menezes.adv.br</span></div>
                <div className="flex items-center gap-6 group cursor-pointer"><Phone className="text-[#C5A059] group-hover:scale-110 transition-transform" /> <span className="text-slate-300">(81) 4101-7401</span></div>
              </div>
            </div>
            <div className="lg:w-1/2 p-12 md:p-24">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div><label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">{t.formName}</label><input required className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#C5A059] outline-none text-white transition-all" /></div>
                <div><label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">{t.formPhone}</label><input required className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#C5A059] outline-none text-white transition-all" /></div>
                <button disabled={formStatus !== 'idle'} className="w-full py-6 rounded-2xl font-bold uppercase text-sm bg-[#C5A059] text-white hover:bg-[#b08d4a] transition-all shadow-xl">{formStatus === 'idle' ? t.formSubmit : t.formSuccess}</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 bg-[#0B1120] text-center md:text-left">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div><span className="text-xl font-black text-white leading-none">MENEZES</span><span className="text-[10px] block font-bold text-[#C5A059]">ADVOCACIA</span><p className="text-xs text-slate-500 mt-2 italic">{t.footerDesc}</p></div>
          <div className="flex gap-10 text-[10px] font-bold uppercase text-slate-500"><a href="#" className="hover:text-white transition-colors">Privacy</a> <a href="#" className="hover:text-white transition-colors">Terms</a></div>
          <p className="text-[9px] font-bold text-[#C5A059] uppercase tracking-widest opacity-60">Digital Authority by BASB software</p>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a href="#" className="fixed bottom-8 right-8 z-[200] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-3 group">
        <MessageSquare size={28} />
        <span className="max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-500 font-bold whitespace-nowrap text-xs">WhatsApp</span>
      </a>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-left { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes zoom-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes infinite-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50% - 1rem)); } }
        
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
        .animate-zoom-in { animation: zoom-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .animate-infinite-scroll { animation: infinite-scroll 50s linear infinite; display: flex; width: max-content; }
        .pause { animation-play-state: paused; }
      `}</style>
      
    </div>
  );
};

export default App;