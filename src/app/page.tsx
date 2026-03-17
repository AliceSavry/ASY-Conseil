'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HeartPulse,
  Brain,
  TrendingUp,
  Users,
  ChevronRight,
  CheckCircle2,
  Menu,
  X,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  Shield,
  Quote,
  Building2,
  Calendar,
  Star,
  Briefcase,
  BarChart3,
  UserCheck,
  MessageCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

// Brand Colors
const COLORS = {
  blue: '#4A90E2',
  purple: '#9B59B6',
  green: '#2ECC71',
  orange: '#F39C12'
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Services data - SEO optimized, no prices
const services = [
  {
    title: "Diagnostic Trésorerie",
    icon: <HeartPulse className="w-8 h-8" style={{ color: COLORS.blue }} />,
    desc: "27% des TPE jugent leur trésorerie difficile. Identifions les fuites et les leviers pour sécuriser votre cash et éviter l'asphyxie financière.",
    color: `from-[${COLORS.blue}] to-[${COLORS.green}]`,
    features: ["Analyse des flux de trésorerie", "Identification des fuites financières", "Plan d'action personnalisé", "Suivi post-diagnostic"],
    cta: "Évaluer ma trésorerie"
  },
  {
    title: "Temps de Cerveau Disponible",
    icon: <Brain className="w-8 h-8" style={{ color: COLORS.purple }} />,
    desc: "Vous travaillez plus de 50h par semaine ? Simplifiez vos processus administratifs pour récupérer du temps stratégique et sortir du mode urgent.",
    color: `from-[${COLORS.purple}] to-[${COLORS.blue}]`,
    features: ["Audit des processus existants", "Identification des tâches à automatiser", "Formation des équipes", "Gain de temps mesurable"],
    cta: "Libérer mon temps"
  },
  {
    title: "Rentabilité Express",
    icon: <TrendingUp className="w-8 h-8" style={{ color: COLORS.green }} />,
    desc: "Votre rentabilité PME est en berne ? Analysons vos coûts cachés et vos marges pour redonner de l'air à votre entreprise en moins de 4 semaines.",
    color: `from-[${COLORS.green}] to-[${COLORS.orange}]`,
    features: ["Analyse des coûts cachés", "Optimisation prix et marges", "Stratégie commerciale ciblée", "ROI mesurable"],
    cta: "Booster ma rentabilité"
  },
  {
    title: "Fidélisation & Turn-over",
    icon: <Users className="w-8 h-8" style={{ color: COLORS.orange }} />,
    desc: "Le turn-over coûte cher. Diagnostiquons votre climat social et mettons en place un plan de fidélisation pour stabiliser vos équipes.",
    color: `from-[${COLORS.orange}] to-[${COLORS.purple}]`,
    features: ["Diagnostic climat social", "Plan de fidélisation sur mesure", "Formation management bienveillant", "Réduction durable du turnover"],
    cta: "Stabiliser mes équipes"
  }
]

// Testimonials data
const testimonials = [
  {
    name: "Marc Dubois",
    role: "Gérant, PME industrielle - Lyon",
    content: "Alice a identifié en 2 semaines des problèmes de trésorerie que nous traînions depuis 3 ans. Notre cash-flow est redevenu positif et l'équipe respire mieux.",
    rating: 5
  },
  {
    name: "Sophie Laurent",
    role: "Directrice, Cabinet conseil - Paris",
    content: "Grâce au diagnostic sur mes processus administratifs, j'ai récupéré 15h par semaine. Le ROI est immédiat et je peux enfin me concentrer sur mon cœur de métier.",
    rating: 5
  },
  {
    name: "Pierre Martin",
    role: "CEO, Startup Tech - Bordeaux",
    content: "L'approche 'médecin de l'entreprise' d'Alice Savry est unique. Elle pose les bonnes questions et apporte des solutions concrètes à nos problèmes de rentabilité.",
    rating: 5
  }
]

// FAQ data - SEO optimized
const faqs = [
  {
    question: "Quelle est la différence entre votre approche et celle d'un expert-comptable ?",
    answer: "L'expert-comptable analyse vos chiffres a posteriori et établit vos bilans. Alice Savry, elle, intervient sur le terrain pour observer vos pratiques réelles, poser des questions naïves et identifier les gâchis invisibles dans les documents comptables. C'est une approche complémentaire, centrée sur la gestion des risques et l'optimisation opérationnelle."
  },
  {
    question: "Comment se déroule un diagnostic et combien de temps dure-t-il ?",
    answer: "Un diagnostic complet prend entre 2 et 4 semaines selon la complexité de votre entreprise. Alice travaille en immersion pour comprendre réellement votre fonctionnement, au-delà des chiffres. Chaque mission est adaptée à votre situation spécifique et à vos objectifs. Pour les situations urgentes, un diagnostic express peut être réalisé."
  },
  {
    question: "Proposez-vous un accompagnement après le diagnostic ?",
    answer: "Oui, Alice Savry propose un suivi stratégique personnalisé pour vérifier la mise en place des actions correctives et ajuster le tir si nécessaire. Cet accompagnement sur mesure permet de pérenniser les résultats et d'anticiper les problèmes futurs. La durée et l'intensité du suivi s'adaptent à vos besoins."
  },
  {
    question: "Comment se déroule une première rencontre avec Alice Savry ?",
    answer: "Tout commence par un échange téléphonique de 30 minutes pour comprendre votre situation et vos points de douleur (trésorerie, processus administratifs, rentabilité). Cet entretien est sans engagement et permet d'évaluer ensemble si une intervention est pertinente."
  },
  {
    question: "Quels sont les délais pour démarrer un diagnostic d'entreprise ?",
    answer: "Alice Savry est généralement disponible dans les 2 semaines suivant notre premier contact. Pour les situations d'urgence (trésorerie critique, risque de défaillance), elle peut intervenir plus rapidement. N'attendez pas que la situation se dégrade."
  }
]

// Method steps
const methodSteps = [
  {
    title: "Observer",
    desc: "Poser des questions naïves pour comprendre vos processus réels, au-delà des chiffres. Identifier ce qui ne se voit pas dans les documents comptables.",
    icon: <Target className="w-6 h-6" />
  },
  {
    title: "Débusquer",
    desc: "Repérer les gâchis, les incohérences et les processus obsolètes qui freinent votre rentabilité et votre trésorerie.",
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: "Soigner",
    desc: "Proposer des solutions concrètes et mesurables pour remettre de l'intelligence là où l'habitude a pris la place.",
    icon: <Shield className="w-6 h-6" />
  }
]

// Stats data
const stats = [
  { value: "20+", label: "Années d'expérience en gestion" },
  { value: "150+", label: "Entreprises accompagnées" },
  { value: "95%", label: "Clients satisfaits" },
  { value: "2M€", label: "Économies générées" }
]

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans text-slate-900 flex flex-col">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="/asy-logo.svg" 
              alt="ASY Conseil - Alice Savry" 
              className="w-10 h-10 shadow-lg"
            />
            <span className="font-bold text-xl tracking-tight">
              ASY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#2ECC71]">CONSEIL</span>
            </span>
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 font-medium items-center">
            <button onClick={() => scrollToSection('hero')} className="hover:text-[#4A90E2] transition-colors">Accueil</button>
            <button onClick={() => scrollToSection('method')} className="hover:text-[#4A90E2] transition-colors">Méthode</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-[#4A90E2] transition-colors">Offres</button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:text-[#4A90E2] transition-colors">Témoignages</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-[#4A90E2] transition-colors">FAQ</button>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
              style={{ background: `linear-gradient(to right, ${COLORS.blue}, ${COLORS.purple})` }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Parlons-en
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t shadow-lg"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                <button onClick={() => scrollToSection('hero')} className="py-2 hover:text-[#4A90E2] transition-colors text-left">Accueil</button>
                <button onClick={() => scrollToSection('method')} className="py-2 hover:text-[#4A90E2] transition-colors text-left">Méthode</button>
                <button onClick={() => scrollToSection('services')} className="py-2 hover:text-[#4A90E2] transition-colors text-left">Offres</button>
                <button onClick={() => scrollToSection('testimonials')} className="py-2 hover:text-[#4A90E2] transition-colors text-left">Témoignages</button>
                <button onClick={() => scrollToSection('faq')} className="py-2 hover:text-[#4A90E2] transition-colors text-left">FAQ</button>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="text-white px-6 py-3 rounded-full w-full"
                  style={{ background: `linear-gradient(to right, ${COLORS.blue}, ${COLORS.purple})` }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Parlons-en
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section - SEO Optimized */}
      <section id="hero" className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden flex-shrink-0">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-b from-[#4A90E2]/10 to-transparent opacity-70 rounded-bl-[100px]"></div>
        <div className="absolute top-1/4 left-0 -z-10 w-64 h-64 bg-[#9B59B6]/20 blur-[100px] rounded-full"></div>
        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="inline-block px-4 py-1.5 rounded-full font-semibold text-sm mb-6 uppercase tracking-wider border-0" style={{ backgroundColor: `${COLORS.blue}15`, color: COLORS.blue }}>
                <Sparkles className="w-4 h-4 mr-2 inline" />
                Diagnostic & Gestion des Risques
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Je suis le{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#2ECC71]">
                  médecin
                </span>{' '}
                de votre entreprise.
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 mb-6 leading-relaxed max-w-lg">
                <strong>Alice Savry</strong>, consultante experte avec près de 20 ans d'expérience en <strong>gestion des risques</strong> et qualité. J'interviens là où l'habitude a pris la place de l'intelligence pour soigner votre trésorerie et votre rentabilité.
              </p>
              
              <p className="text-base text-slate-500 mb-8 leading-relaxed max-w-lg italic border-l-4 pl-4" style={{ borderColor: COLORS.blue }}>
                « 27% des TPE jugent leur trésorerie difficile. Et si vous preniez le temps d'un diagnostic de santé pour votre entreprise ? »
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                  className="text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                  style={{ background: `linear-gradient(to right, ${COLORS.blue}, ${COLORS.purple})` }}
                >
                  Demander mon diagnostic gratuit <ArrowRight className="w-5 h-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection('services')}
                  className="border-2 border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-white transition-all"
                >
                  Découvrir mes interventions
                </Button>
              </div>
              
              <div className="mt-10 flex items-center gap-4 text-sm text-slate-500 font-medium">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div 
                      key={i} 
                      className={`w-8 h-8 rounded-full border-2 border-white shadow-sm`}
                      style={{
                        background: `linear-gradient(135deg, ${i === 1 ? COLORS.blue : i === 2 ? COLORS.purple : i === 3 ? COLORS.green : COLORS.orange}, ${i === 1 ? '#6BB3F0' : i === 2 ? '#B87DD0' : i === 3 ? '#5DD88A' : '#F5B041'})`
                      }}
                    />
                  ))}
                </div>
                <p>Expertise en diagnostic trésorerie et rentabilité PME depuis 20 ans</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative z-10 bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-100 max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(to bottom right, ${COLORS.blue}20, ${COLORS.purple}20)` }}>
                    <HeartPulse className="w-7 h-7" style={{ color: COLORS.blue }} />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-bold uppercase">Alerte Santé</p>
                    <p className="text-2xl font-bold text-red-500">27%</p>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold mb-3">Diagnostic Urgent</h2>
                <p className="text-slate-500 mb-6 italic text-sm">« On a toujours fait comme ça... »</p>
                
                <div className="space-y-3">
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full"
                      style={{ background: `linear-gradient(to right, ${COLORS.blue}, ${COLORS.purple})` }}
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <p className="text-xs font-semibold text-slate-500 flex justify-between">
                    <span>Trésorerie en souffrance</span>
                    <span className="text-red-500">Action requise</span>
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                  <p className="font-bold text-slate-800 mb-2">Besoin d'un remède ?</p>
                  <p className="text-sm text-slate-500 mb-3">Premier échange téléphonique offert</p>
                  <Button 
                    onClick={() => scrollToSection('contact')}
                    className="text-white px-6 py-2 rounded-full text-sm"
                    style={{ background: `linear-gradient(to right, ${COLORS.blue}, ${COLORS.purple})` }}
                  >
                    Prendre rendez-vous
                  </Button>
                </div>
              </div>
              
              {/* Background decorations */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#9B59B6]/20 blur-[100px] rounded-full"></div>
              <div className="absolute bottom-0 right-10 w-48 h-48 bg-[#2ECC71]/20 blur-[80px] rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 text-white" style={{ background: `linear-gradient(to right, #1e293b, #2d4a6f)` }}>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                className="text-center"
                variants={fadeInUp}
              >
                <p className="text-3xl sm:text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-[#8CB8E8] text-sm sm:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Method Section - SEO Optimized */}
      <section id="method" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 px-4 py-1.5 border-0" style={{ backgroundColor: `${COLORS.purple}15`, color: COLORS.purple }}>Ma Méthode</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">L'habitude est le premier symptôme du déclin</h2>
            <p className="text-lg text-slate-600">
              Complémentaire de l'expert-comptable, <strong>Alice Savry</strong> combine l'analyse des chiffres avec l'observation terrain pour détecter ce que les documents ne révèlent pas : les gâchis, les incohérences et les <strong>processus administratifs</strong> obsolètes.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 sm:gap-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {methodSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                className="group p-6 sm:p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100"
                variants={fadeInUp}
              >
                <div className="w-14 h-14 mb-6 bg-white shadow-sm rounded-xl flex items-center justify-center transition-all" style={{ color: COLORS.blue }}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-lg italic text-slate-500 max-w-2xl mx-auto">
              « Je remets de l'intelligence là où l'habitude a pris la place. »
            </p>
            <p className="text-sm text-slate-400 mt-2">— Alice Savry, Consultante en gestion des risques</p>
          </motion.div>
        </div>
      </section>

      {/* Services Section - SEO Optimized, No Prices */}
      <section id="services" className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="max-w-xl">
              <Badge className="mb-4 px-4 py-1.5 border-0" style={{ backgroundColor: `${COLORS.green}15`, color: COLORS.green }}>Offres</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Diagnostics sur mesure</h2>
              <p className="text-slate-600 text-lg">Chaque entreprise est unique. Mes interventions s'adaptent à votre situation spécifique et à vos objectifs.</p>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: COLORS.green }}></span>
              <span className="text-sm font-bold uppercase tracking-wider text-slate-500">Devis personnalisé</span>
            </div>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {services.map((s, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden cursor-pointer"
                variants={fadeInUp}
                onMouseEnter={() => setActiveService(idx)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${s.color}`}></div>
                <div className="mb-6">{s.icon}</div>
                <h3 className="text-xl font-bold mb-4 transition-colors" style={{ color: activeService === idx ? COLORS.blue : undefined }}>{s.title}</h3>
                <p className="text-slate-500 mb-6 text-sm leading-relaxed">{s.desc}</p>
                
                <AnimatePresence>
                  {activeService === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4"
                    >
                      <ul className="space-y-2">
                        {s.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.green }} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="mt-auto">
                  <Button 
                    onClick={() => scrollToSection('contact')}
                    className="w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 bg-transparent text-slate-900 border border-slate-100 hover:bg-slate-900 hover:text-white"
                  >
                    {s.cta} <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Monthly Accompaniment - No Price */}
          <motion.div 
            className="mt-12 rounded-[2rem] p-6 sm:p-8 md:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden"
            style={{ background: `linear-gradient(to right, #1e293b, #2d4a6f)` }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full" style={{ backgroundColor: `${COLORS.blue}30` }}></div>
            <div className="relative z-10">
              <Badge className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4 border-0" style={{ backgroundColor: COLORS.blue }}>Suivi Personnalisé</Badge>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Accompagnement mensuel stratégique</h3>
              <p className="text-[#8CB8E8] text-lg max-w-lg">
                Pour pérenniser les résultats de votre diagnostic : un suivi adapté à vos besoins pour vérifier les actions correctives et ajuster votre stratégie de <strong>rentabilité PME</strong>.
              </p>
            </div>
            <div className="relative z-10 text-center lg:text-right">
              <p className="text-xl font-bold mb-1">Tarif adapté à vos besoins</p>
              <p className="text-[#8CB8E8] text-sm mb-4">Devis personnalisé selon l'intensité du suivi</p>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-xl"
              >
                Demander un devis
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-4 py-1.5 border-0" style={{ backgroundColor: `${COLORS.orange}15`, color: COLORS.orange }}>Témoignages</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ce que disent les dirigeants accompagnés</h2>
            <p className="text-lg text-slate-600">Des résultats concrets sur la trésorerie, les processus et la rentabilité.</p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-6 sm:gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 sm:p-8 relative"
                variants={fadeInUp}
              >
                <Quote className="w-10 h-10 mb-4" style={{ color: `${COLORS.blue}40` }} />
                <p className="text-slate-600 mb-6 italic">{t.content}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: `linear-gradient(to bottom right, ${COLORS.blue}, ${COLORS.purple})` }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - SEO Optimized */}
      <section id="faq" className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-4 py-1.5 border-0" style={{ backgroundColor: `${COLORS.blue}15`, color: COLORS.blue }}>FAQ</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Questions fréquentes sur mes diagnostics</h2>
            <p className="text-lg text-slate-600">Tout savoir sur mes interventions en diagnostic trésorerie, rentabilité et processus administratifs.</p>
          </motion.div>
          
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="bg-white rounded-2xl px-6 border-0 shadow-sm">
                  <AccordionTrigger className="text-left font-semibold text-slate-800 py-6 hover:text-[#4A90E2]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section before Contact */}
      <section className="py-16 text-white" style={{ background: `linear-gradient(to right, ${COLORS.blue}, ${COLORS.purple})` }}>
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Prêt à soigner votre entreprise ?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Premier échange téléphonique offert pour identifier vos points de douleur et évaluer ensemble les solutions adaptées.
            </p>
            <Button 
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="bg-white text-slate-900 px-10 py-5 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-xl text-lg"
            >
              Demander mon diagnostic gratuit <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - SEO Optimized */}
      <section id="contact" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-4 py-1.5 border-0" style={{ backgroundColor: `${COLORS.purple}15`, color: COLORS.purple }}>Contact</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Parlons de votre entreprise</h2>
            <p className="text-lg text-slate-600">Échange téléphonique offert pour identifier vos points de douleur et construire ensemble une solution sur mesure.</p>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src="/asy-logo.svg" 
                  alt="ASY Conseil - Alice Savry" 
                  className="w-12 h-12 shadow-lg"
                />
                <div>
                  <span className="font-bold text-xl tracking-tight block">Alice Savry</span>
                  <span className="text-sm text-slate-500">Consultante en Gestion des Risques & Diagnostic</span>
                </div>
              </div>
              
              <p className="text-slate-500 mb-8 italic text-lg border-l-4 pl-4" style={{ borderColor: COLORS.purple }}>
                « Je remets de l'intelligence là où l'habitude a pris la place. »
              </p>
              
              <div className="space-y-4 font-medium mb-8">
                <a href="mailto:alice.savry.formation@gmail.com" className="flex items-center gap-3 text-slate-600 hover:text-[#4A90E2] transition-colors">
                  <span className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shadow-sm" style={{ color: COLORS.blue }}>
                    <Mail className="w-5 h-5"/>
                  </span>
                  alice.savry.formation@gmail.com
                </a>
                <a href="tel:0774527956" className="flex items-center gap-3 text-slate-600 hover:text-[#4A90E2] transition-colors">
                  <span className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shadow-sm" style={{ color: COLORS.blue }}>
                    <Phone className="w-5 h-5"/>
                  </span>
                  07 74 52 79 56
                </a>
                <div className="flex items-center gap-3 text-slate-600">
                  <span className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shadow-sm" style={{ color: COLORS.blue }}>
                    <Building2 className="w-5 h-5"/>
                  </span>
                  Intervention dans toute la France
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <span className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shadow-sm" style={{ color: COLORS.blue }}>
                    <Calendar className="w-5 h-5"/>
                  </span>
                  Disponible sous 2 semaines
                </div>
              </div>
              
              {/* Quick Services */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="py-1.5 px-3 text-slate-600">
                  <Briefcase className="w-3 h-3 mr-1" /> Gestion Opérationnelle
                </Badge>
                <Badge variant="outline" className="py-1.5 px-3 text-slate-600">
                  <BarChart3 className="w-3 h-3 mr-1" /> Diagnostic Trésorerie
                </Badge>
                <Badge variant="outline" className="py-1.5 px-3 text-slate-600">
                  <Shield className="w-3 h-3 mr-1" /> Gestion des Risques
                </Badge>
                <Badge variant="outline" className="py-1.5 px-3 text-slate-600">
                  <UserCheck className="w-3 h-3 mr-1" /> Formation Équipes
                </Badge>
              </div>
            </motion.div>
            
            {/* Contact Form - Notion Integration */}
            <motion.div 
              className="lg:w-1/2 w-full"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Dark themed wrapper for seamless Notion integration */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                {/* Gradient border effect */}
                <div className="absolute inset-0 p-[2px] rounded-3xl" style={{ background: `linear-gradient(to bottom right, ${COLORS.blue}, ${COLORS.purple}, ${COLORS.orange})` }}>
                  <div className="absolute inset-[2px] bg-slate-900 rounded-[22px]"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Header with gradient accent */}
                  <div className="bg-slate-900 px-6 pt-6 pb-4 border-b border-slate-700/50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: COLORS.green }}></div>
                      <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Formulaire de contact</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Contactez Alice Savry</h3>
                    <p className="text-slate-400 text-sm mt-1">Échange offert - Réponse sous 24h</p>
                  </div>
                  
                  {/* Notion iframe */}
                  <div className="bg-slate-900">
                    <iframe 
                      src="https://near-legal-905.notion.site/ebd//322d1f3f34b18021beccddb2acdc345b" 
                      width="100%" 
                      height="600" 
                      frameBorder="0" 
                      allowFullScreen
                      className="w-full"
                      title="Formulaire de contact ASY Conseil - Alice Savry"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-auto">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <img 
                src="/asy-logo.svg" 
                alt="ASY Conseil - Alice Savry" 
                className="w-10 h-10"
              />
              <span className="font-bold text-xl tracking-tight">
                ASY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#2ECC71]">CONSEIL</span>
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
              <button onClick={() => scrollToSection('hero')} className="hover:text-white transition-colors">Accueil</button>
              <button onClick={() => scrollToSection('method')} className="hover:text-white transition-colors">Méthode</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Offres</button>
              <button onClick={() => scrollToSection('testimonials')} className="hover:text-white transition-colors">Témoignages</button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors">FAQ</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button>
            </div>
            
            <div className="text-slate-400 text-sm">
              © {new Date().getFullYear()} ASY Conseil - Alice Savry
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            <p>Alice Savry | Consultante en Diagnostic Trésorerie, Rentabilité PME & Gestion des Risques</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
