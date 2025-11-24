import React, { useState, useCallback } from 'react';
import { generateDeploymentPlan } from '../services/geminiService';
import { DeploymentPlan } from '../types';
import { Send, Terminal, Cpu, Layers, CheckCircle, Loader2 } from 'lucide-react';

interface AIChatbotViewProps {
  onDeploy: (plan: DeploymentPlan) => void;
}

const AIChatbotView: React.FC<AIChatbotViewProps> = ({ onDeploy }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<DeploymentPlan | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const generatedPlan = await generateDeploymentPlan(input);
      setPlan(generatedPlan);
    } catch (e) {
      console.error(e);
      // Fallback for error in demo
      setPlan({
        name: "Error Fallback Env",
        summary: "Could not generate custom plan, showing default.",
        infrastructure: ["Terraform: Default VPC", "Terraform: EC2 Instance"],
        configuration: ["Ansible: Update Apt", "Ansible: Install Python"]
      });
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold font-sans text-white mb-2">
          AI Infrastructure Assistant
        </h2>
        <p className="text-gray-400 font-logo">
          Chat with RegainFlow AI to design and provision complex environments.
        </p>
      </div>

      {!plan ? (
        <div className="glass-card p-8 rounded-2xl border border-primary/20 neon-glow relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <label className="block text-primary text-sm font-semibold mb-2 uppercase tracking-wider">
              Describe your requirements
            </label>
            <textarea
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all h-40 resize-none"
              placeholder="e.g., I need a high-availability Kubernetes cluster with 3 worker nodes, Redis caching, and Nginx ingress controller for a production microservices workload."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={handleGenerate}
                disabled={isLoading || !input.trim()}
                className={`
                  flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all
                  ${isLoading 
                    ? 'bg-primary/20 cursor-not-allowed text-primary' 
                    : 'bg-primary/10 text-primary border border-primary hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(0,214,203,0.3)]'}
                `}
              >
                {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
                {isLoading ? 'ANALYZING...' : 'GENERATE BLUEPRINT'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-2xl border border-primary/20 overflow-hidden animate-slide-up">
          <div className="bg-primary/10 p-6 border-b border-white/10 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Terminal className="text-primary" />
                {plan.name}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{plan.summary}</p>
            </div>
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-mono border border-primary/20">
              DRAFT
            </span>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-semibold border-b border-white/10 pb-2">
                <Layers className="w-5 h-5" />
                <span>Infrastructure (Terraform)</span>
              </div>
              <ul className="space-y-3">
                {plan.infrastructure.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300 font-mono bg-black/20 p-2 rounded">
                    <span className="text-primary mt-1">➜</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-semibold border-b border-white/10 pb-2">
                <Cpu className="w-5 h-5" />
                <span>Configuration (Ansible/PXE)</span>
              </div>
              <ul className="space-y-3">
                {plan.configuration.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300 font-mono bg-black/20 p-2 rounded">
                    <span className="text-primary mt-1">➜</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-6 bg-black/20 border-t border-white/10 flex justify-between items-center">
            <button
              onClick={() => setPlan(null)}
              className="text-gray-400 hover:text-white text-sm"
            >
              ← Back to Edit
            </button>
            <button
              onClick={() => onDeploy(plan)}
              className="flex items-center gap-2 px-8 py-3 rounded-lg font-bold bg-primary text-black hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,214,203,0.4)]"
            >
              <CheckCircle className="w-5 h-5" />
              CONFIRM & DEPLOY
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatbotView;
