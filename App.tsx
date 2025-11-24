import React, { useState, useEffect, useRef } from 'react';
import { EnvStatus, Environment, LogEntry, DeploymentPlan } from './types';
import AIChatbotView from './components/AIChatbotView';
import StaticEnvironmentForm from './components/StaticEnvironmentForm';
import BlueprintsView from './components/BlueprintsView';
import AuditLogsView from './components/AuditLogsView';
import SettingsView from './components/SettingsView';
import {
  Server,
  Terminal as TerminalIcon,
  Plus,
  Cpu,
  Globe,
  Clock,
  ChevronRight,
  ShieldCheck,
  Bot,
  LayoutTemplate,
  ScrollText,
  Settings as SettingsIcon
} from 'lucide-react';

type ViewState = 'DASHBOARD' | 'CREATE_STATIC' | 'AI_CHATBOT' | 'BLUEPRINTS' | 'AUDIT_LOGS' | 'SETTINGS';

const Header = ({ currentView, setView }: { currentView: ViewState, setView: (v: ViewState) => void }) => (
  <header className="fixed top-0 w-full z-50 glass-card !rounded-none !border-x-0 border-b border-white/10 h-16 flex items-center justify-between px-6">
    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('DASHBOARD')}>
      <div className="w-8 h-8 rounded bg-primary flex items-center justify-center neon-glow">
        <Server className="text-black w-5 h-5" />
      </div>
      <h1 className="font-logo font-bold text-xl tracking-wide">
        REGAIN<span className="text-primary">FLOW</span>
      </h1>
    </div>
    <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-400">
      <button
        onClick={() => setView('DASHBOARD')}
        className={`px-4 py-2 rounded-lg transition-colors ${currentView === 'DASHBOARD' ? 'text-white bg-white/10' : 'hover:text-primary'}`}
      >
        Environments
      </button>
      <button
        onClick={() => setView('BLUEPRINTS')}
        className={`px-4 py-2 rounded-lg transition-colors ${currentView === 'BLUEPRINTS' ? 'text-white bg-white/10' : 'hover:text-primary'}`}
      >
        Blueprints
      </button>
      <button
        onClick={() => setView('AUDIT_LOGS')}
        className={`px-4 py-2 rounded-lg transition-colors ${currentView === 'AUDIT_LOGS' ? 'text-white bg-white/10' : 'hover:text-primary'}`}
      >
        Audit Logs
      </button>
      <button
        onClick={() => setView('SETTINGS')}
        className={`px-4 py-2 rounded-lg transition-colors ${currentView === 'SETTINGS' ? 'text-white bg-white/10' : 'hover:text-primary'}`}
      >
        Settings
      </button>
    </nav>
    <div className="flex items-center gap-4">
      <button
        onClick={() => setView('AI_CHATBOT')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${currentView === 'AI_CHATBOT' ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(0,214,203,0.3)]' : 'border-white/20 text-gray-400 hover:border-primary/50 hover:text-primary'}`}
      >
        <Bot className="w-4 h-4" />
        <span className="text-xs font-bold">AI ASSISTANT</span>
      </button>
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-blue-600 border border-white/20"></div>
    </div>
  </header>
);

