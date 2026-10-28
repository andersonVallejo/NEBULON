import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { X, ShieldCheck, UserCheck, Edit3, Check, Save } from 'lucide-react';

export const AuthProfileModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    currentUser, 
    updateCurrentUserProfile,
    switchUserRole,
    users
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState(currentUser?.bio || '');
  const [editTech, setEditTech] = useState(currentUser?.favoriteTech?.join(', ') || '');
  const [editLevel, setEditLevel] = useState(currentUser?.experienceLevel || 'Lead / Arquitecto');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUserProfile({
      bio: editBio.trim(),
      favoriteTech: editTech.split(',').map(t => t.trim()).filter(Boolean),
      experienceLevel: editLevel as any,
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const roles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'admin', label: 'Administrador (Anderson Vallejo)', desc: 'Control total de proyectos, solicitudes comerciales y moderación' },
    { role: 'moderator', label: 'Moderador Técnico (Elena Rostova)', desc: 'Capacidad de ocultar publicaciones denunciadas y supervisar convivencia' },
    { role: 'user', label: 'Miembro Comunitario (Carlos Méndez)', desc: 'Publicar dudas, interactuar, guardar favoritos y responder' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0b101e] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/40">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Perfil de Usuario & Credenciales
            </h3>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-xs text-slate-300">
          
          {savedSuccess && (
            <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Perfil actualizado correctamente en el almacenamiento persistente.</span>
            </div>
          )}

          {/* User Header */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/50 border border-slate-800">
            <img
              src={currentUser?.avatar || import.meta.env.BASE_URL + 'assets/aistudio/image_72f5fead.png'}
              alt={currentUser?.name || 'Anderson Vallejo'}
              className="w-14 h-14 rounded-full object-cover object-[center_35%] border-2 border-violet-500/50"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-white">{currentUser?.name || 'Anderson Vallejo'}</h4>
                <span className="text-xs font-mono text-slate-400">@{currentUser?.username || 'anderson_nebulon'}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="px-2 py-0.5 rounded bg-violet-950/60 text-violet-300 border border-violet-800/40 uppercase">
                  Rol: {currentUser?.role || 'admin'}
                </span>
                <span className="text-slate-500">Miembro desde {currentUser?.joinedDate || 'Enero 2025'}</span>
              </div>
            </div>
          </div>

          {/* Profile Details or Edit Form */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-4 p-4 rounded-xl bg-slate-950/40 border border-slate-800">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Biografía</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Nivel de Aprendizaje / Experiencia</label>
                <select
                  value={editLevel}
                  onChange={(e) => setEditLevel(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                >
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                  <option value="Lead / Arquitecto">Lead / Arquitecto</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Tecnologías Favoritas (separadas por coma)</label>
                <input
                  type="text"
                  value={editTech}
                  onChange={(e) => setEditTech(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-slate-400 font-semibold">Biografía:</span>
                <p className="text-slate-300 leading-relaxed bg-slate-950/30 p-3 rounded-lg border border-slate-800/60">
                  {currentUser.bio}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-mono text-slate-400 font-semibold block mb-1">Nivel:</span>
                  <span className="text-slate-200 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                    {currentUser.experienceLevel}
                  </span>
                </div>

                <div>
                  <span className="font-mono text-slate-400 font-semibold block mb-1">Tecnologías:</span>
                  <div className="flex flex-wrap gap-1">
                    {(currentUser?.favoriteTech || []).map((t) => (
                      <span key={t} className="text-[11px] font-mono text-violet-300 bg-violet-950/50 px-2 py-0.5 rounded border border-violet-800/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1.5 pt-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar información de perfil</span>
              </button>
            </div>
          )}

          {/* Role Switching Sandbox for RBAC Testing */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 uppercase tracking-wider font-semibold">
              <ShieldCheck className="w-4 h-4 text-violet-400" />
              <span>Simulador de Roles de Usuario (RBAC)</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Permite alternar instantáneamente la identidad activa para comprobar cómo se comportan los permisos en la comunidad y en el panel administrativo.
            </p>

            <div className="space-y-2">
              {roles.map((r) => (
                <button
                  key={r.role}
                  onClick={() => switchUserRole(r.role)}
                  className={`w-full p-3 rounded-xl text-left border transition-all flex items-start gap-3 ${
                    currentUser.role === r.role
                      ? 'bg-violet-950/40 border-violet-700/60 text-white'
                      : 'bg-slate-950/30 border-slate-800 text-slate-300 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="mt-0.5">
                    {currentUser.role === r.role ? (
                      <Check className="w-4 h-4 text-violet-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-xs">{r.label}</div>
                    <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{r.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
