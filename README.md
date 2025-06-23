# QuantumHealth - Healthcare Management System

A modern, comprehensive healthcare management platform built with React and TypeScript.

## About QuantumHealth

QuantumHealth is your trusted healthcare companion designed to bridge the gap between patients and healthcare providers. Our platform provides secure messaging, report management, appointment booking, and comprehensive health tracking tools.

### Key Features

- **Dual Role System**: Separate interfaces for doctors and patients
- **Secure Messaging**: HIPAA-compliant communication between patients and healthcare providers
- **Report Management**: Upload, view, and manage medical reports with thumbnail previews
- **Appointment Booking**: Streamlined scheduling system for patient-doctor appointments
- **Dashboard Analytics**: Comprehensive health metrics and insights
- **Modern UI**: Built with shadcn-ui components for a professional, accessible experience

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite (fast development and production builds)
- **UI Framework**: shadcn-ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6
- **State Management**: React Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Charts & Visualization**: Recharts for health analytics

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or Bun)
- Git

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd quantumhealth
```

2. Install dependencies:
```bash
npm install
# or if using Bun
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development environment
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code analysis

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn-ui components
│   ├── messages/       # Message system components
│   └── reports/        # Report management components
├── pages/              # Page components and routing
├── hooks/              # Custom React hooks
├── services/           # API and business logic
├── mock/               # Development mock data
└── lib/                # Utility functions
```

## User Roles

### For Patients
- View and upload medical reports
- Secure messaging with healthcare providers
- Book and manage appointments
- Personal health dashboard

### For Doctors
- Review patient reports and communications
- Manage patient interactions
- Access comprehensive patient information
- Administrative tools and settings

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. All rights reserved.

## Support

For support, please contact the QuantumHealth development team.

---

**QuantumHealth** - Your trusted healthcare companion for a healthier tomorrow.
