# Contributing to RegainFlow Self-Service PaaS Environment Builder

Welcome to the RegainFlow project! This guide will help you understand the project structure, architecture, and how to contribute effectively as we scale.

## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Design System](#design-system)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)

---

## Project Overview

**RegainFlow** is a Self-Service PaaS Environment Builder that enables automated infrastructure provisioning and configuration management. The platform integrates:

- **Infrastructure as Code (IaC)**: Terraform for cloud resource provisioning
- **Configuration Management**: Ansible for automated configuration
- **Secure Boot**: HighSide PXE for secure OS deployment
- **AI-Powered Orchestration**: Gemini AI for intelligent deployment planning

### Core Features

- 🚀 **Automated Environment Provisioning**: One-click deployment of complete infrastructure stacks
- 🔧 **Multi-Cloud Support**: AWS, GCP, Azure resource management
- 🛡️ **Security-First**: HighSide PXE secure boot and hardened configurations
- 📊 **Real-Time Monitoring**: Live deployment logs and status tracking
- 🤖 **AI-Assisted Planning**: Gemini-powered deployment plan generation

### Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Vanilla CSS with Glass Morphism design system
- **Icons**: Lucide React
- **AI Integration**: Google Gemini AI
- **Build Tool**: Vite

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- **Gemini API Key** (for AI features)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/Self-Service-PaaS-Environment-Builder.git
   cd Self-Service-PaaS-Environment-Builder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:5173`

---

## Architecture

We follow the **Bulletproof React** architecture pattern for scalability and maintainability. As the project grows, we'll transition to this structure:

### Current Structure (Small Scale)

```
Self-Service-PaaS-Environment-Builder/
├── components/          # Shared React components
│   └── Provisioner.tsx
├── services/            # API and external service integrations
│   └── geminiService.ts
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
├── STYLES.md            # Design system documentation
└── package.json
```

### Target Structure (Scaled)

As we scale, we'll adopt the following feature-based architecture inspired by [bulletproof-react](https://github.com/alan2207/bulletproof-react):

```
src/
├── app/                 # Application layer
│   ├── routes/          # Route definitions and pages
│   ├── App.tsx          # Root application component
│   └── provider.tsx     # Global providers (theme, auth, etc.)
│
├── assets/              # Static files (images, fonts, etc.)
│
├── components/          # Shared components used across features
│   ├── ui/              # Base UI components (Button, Input, Card, etc.)
│   ├── layouts/         # Layout components (Header, Sidebar, etc.)
│   └── common/          # Common composite components
│
├── config/              # Global configuration
│   ├── env.ts           # Environment variables
│   └── constants.ts     # Application constants
│
├── features/            # Feature-based modules
│   ├── environments/    # Environment management feature
│   │   ├── api/         # API calls for environments
│   │   ├── components/  # Feature-specific components
│   │   ├── hooks/       # Feature-specific hooks
│   │   ├── types/       # Feature-specific types
│   │   └── utils/       # Feature-specific utilities
│   │
│   ├── provisioning/    # Provisioning feature
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── utils/
│   │
│   └── monitoring/      # Monitoring and logs feature
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── types/
│       └── utils/
│
├── hooks/               # Shared hooks
│   ├── useAsync.ts
│   └── useLocalStorage.ts
│
├── lib/                 # External library configurations
│   ├── gemini.ts        # Gemini AI client setup
│   └── axios.ts         # HTTP client setup
│
├── stores/              # Global state management (Zustand/Context)
│   ├── authStore.ts
│   └── environmentStore.ts
│
├── styles/              # Global styles
│   ├── base.css         # CSS resets
│   ├── variables.css    # Design tokens (see STYLES.md)
│   ├── utilities.css    # Utility classes
│   └── animations.css   # Keyframe animations
│
├── types/               # Shared TypeScript types
│   ├── api.ts
│   └── common.ts
│
└── utils/               # Shared utility functions
    ├── format.ts
    └── validation.ts
