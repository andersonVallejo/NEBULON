import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { NebulonLogo } from '../brand/NebulonLogo';
import { 
  Bell, 
  Menu, 
  X, 
  ShieldCheck, 
  Check, 
  Sparkles,
  Layers,
  ChevronDown,
  UserCheck
} from 'lucide-react';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    currentUser, 
    switchUserRole, 
    setIsAuthModalOpen, 
    setIsQuoteModalOpen,
    notifications,
    markAllNotificationsAsRead,
    setIsBrandGuideModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setNotificationsOpen(false);
  };

  const rolesList: { role: UserRole; label: string; desc: string }[] = [
    { role: 'admin', label: 'Administrador', desc: 'Control total, gestión y métricas' },
    { role: 'moderator', label: 'Moderador', desc: 'Supervisión de contenido y reportes' },
    { role: 'user', label: 'Miembro', desc: 'Participante de la comunidad' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#090d16]/90 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Single clean brand element */}
          <div className="shrink-0 flex items-center">
            <NebulonLogo
              size="md"
              onClick={() => handleNavClick('home')}
            />
          </div>

          {/* Zone 2: Primary navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${currentView === 'home' ? 'text-violet-400 font-semibold' : ''}`}
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${currentView === 'portfolio' ? 'text-violet-400 font-semibold' : ''}`}
            >
              Portafolio
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${currentView === 'services' ? 'text-violet-400 font-semibold' : ''}`}
            >
              Servicios
            </button>
            <button
              onClick={() => handleNavClick('community')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${currentView === 'community' ? 'text-violet-400 font-semibold' : ''}`}
            >
              Comunidad
            </button>
            <button
              onClick={() => handleNavClick('lab')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${currentView === 'lab' ? 'text-violet-400 font-semibold' : ''}`}
            >
              Laboratorio
            </button>
            <button
              onClick={() => handleNavClick('learn')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${currentView === 'learn' ? 'text-violet-400 font-semibold' : ''}`}
            >
              Aprender
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${currentView === 'about' ? 'text-violet-400 font-semibold' : ''}`}
            >
              Sobre NEBULØN
            </button>
          </nav>

          {/* Zone 3: Actions & Profile */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Role Switcher Pill */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded border border-slate-700 bg-slate-900/80 text-slate-300 hover:text-white hover:border-violet-500/60 transition-colors"
                title="Cambiar rol activo para pruebas de permisos"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                <span className="capitalize">{currentUser?.role || 'admin'}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg bg-[#0e1422] border border-slate-800 shadow-2xl p-2 z-50">
                  <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 mb-1">
                    Simulación de Roles (RBAC)
                  </div>
                  {rolesList.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => {
                        switchUserRole(r.role);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded text-left text-xs transition-colors ${
                        (currentUser?.role || 'admin') === r.role
                          ? 'bg-violet-950/40 text-violet-300 border border-violet-800/40'
                          : 'text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="mt-0.5">
                        {(currentUser?.role || 'admin') === r.role ? (
                          <Check className="w-3.5 h-3.5 text-violet-400" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-slate-100">{r.label}</div>
                        <div className="text-[11px] text-slate-400 leading-tight">{r.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                aria-label="Notificaciones"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 ring-2 ring-[#090d16]" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-lg bg-[#0e1422] border border-slate-800 shadow-2xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                    <span className="text-xs font-semibold text-slate-200">Notificaciones</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-[11px] text-violet-400 hover:underline"
                      >
                        Marcar leídas
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 py-3 text-center">No hay notificaciones</p>
                    ) : (
                      notifications.slice(0, 5).map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            if (n.targetView) handleNavClick(n.targetView as AppView);
                            setNotificationsOpen(false);
                          }}
                          className={`p-2 rounded cursor-pointer transition-colors text-xs ${
                            n.read ? 'bg-slate-900/40 text-slate-400' : 'bg-violet-950/30 text-slate-200 border border-violet-800/30'
                          }`}
                        >
                          <div className="font-semibold text-slate-200">{n.title}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{n.message}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar / Button */}
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 p-1 rounded-full border border-slate-700/80 hover:border-violet-500/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              title={`Perfil: ${currentUser?.name || 'Anderson Vallejo'} (${currentUser?.role || 'admin'})`}
            >
              <img
                src={currentUser?.avatar || '/assets/aistudio/image_72f5fead.png'}
                alt={currentUser?.name || 'Anderson Vallejo'}
                className="w-7 h-7 rounded-full object-cover object-[center_35%]"
                referrerPolicy="no-referrer"
              />
            </button>

            {/* Primary Action Button (Single outcome CTA) */}
            <button
              type="button"
              onClick={() => setIsQuoteModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-lg shadow-sm shadow-violet-900/30 transition-all whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cotizar Proyecto</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f1c] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2 rounded text-left ${currentView === 'home' ? 'bg-violet-900/30 text-violet-400 font-semibold' : 'text-slate-300 hover:bg-slate-800/60'}`}
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className={`p-2 rounded text-left ${currentView === 'portfolio' ? 'bg-violet-900/30 text-violet-400 font-semibold' : 'text-slate-300 hover:bg-slate-800/60'}`}
            >
              Portafolio
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`p-2 rounded text-left ${currentView === 'services' ? 'bg-violet-900/30 text-violet-400 font-semibold' : 'text-slate-300 hover:bg-slate-800/60'}`}
            >
              Servicios
            </button>
            <button
              onClick={() => handleNavClick('community')}
              className={`p-2 rounded text-left ${currentView === 'community' ? 'bg-violet-900/30 text-violet-400 font-semibold' : 'text-slate-300 hover:bg-slate-800/60'}`}
            >
              Comunidad
            </button>
            <button
              onClick={() => handleNavClick('lab')}
              className={`p-2 rounded text-left ${currentView === 'lab' ? 'bg-violet-900/30 text-violet-400 font-semibold' : 'text-slate-300 hover:bg-slate-800/60'}`}
            >
              Laboratorio
            </button>
            <button
              onClick={() => handleNavClick('learn')}
              className={`p-2 rounded text-left ${currentView === 'learn' ? 'bg-violet-900/30 text-violet-400 font-semibold' : 'text-slate-300 hover:bg-slate-800/60'}`}
            >
              Aprender
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`p-2 rounded text-left ${currentView === 'about' ? 'bg-violet-900/30 text-violet-400 font-semibold' : 'text-slate-300 hover:bg-slate-800/60'}`}
            >
              Sobre NEBULØN
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className={`p-2 rounded text-left ${currentView === 'reviews' ? 'bg-violet-900/30 text-violet-400 font-semibold' : 'text-slate-300 hover:bg-slate-800/60'}`}
            >
              Opiniones & Reportes
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                handleNavClick('admin');
              }}
              className="flex items-center justify-between p-2 rounded text-xs text-slate-300 bg-slate-900/60 border border-slate-800"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-violet-400" />
                Panel Administrativo
              </span>
              <span className="text-[10px] font-mono text-violet-400 bg-violet-950/60 px-1.5 py-0.5 rounded">
                RBAC
              </span>
            </button>

            <button
              onClick={() => {
                setIsBrandGuideModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2 rounded text-xs text-slate-400 hover:text-white"
            >
              <Layers className="w-4 h-4 text-sky-400" />
              Manual de Identidad & Guía de Marca NEBULØN
            </button>

            <button
              onClick={() => {
                setIsQuoteModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-violet-600 rounded-lg text-center"
            >
              Cotizar Proyecto
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
