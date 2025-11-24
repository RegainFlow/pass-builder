import React, { useState } from 'react';
import { DeploymentPlan } from '../types';
import { Server, Globe, Cpu, HardDrive, Save } from 'lucide-react';

interface StaticEnvironmentFormProps {
    onDeploy: (plan: DeploymentPlan) => void;
    onCancel: () => void;
}

const StaticEnvironmentForm: React.FC<StaticEnvironmentFormProps> = ({ onDeploy, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        region: 'us-east-1',
        type: 'K8s Cluster',
        cpu: '4 vCPU',
        memory: '16 GB',
        storage: '100 GB',
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const plan: DeploymentPlan = {
            name: formData.name,
            summary: formData.description || `Manual deployment of ${formData.type} in ${formData.region}`,
            infrastructure: [
                `Terraform: Provider AWS (${formData.region})`,
                `Terraform: VPC & Subnets`,
                `Terraform: ${formData.type} Resources`,
                `Spec: ${formData.cpu}, ${formData.memory}, ${formData.storage}`
            ],
            configuration: [
                'Ansible: Base OS Configuration',
                'Ansible: Security Hardening',
                'Ansible: Monitoring Agent'
            ]
        };
        onDeploy(plan);
    };

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">New Environment</h2>
                <p className="text-gray-400">Configure your infrastructure manually.</p>
            </div>

            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-xl border border-white/10 space-y-6">

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Environment Name</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="e.g., prod-cluster-01"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                {/* Type & Region */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Environment Type</label>
                        <div className="relative">
                            <Server className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                            <select
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none"
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option>K8s Cluster</option>
                                <option>Dev Environment</option>
                                <option>CI/CD Pipeline</option>
                                <option>Database Cluster</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Region</label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                            <select
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none"
                                value={formData.region}
                                onChange={e => setFormData({ ...formData, region: e.target.value })}
                            >
                                <option value="us-east-1">US East (N. Virginia)</option>
                                <option value="us-west-2">US West (Oregon)</option>
                                <option value="eu-central-1">EU Central (Frankfurt)</option>
                                <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Resources */}
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">CPU</label>
                        <div className="relative">
                            <Cpu className="absolute left-3 top-3 w-3 h-3 text-gray-500" />
                            <select
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-2 pl-8 text-sm text-white focus:border-primary outline-none"
                                value={formData.cpu}
                                onChange={e => setFormData({ ...formData, cpu: e.target.value })}
                            >
                                <option>2 vCPU</option>
                                <option>4 vCPU</option>
                                <option>8 vCPU</option>
                                <option>16 vCPU</option>
                                <option>32 vCPU</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">Memory</label>
                        <div className="relative">
                            <div className="absolute left-3 top-3 w-3 h-3 text-gray-500 font-bold text-[10px]">M</div>
                            <select
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-2 pl-8 text-sm text-white focus:border-primary outline-none"
                                value={formData.memory}
                                onChange={e => setFormData({ ...formData, memory: e.target.value })}
                            >
                                <option>4 GB</option>
                                <option>8 GB</option>
                                <option>16 GB</option>
                                <option>32 GB</option>
                                <option>64 GB</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">Storage</label>
                        <div className="relative">
                            <HardDrive className="absolute left-3 top-3 w-3 h-3 text-gray-500" />
                            <select
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-2 pl-8 text-sm text-white focus:border-primary outline-none"
                                value={formData.storage}
                                onChange={e => setFormData({ ...formData, storage: e.target.value })}
                            >
                                <option>50 GB</option>
                                <option>100 GB</option>
                                <option>500 GB</option>
                                <option>1 TB</option>
                                <option>5 TB</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description / Tags</label>
                    <textarea
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all h-24 resize-none"
                        placeholder="Optional description or tags..."
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2 rounded-lg font-bold bg-primary text-black hover:bg-white transition-all shadow-[0_0_15px_rgba(0,214,203,0.3)]"
                    >
                        <Save className="w-4 h-4" />
                        CREATE ENVIRONMENT
                    </button>
                </div>

            </form>
        </div>
    );
};

export default StaticEnvironmentForm;