```

### Architecture Principles

#### 1. **Feature-Based Organization**

Each feature is self-contained with its own:
- **API layer**: All API calls related to the feature
- **Components**: UI components specific to the feature
- **Hooks**: Custom hooks for feature logic
- **Types**: TypeScript definitions
- **Utils**: Helper functions

**Example**: The `environments` feature would contain everything related to managing environments.

#### 2. **No Cross-Feature Imports**

Features should NOT import from each other. Instead:
- Share common logic via the `components/`, `hooks/`, or `utils/` directories
- Compose features at the application level (`app/routes/`)

This prevents tight coupling and makes features more maintainable.

#### 3. **Colocation**

Keep related code close together. If a component is only used within a feature, keep it in that feature's `components/` folder.

#### 4. **Separation of Concerns**

- **Presentation**: Components focus on UI rendering
- **Business Logic**: Hooks and utilities handle logic
- **Data Fetching**: API layer manages server communication
- **State Management**: Stores manage global state

---

## Design System

**All UI/UX work MUST follow the [STYLES.md](./STYLES.md) design guide.**

### Key Design Principles

1. **Glass Morphism + Neon Aesthetic**
   - Dark backgrounds with frosted glass overlays
   - Subtle cyan neon accents (`--color-primary: #00d6cb`)
   - Smooth animations and transitions

2. **Use CSS Variables**
   ```css
   /* ✅ GOOD */
   .my-button {
     background: var(--color-primary-alpha-15);
     color: var(--color-primary);
     border-radius: var(--radius-base);
   }

   /* ❌ BAD */
   .my-button {
     background: rgba(0, 214, 203, 0.15);
     color: #00d6cb;
     border-radius: 8px;
   }
   ```

3. **Icon System**
   - Use **Lucide React** icons consistently
   - Standard sizes: 16px (inline), 20-24px (cards), 32px (headers), 48px (features)

4. **Responsive Design**
   - Mobile-first approach
   - Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

5. **Accessibility**
   - Semantic HTML
   - ARIA labels where needed
   - Keyboard navigation support
   - Sufficient color contrast

### Utility Classes

Use pre-defined utility classes from `STYLES.md`:

```tsx
// Glass card
<div className="glass-card">
  {/* Content */}
</div>

// Neon button
<button className="neon-button-glass">
  Deploy
</button>

// Text highlight
<span className="text-highlight">Important</span>
```

---

## Development Workflow

### 1. **Create a Feature Branch**

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `style/` - Design/styling changes

### 2. **Follow the Architecture**

When adding a new feature:

1. **Create the feature directory**:
   ```bash
   mkdir -p src/features/my-feature/{api,components,hooks,types,utils}
   ```

2. **Define types first** (`types/index.ts`):
   ```typescript
   export interface MyFeature {
     id: string;
     name: string;
     status: FeatureStatus;
   }
   ```

3. **Create API layer** (`api/myFeatureApi.ts`):
   ```typescript
   export const fetchMyFeature = async (id: string) => {
     // API call implementation
   };
   ```

4. **Build components** (`components/MyFeatureCard.tsx`):
   ```tsx
   import { MyFeature } from '../types';

   export const MyFeatureCard = ({ feature }: { feature: MyFeature }) => {
     return (
       <div className="glass-card">
         {/* Component implementation */}
       </div>
     );
   };
   ```

5. **Create custom hooks** (`hooks/useMyFeature.ts`):
   ```typescript
   export const useMyFeature = (id: string) => {
     // Hook implementation
   };
   ```

### 3. **Write Clean Code**

- **TypeScript**: Use strict typing, avoid `any`
- **Naming**: Use descriptive names (e.g., `handleEnvironmentDeploy` not `handleClick`)
- **Comments**: Explain *why*, not *what*
- **File Size**: Keep components under 300 lines; split if larger

### 4. **Test Your Changes**

```bash
# Run development server
npm run dev

# Build for production (test for build errors)
npm run build

# Preview production build
npm run preview
```

---

## Code Standards

### TypeScript

```typescript
// ✅ GOOD: Explicit types
interface DeploymentConfig {
  name: string;
  region: string;
  resources: ResourceConfig;
}

const deploy = (config: DeploymentConfig): Promise<Environment> => {
  // Implementation
};

// ❌ BAD: Implicit any
const deploy = (config) => {
  // Implementation
};
```

### React Components

