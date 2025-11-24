import React from 'react';
import { Settings, Key, Cloud, Bell } from 'lucide-react';

const SettingsView = () => {
    return (
        <div className="animate-fade-in max-w-3xl">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
                <p className="text-gray-400">Manage your preferences and integrations.</p>
            </div>

            <div className="space-y-6">

                {/* General */}
                <div className="glass-card p-6 rounded-xl border border-white/10">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-primary" /> General
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Dark Mode</p>
                                <p className="text-xs text-gray-500">Enable system-wide dark theme</p>
                            </div>
                            <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Desktop Notifications</p>
                                <p className="text-xs text-gray-500">Get alerts for deployment status</p>
                            </div>
                            <div className="w-10 h-6 bg-white/10 rounded-full relative cursor-pointer">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white/50 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* API Keys */}
                <div className="glass-card p-6 rounded-xl border border-white/10">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Key className="w-5 h-5 text-primary" /> API Configuration
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Gemini API Key</label>
                            <input
                                type="password"
                                value="************************"
                                readOnly
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-gray-400 font-mono"
                            />
                        </div>
                    </div>
                </div>

                {/* Cloud Providers */}
                <div className="glass-card p-6 rounded-xl border border-white/10">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Cloud className="w-5 h-5 text-primary" /> Cloud Providers
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                            <span className="font-medium">AWS (Amazon Web Services)</span>
                            <span className="text-xs text-emerald-400 font-bold bg-emerald-400/10 px-2 py-1 rounded">CONNECTED</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                            <span className="font-medium">GCP (Google Cloud Platform)</span>
                            <span className="text-xs text-gray-500 font-bold bg-white/5 px-2 py-1 rounded">NOT CONFIGURED</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                            <span className="font-medium">Azure</span>
                            <span className="text-xs text-gray-500 font-bold bg-white/5 px-2 py-1 rounded">NOT CONFIGURED</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SettingsView;