const EnvCard = ({ env }: { env: Environment }) => {
  const statusColors = {
    [EnvStatus.ACTIVE]: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    [EnvStatus.PROVISIONING]: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    [EnvStatus.BOOTSTRAPPING]: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    [EnvStatus.CONFIGURING]: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    [EnvStatus.ERROR]: 'text-red-400 bg-red-400/10 border-red-400/20',
  };

  return (
    <div className="glass-card p-6 rounded-xl hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full filter blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            {env.type === 'K8s Cluster' ? <Globe className="w-5 h-5 text-primary" /> : <Server className="w-5 h-5 text-primary" />}
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">{env.name}</h3>
            <span className="text-xs text-gray-500 font-mono">{env.id}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-bold border ${statusColors[env.status]}`}>
          {env.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-black/20 p-2 rounded border border-white/5">
          <p className="text-[10px] text-gray-500 uppercase">CPU</p>
          <p className="text-sm font-mono text-gray-300">{env.resources.cpu}</p>
        </div>
        <div className="bg-black/20 p-2 rounded border border-white/5">
          <p className="text-[10px] text-gray-500 uppercase">MEM</p>
          <p className="text-sm font-mono text-gray-300">{env.resources.memory}</p>
        </div>
        <div className="bg-black/20 p-2 rounded border border-white/5">
          <p className="text-[10px] text-gray-500 uppercase">Region</p>
          <p className="text-sm font-mono text-gray-300">{env.region}</p>
        </div>
      </div>

      <div className="space-y-2 relative z-10">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Cpu className="w-3 h-3" />
          <span>Terraform Workspace: {env.terraformWorkspace}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <ShieldCheck className="w-3 h-3" />
          <span>HighSide PXE: {env.status === EnvStatus.ACTIVE ? 'Complete' : 'Pending'}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {new Date(env.createdAt).toLocaleDateString()}
        </span>
        <button className="text-primary text-xs font-bold hover:text-white transition-colors flex items-center gap-1">
          MANAGE <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

const TerminalView = ({ logs, activeEnv }: { logs: LogEntry[], activeEnv: Environment | null }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!activeEnv) return null;

  return (
    <div className="glass-card rounded-xl border border-white/10 overflow-hidden flex flex-col h-full max-h-[400px]">
      <div className="bg-[#1e1e1e] p-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-mono text-gray-300">Live Deployment Stream: {activeEnv.id}</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 bg-[#0c0c0c] p-4 overflow-y-auto font-mono text-xs space-y-1">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2 animate-fade-in">
            <span className="text-gray-600">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
            <span className={`
              ${log.level === 'INFO' ? 'text-blue-400' : ''}
              ${log.level === 'WARN' ? 'text-yellow-400' : ''}
              ${log.level === 'ERROR' ? 'text-red-400' : ''}
              ${log.level === 'SUCCESS' ? 'text-emerald-400' : ''}
              font-bold
            `}>
              {log.level}
            </span>
            <span className="text-gray-500">[{log.source}]</span>
            <span className="text-gray-300">{log.message}</span>
          </div>
        ))}
        <div className="animate-pulse text-primary">_</div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewState>('DASHBOARD');
  const [environments, setEnvironments] = useState<Environment[]>([
    {
      id: 'env-prod-001',
      name: 'Production Cluster US-East',
      type: 'K8s Cluster',
      status: EnvStatus.ACTIVE,
      region: 'us-east-1',
      resources: { cpu: '64 vCPU', memory: '256 GB', storage: '10 TB' },
      createdAt: '2023-10-15T10:00:00Z',
      terraformWorkspace: 'prod-core',
      ansiblePlaybook: 'k8s-hardened.yml'
    },
    {
      id: 'env-dev-alpha',
      name: 'Alpha Dev Sandbox',
      type: 'Dev Environment',
      status: EnvStatus.ACTIVE,
      region: 'us-west-2',
      resources: { cpu: '8 vCPU', memory: '32 GB', storage: '500 GB' },
      createdAt: '2023-10-20T14:30:00Z',
      terraformWorkspace: 'dev-alpha',
      ansiblePlaybook: 'dev-std.yml'
    }
  ]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeDeployId, setActiveDeployId] = useState<string | null>(null);

  // Simulation effect for deployment logs
  useEffect(() => {
    if (!activeDeployId) return;

    const stages = [
      { msg: "Initializing Terraform backend...", src: "Terraform", delay: 500 },
      { msg: "Plan generated. 14 resources to add.", src: "Terraform", delay: 1500 },
      { msg: "Provisioning AWS VPC resources...", src: "Terraform", delay: 2500 },
      { msg: "Instances initialized. Waiting for PXE boot...", src: "PXE", delay: 4000 },
      { msg: "HighSide Secure Bootloader active.", src: "PXE", delay: 5000 },
      { msg: "OS Image streamed successfully.", src: "PXE", delay: 6000 },
      { msg: "Ansible inventory updated.", src: "Ansible", delay: 7000 },
      { msg: "Running playbook: security-hardening.yml", src: "Ansible", delay: 8000 },
      { msg: "Environment configuration complete.", src: "System", delay: 9500, level: 'SUCCESS' },
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];

    stages.forEach((stage) => {
      const t = setTimeout(() => {
        setLogs(prev => [...prev, {
          timestamp: new Date().toISOString(),
          level: stage.level as any || 'INFO',
          message: stage.msg,
          source: stage.src as any
        }]);

        if (stage.level === 'SUCCESS') {
          setEnvironments(prev => prev.map(e =>
            e.id === activeDeployId ? { ...e, status: EnvStatus.ACTIVE } : e
          ));
          setActiveDeployId(null);
        }
      }, stage.delay);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [activeDeployId]);

  const handleDeploy = (plan: DeploymentPlan) => {
    const newId = `env-${Math.random().toString(36).substr(2, 6)}`;
    const newEnv: Environment = {
      id: newId,
      name: plan.name,
      type: 'K8s Cluster', // Simplified for demo
      status: EnvStatus.PROVISIONING,
      region: 'us-east-1',
      resources: { cpu: 'Pending', memory: 'Pending', storage: 'Pending' },
      createdAt: new Date().toISOString(),
      terraformWorkspace: 'auto-gen-' + newId,
      ansiblePlaybook: 'auto-provision.yml'
    };

    setEnvironments([newEnv, ...environments]);
    setLogs([{
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message: `Starting automated deployment for ${plan.name}`,
      source: 'System'
    }]);
    setActiveDeployId(newId);
    setView('DASHBOARD');
  };

  const activeProvisioningEnv = environments.find(e => e.id === activeDeployId) || (activeDeployId ? environments[0] : null);

  return (
    <div className="min-h-screen bg-[#121213] text-white pt-20 pb-10 font-sans selection:bg-primary/30 selection:text-white">
      <Header currentView={view} setView={setView} />

      <main className="container mx-auto px-4 md:px-6">

        {view === 'DASHBOARD' && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-1">Infrastructure Overview</h2>
                <p className="text-gray-400">Managing {environments.length} active environments across 2 regions.</p>
              </div>
              <button
                onClick={() => setView('CREATE_STATIC')}
                className="group flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 px-5 py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(0,214,203,0.15)] hover:shadow-[0_0_25px_rgba(0,214,203,0.3)]"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                <span className="font-bold tracking-wide">NEW ENVIRONMENT</span>
              </button>
            </div>

            {/* Live Terminal for Active Deployment */}
            {activeDeployId && (
              <div className="mb-8 animate-slide-up">
                <TerminalView logs={logs} activeEnv={activeProvisioningEnv} />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {environments.map(env => (
                <EnvCard key={env.id} env={env} />
              ))}
            </div>
          </div>
        )}

        {view === 'CREATE_STATIC' && (
          <StaticEnvironmentForm
            onDeploy={handleDeploy}
            onCancel={() => setView('DASHBOARD')}
          />
        )}

        {view === 'AI_CHATBOT' && (
          <AIChatbotView onDeploy={handleDeploy} />
        )}

        {view === 'BLUEPRINTS' && <BlueprintsView />}
        {view === 'AUDIT_LOGS' && <AuditLogsView />}
        {view === 'SETTINGS' && <SettingsView />}

      </main>

      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
}