```tsx
// ✅ GOOD: Functional component with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
  return (
    <button 
      className={`neon-button-glass ${variant}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

// ❌ BAD: No types, unclear props
export const Button = ({ label, onClick, variant }) => {
  // Implementation
};
```

### Hooks

```typescript
// ✅ GOOD: Custom hook with clear return type
export const useEnvironments = () => {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Hook logic

  return { environments, loading, error };
};
```

### CSS/Styling

```css
/* ✅ GOOD: Use design tokens */
.my-component {
  background: var(--glass-bg-medium);
  backdrop-filter: var(--glass-blur-lg);
  border: 1px solid var(--glass-border-accent);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: all var(--transition-base) var(--ease-out);
}

/* ❌ BAD: Hardcoded values */
.my-component {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 214, 203, 0.2);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.25s ease;
}
```

---

## Testing

### Manual Testing Checklist

Before submitting a PR, verify:

- [ ] Feature works in development mode (`npm run dev`)
- [ ] No console errors or warnings
- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] All interactive elements are keyboard accessible
- [ ] Design follows STYLES.md guidelines
- [ ] TypeScript compiles without errors
- [ ] Production build succeeds (`npm run build`)

### Future: Automated Testing

As we scale, we'll add:
- **Unit Tests**: Vitest for component and utility testing
- **Integration Tests**: Testing Library for user interaction flows
- **E2E Tests**: Playwright for full application testing

---

## Submitting Changes

### 1. **Commit Your Changes**

Use conventional commit messages:

```bash
# Format: <type>(<scope>): <description>

git commit -m "feat(provisioning): add multi-cloud provider selection"
git commit -m "fix(environments): resolve status update race condition"
git commit -m "docs(contributing): add architecture guidelines"
git commit -m "style(ui): update glass card hover effects"
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Design/styling (not code style)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks

### 2. **Push Your Branch**

```bash
git push origin feature/your-feature-name
```

### 3. **Create a Pull Request**

1. Go to the repository on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill out the PR template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Refactoring
- [ ] Documentation
- [ ] Design/styling

## Checklist
- [ ] Follows STYLES.md design system
- [ ] TypeScript types are properly defined
- [ ] No console errors
- [ ] Responsive design tested
- [ ] Code follows architecture guidelines
- [ ] Production build succeeds

## Screenshots (if applicable)
Add screenshots for UI changes
```

### 4. **Code Review**

- Address reviewer feedback promptly
- Keep discussions professional and constructive
- Update your PR based on suggestions

---

## Project Roadmap

### Phase 1: Foundation (Current)
- ✅ Core UI with glass morphism design
- ✅ Environment dashboard
- ✅ AI-powered provisioning
- ✅ Real-time deployment logs

### Phase 2: Feature Expansion
- [ ] Multi-cloud provider support (AWS, GCP, Azure)
- [ ] Advanced Terraform module library
- [ ] Ansible playbook marketplace
- [ ] User authentication and RBAC

### Phase 3: Enterprise Features
- [ ] Team collaboration
- [ ] Audit logging and compliance
- [ ] Cost optimization recommendations
- [ ] Advanced monitoring and alerting

### Phase 4: Scale & Performance
- [ ] Migrate to feature-based architecture
- [ ] Add comprehensive test coverage
- [ ] Performance optimization
- [ ] CI/CD pipeline automation

---

## Resources

- **Design System**: [STYLES.md](./STYLES.md)
- **Bulletproof React**: [GitHub Repository](https://github.com/alan2207/bulletproof-react)
- **React Documentation**: [react.dev](https://react.dev)
- **TypeScript Handbook**: [typescriptlang.org](https://www.typescriptlang.org/docs/)
- **Vite Guide**: [vitejs.dev](https://vitejs.dev/guide/)

---

## Getting Help

- **Questions?** Open a GitHub Discussion
- **Bug Reports**: Create an issue with the `bug` label
- **Feature Requests**: Create an issue with the `enhancement` label
- **Security Issues**: Email security@regainflow.com (do not create public issues)

---

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

**Thank you for contributing to RegainFlow! 🚀**

Together, we're building the future of self-service infrastructure automation.
