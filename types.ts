export enum EnvStatus {
  PROVISIONING = 'PROVISIONING',
  BOOTSTRAPPING = 'BOOTSTRAPPING', // PXE phase
  CONFIGURING = 'CONFIGURING',     // Ansible phase
  ACTIVE = 'ACTIVE',
  ERROR = 'ERROR'
}

export interface Environment {
  id: string;
  name: string;
  type: 'K8s Cluster' | 'Dev Environment' | 'CI/CD Pipeline';
  status: EnvStatus;
  region: string;
  resources: {
    cpu: string;
    memory: string;
    storage: string;
  };
  createdAt: string;
  terraformWorkspace: string;
  ansiblePlaybook: string;
}

export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
  source: 'Terraform' | 'Ansible' | 'PXE' | 'System';
}

export interface DeploymentPlan {
  name: string;
  summary: string;
  infrastructure: string[];
  configuration: string[];
}