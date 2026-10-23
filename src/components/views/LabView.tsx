import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Cpu, 
  Activity, 
  Layers, 
  Sliders, 
  Info,
  CheckCircle2,
  Terminal
} from 'lucide-react';

export const LabView: React.FC = () => {
  // Active experiment tab
  const [activeExp, setActiveExp] = useState<'sorting' | 'waves'>('sorting');

  // --- 1. Sorting Visualizer State ---
  const [arraySize, setArraySize] = useState(25);
  const [arrayData, setArrayData] = useState<number[]>([]);
  const [sortingState, setSortingState] = useState<'idle' | 'running' | 'paused' | 'done'>('idle');
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [metrics, setMetrics] = useState({ comparisons: 0, swaps: 0 });
  const [speed, setSpeed] = useState(40); // ms delay

  const sortingRef = useRef<{ stop: boolean; paused: boolean }>({ stop: false, paused: false });

  // Reset array
  const generateNewArray = () => {
    sortingRef.current.stop = true;
    setSortingState('idle');
    setActiveIndices([]);
    setMetrics({ comparisons: 0, swaps: 0 });

    const arr: number[] = [];
    for (let i = 0; i < arraySize; i++) {
      arr.push(Math.floor(Math.random() * 85) + 15);
    }
    setArrayData(arr);
  };

  useEffect(() => {
    generateNewArray();
  }, [arraySize]);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Bubble sort implementation with visual steps
  const runBubbleSort = async () => {
    sortingRef.current.stop = false;
    sortingRef.current.paused = false;
    setSortingState('running');

    const arr = [...arrayData];
    const n = arr.length;
    let comps = 0;
    let swaps = 0;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (sortingRef.current.stop) {
          setSortingState('idle');
          return;
        }

        while (sortingRef.current.paused) {
          await sleep(100);
          if (sortingRef.current.stop) return;
        }

        setActiveIndices([j, j + 1]);
        comps++;
        setMetrics({ comparisons: comps, swaps });
        await sleep(Math.max(10, 100 - speed));

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swaps++;
          setMetrics({ comparisons: comps, swaps });
          setArrayData([...arr]);
        }
      }
    }

    setActiveIndices([]);
    setSortingState('done');
  };

  const handlePauseResume = () => {
    if (sortingState === 'running') {
      sortingRef.current.paused = true;
      setSortingState('paused');
    } else if (sortingState === 'paused') {
      sortingRef.current.paused = false;
      setSortingState('running');
    }
  };

  // --- 2. Topological Wave Canvas ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [waveParams, setWaveParams] = useState({
    frequency: 0.02,
    amplitude: 45,
    speed: 0.03,
    colorMode: 'violet',
  });

  useEffect(() => {
    if (activeExp !== 'waves') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;

    const render = () => {
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const numLines = 14;
      const spacing = canvas.height / (numLines + 1);

      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1.5;

        // Gradient color
        const alpha = (i + 1) / numLines;
        ctx.strokeStyle = waveParams.colorMode === 'violet' 
          ? `rgba(168, 85, 247, ${alpha * 0.85})` 
          : `rgba(56, 189, 248, ${alpha * 0.85})`;

        const yBase = spacing * (i + 1);

        for (let x = 0; x < canvas.width; x += 4) {
          const angle = x * waveParams.frequency + step + i * 0.35;
          const y = yBase + Math.sin(angle) * (waveParams.amplitude * ((i + 1) / numLines));

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      step += waveParams.speed;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeExp, waveParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-widest text-violet-400">
          Laboratorio Tecnológico
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Experimentos, algoritmos visuales y prototipos interactivos.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Un entorno seguro para probar conceptos de vanguardia antes de convertirlos en productos terminados. Todos los experimentos se ejecutan en el navegador bajo entornos aislados sin inyección de scripts externos.
        </p>
      </div>

      {/* Experiment Selector Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveExp('sorting')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeExp === 'sorting'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-900/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Simulador de Algoritmos (Sorting)</span>
        </button>

        <button
          onClick={() => setActiveExp('waves')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeExp === 'waves'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-900/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Ondas Topológicas (Canvas 2D)</span>
        </button>
      </div>

      {/* Experiment 1: Sorting Algorithm Visualizer */}
      {activeExp === 'sorting' && (
        <div className="space-y-6">
          
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
            
            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div className="flex flex-wrap items-center gap-3">
                {sortingState === 'idle' || sortingState === 'done' ? (
                  <button
                    onClick={runBubbleSort}
                    className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Iniciar Simulación</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePauseResume}
                    className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    {sortingState === 'running' ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pausar</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Reanudar</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={generateNewArray}
                  className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Nuevos Datos</span>
                </button>
              </div>

              {/* Sliders & Configuration */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Elementos:</span>
                  <input
                    type="range"
                    min={12}
                    max={45}
                    value={arraySize}
                    disabled={sortingState === 'running'}
                    onChange={(e) => setArraySize(Number(e.target.value))}
                    className="w-24 accent-violet-500 cursor-pointer"
                  />
                  <span className="text-violet-400 font-bold">{arraySize}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Velocidad:</span>
                  <input
                    type="range"
                    min={10}
                    max={90}
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-24 accent-violet-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Live telemetry counters (per Constitution: strictly real simulation metrics) */}
              <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
                <div>
                  Comparaciones: <span className="text-sky-400 font-bold">{metrics.comparisons}</span>
                </div>
                <div>
                  Intercambios: <span className="text-violet-400 font-bold">{metrics.swaps}</span>
                </div>
              </div>
            </div>

            {/* Visualizer Canvas Area */}
            <div className="relative h-64 sm:h-80 w-full bg-[#050812] border border-slate-800/80 rounded-xl p-4 flex items-end justify-center gap-1 overflow-hidden">
              {arrayData.map((val, idx) => {
                const isActive = activeIndices.includes(idx);
                const isSorted = sortingState === 'done';

                let barColor = 'bg-slate-700/70 hover:bg-slate-600';
                if (isActive) barColor = 'bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)]';
                if (isSorted) barColor = 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]';

                return (
                  <div
                    key={idx}
                    style={{ height: `${val}%` }}
                    className={`flex-1 rounded-t transition-all ${barColor}`}
                    title={`Valor: ${val} (Índice: ${idx})`}
                  />
                );
              })}
            </div>

            {/* Explanatory notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-950/40 border border-slate-800/60 space-y-1">
                <span className="font-semibold text-slate-200 font-mono">Algoritmo: Bubble Sort</span>
                <p className="text-slate-400 leading-relaxed">
                  Compara pares adyacentes de elementos y los intercambia si están en el orden incorrecto. Complejidad temporal O(n²) en el peor caso y O(1) de espacio adicional.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950/40 border border-slate-800/60 space-y-1">
                <span className="font-semibold text-slate-200 font-mono">Decisión de Implementación</span>
                <p className="text-slate-400 leading-relaxed">
                  Se utiliza sincronización con micro-tareas asíncronas para ceder el control del hilo principal al navegador, garantizando 60 FPS estables sin bloquear la interfaz.
                </p>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Experiment 2: Topological Wave Canvas */}
      {activeExp === 'waves' && (
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Amplitud:</span>
                <input
                  type="range"
                  min={15}
                  max={80}
                  value={waveParams.amplitude}
                  onChange={(e) => setWaveParams({ ...waveParams, amplitude: Number(e.target.value) })}
                  className="w-24 accent-violet-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">Frecuencia:</span>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={waveParams.frequency * 100}
                  onChange={(e) => setWaveParams({ ...waveParams, frequency: Number(e.target.value) / 100 })}
                  className="w-24 accent-violet-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">Modo:</span>
                <button
                  type="button"
                  onClick={() => setWaveParams({ ...waveParams, colorMode: waveParams.colorMode === 'violet' ? 'sky' : 'violet' })}
                  className="px-2 py-1 rounded bg-slate-800 text-xs font-mono text-violet-300 border border-slate-700"
                >
                  {waveParams.colorMode === 'violet' ? 'Violeta' : 'Cian / Sky'}
                </button>
              </div>
            </div>

            <div className="text-xs font-mono text-slate-500">
              HTML5 Canvas API · Render 60 FPS
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#060a14]">
            <canvas
              ref={canvasRef}
              width={900}
              height={360}
              className="w-full h-auto block"
            />
          </div>

        </div>
      )}

      {/* Lab Inventions & Prototyping Roadmap */}
      <div className="space-y-4 pt-6 border-t border-slate-800/80">
        <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
          Fichas de Prototipos en Fase Experimental
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-slate-900/30 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-violet-400 font-semibold">Prototipo #01</span>
              <span className="text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                En pruebas
              </span>
            </div>
            <h4 className="text-sm font-semibold text-slate-100">Parser de AST en TypeScript</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Analizador sintáctico para extraer dependencias cíclicas en proyectos frontend complejos y sugerir refactorizaciones automatizadas.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/30 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-sky-400 font-semibold">Experimento #02</span>
              <span className="text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">
                Exploración
              </span>
            </div>
            <h4 className="text-sm font-semibold text-slate-100">Simulador de Shaders de Vidrio Acrílico</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Shader WebGL con refracción Fresnel y dispersión cromática para interfaces de usuario con sensación física de material translúcido.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/30 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-indigo-400 font-semibold">Proyecto Educativo #03</span>
              <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                Activo
              </span>
            </div>
            <h4 className="text-sm font-semibold text-slate-100">Inspector de Expresiones Regulares</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Herramienta paso a paso para depurar expresiones RegEx complejas visualizando el autómata finito determinista subyacente.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
