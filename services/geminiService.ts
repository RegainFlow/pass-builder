import { GoogleGenAI, Type } from "@google/genai";
import { DeploymentPlan } from '../types';

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const MODEL_NAME = 'gemini-2.5-flash';

export const generateDeploymentPlan = async (userRequest: string): Promise<DeploymentPlan> => {
  if (!process.env.API_KEY) {
    // Fallback mock response for demo purposes if no key is present
    console.warn("No API_KEY found. Using mock response.");
    return new Promise(resolve => setTimeout(() => resolve({
      name: "Auto-Generated K8s Cluster",
      summary: "A high-availability Kubernetes cluster configured for microservices.",
      infrastructure: [
        "Terraform: aws_eks_cluster.main",
        "Terraform: aws_vpc.main",
        "Terraform: 3x t3.large worker nodes"
      ],
      configuration: [
        "Ansible: Install Docker Runtime",
        "Ansible: Configure Kubelet",
        "Helm: Install Nginx Ingress"
      ]
    }), 2000));
  }

  const systemInstruction = `
    You are a DevOps Engineering AI for RegainFlow. 
    Your job is to translate natural language requests into a structured PaaS deployment plan.
    The platform uses Terraform for infra, Ansible for config, and K8s for orchestration.
    
    Return a valid JSON object matching the schema provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: userRequest,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "A technical name for the environment" },
            summary: { type: Type.STRING, description: "Short description of what will be built" },
            infrastructure: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of Terraform resources to create"
            },
            configuration: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of Ansible tasks or PXE bootstrap steps"
            }
          },
          required: ["name", "summary", "infrastructure", "configuration"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as DeploymentPlan;
    }
    throw new Error("Empty response from AI");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};