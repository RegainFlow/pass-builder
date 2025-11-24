import React from 'react';
import { Layers, ArrowRight, Server, Database, Globe } from 'lucide-react';

const blueprints = [
    {
        id: 'bp-001',
        name: 'Microservices Cluster',
        description: 'Production-ready K8s cluster with Istio service mesh and Prometheus monitoring.',
        icon: Globe,
        resources: ['3x Worker Nodes (16vCPU)', 'Managed Redis', 'Load Balancer']
    },
    {
        id: 'bp-002',
        name: 'Dev Sandbox',
        description: 'Lightweight environment for rapid prototyping and testing.',
        icon: Server,
        resources: ['1x T3.Large Instance', 'Docker Compose', 'Local Storage']
    },
    {
        id: 'bp-003',
        name: 'Data Analytics Stack',
        description: 'Spark cluster with JupyterHub and S3 integration.',
        icon: Database,
        resources: ['2x Spark Workers', 'JupyterHub', 'S3 Bucket']
    }
];

const BlueprintsView = () => {
    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Blueprints</h2>
                <p className="text-gray-400">Pre-configured templates for rapid deployment.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blueprints.map((bp) => (
                    <div key={bp.id} className="glass-card p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all group">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <bp.icon className="w-6 h-6 text-primary" />
                        </div>

                        <h3 className="text-xl font-bold mb-2">{bp.name}</h3>
                        <p className="text-gray-400 text-sm mb-4 h-10">{bp.description}</p>

                        <div className="space-y-2 mb-6">
                            {bp.resources.map((res, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                                    <Layers className="w-3 h-3" />
                                    <span>{res}</span>
                                </div>
                            ))}
                        </div>

                        <button className="w-full py-2 rounded-lg border border-white/20 hover:bg-primary hover:text-black hover:border-primary transition-all font-medium text-sm flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(0,214,203,0.2)]">
                            USE BLUEPRINT <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlueprintsView;
