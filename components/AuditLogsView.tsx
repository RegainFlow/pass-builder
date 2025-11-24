import React from 'react';
import { Clock, User, Shield } from 'lucide-react';

const logs = [
    { id: 1, action: 'Environment Created', user: 'admin@regainflow.com', resource: 'prod-cluster-01', timestamp: '2 mins ago', status: 'SUCCESS' },
    { id: 2, action: 'Policy Violation', user: 'dev-user', resource: 's3-bucket-public', timestamp: '15 mins ago', status: 'BLOCKED' },
    { id: 3, action: 'Configuration Change', user: 'system', resource: 'firewall-rules', timestamp: '1 hour ago', status: 'SUCCESS' },
    { id: 4, action: 'Login Attempt', user: 'unknown', resource: 'auth-gateway', timestamp: '2 hours ago', status: 'FAILED' },
    { id: 5, action: 'Blueprint Updated', user: 'architect', resource: 'microservices-v2', timestamp: '1 day ago', status: 'SUCCESS' },
];

const AuditLogsView = () => {
    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Audit Logs</h2>
                <p className="text-gray-400">System activity and security events.</p>
            </div>

            <div className="glass-card rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Action</th>
                            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">User</th>
                            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Resource</th>
                            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Timestamp</th>
                            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-medium text-white">{log.action}</td>
                                <td className="p-4 text-gray-400 flex items-center gap-2">
                                    <User className="w-3 h-3" /> {log.user}
                                </td>
                                <td className="p-4 text-gray-400 font-mono text-xs">{log.resource}</td>
                                <td className="p-4 text-gray-500 text-sm flex items-center gap-2">
                                    <Clock className="w-3 h-3" /> {log.timestamp}
                                </td>
                                <td className="p-4">
                                    <span className={`
                    px-2 py-1 rounded text-[10px] font-bold border
                    ${log.status === 'SUCCESS' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : ''}
                    ${log.status === 'BLOCKED' ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' : ''}
                    ${log.status === 'FAILED' ? 'text-red-400 bg-red-400/10 border-red-400/20' : ''}
                  `}>
                                        {log.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AuditLogsView;
