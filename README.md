# QuantumTrack

**Advanced Credit Line Management System**

A professional, mobile-first React web application designed for building stores to efficiently manage customer credit accounts. QuantumTrack empowers store owners to track customer balances, record transactions, send automated payment reminders via WhatsApp, and generate comprehensive reports.

## 🚀 Features

### Core Functionality
- **Customer Management**: Comprehensive customer database with credit tracking
- **Smart Apartment System**: Intelligent 5-digit apartment parsing (Tower/Floor/Unit)
- **Transaction Recording**: Seamless purchase and payment logging
- **WhatsApp Integration**: Automated payment reminders via Twilio
- **Real-time Dashboard**: Live overview of all customer accounts
- **Transaction History**: Complete audit trail for all customer interactions
- **Responsive Design**: Optimized for mobile and desktop usage

### Advanced Features
- **Multi-tenant Architecture**: Support for multiple store locations
- **CSV Export**: Export customer and transaction data
- **Advanced Reporting**: Detailed analytics and insights
- **Theme Support**: Light and dark mode compatibility
- **Offline Capability**: Progressive Web App features

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (Build Tool)
- Tailwind CSS + shadcn/ui Components
- TanStack React Query (State Management)
- React Router DOM (Navigation)
- Framer Motion (Animations)

**Backend & Services:**
- Supabase (Database, Authentication, Edge Functions)
- Twilio API (WhatsApp Messaging)
- PostgreSQL (Database)

**Development Tools:**
- ESLint (Code Quality)
- TypeScript (Type Safety)
- Bun (Package Manager)

## 🚀 Getting Started

### Prerequisites

Before running QuantumTrack, ensure you have:
- Node.js (v18 or higher)
- Bun package manager
- A Supabase account
- A Twilio account (for WhatsApp functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/QuantumClimb/quantumtrack.git
   cd quantumtrack
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Fill in your Twilio credentials and Supabase configuration.

4. **Database Setup**
   Set up your Supabase project with the required tables and RLS policies.

5. **Start Development Server**
   ```bash
   bun run dev
   ```

The application will be available at `http://localhost:8080`

## 📊 Supabase Configuration

### Database Schema

QuantumTrack requires the following Supabase setup:

#### Tables
1. **customers** - Customer information and credit balances
2. **transactions** - Purchase and payment records
3. **reminders** - WhatsApp reminder logs

#### Row Level Security (RLS)
Implement proper RLS policies for multi-tenant data isolation.

#### Edge Functions
Deploy the `/send-reminder` Edge Function for WhatsApp integration:

```javascript
// Edge Function handles:
- Customer name validation
- Amount due formatting
- Phone number verification
- Apartment number parsing
- Twilio API integration
```

## 🏢 Apartment Number System

QuantumTrack uses an intelligent 5-digit apartment numbering system:

- **Format**: `TTFFU`
- **T**: Tower Number (2 digits)
- **F**: Floor Number (2 digits)
- **U**: Unit Number (1 digit)

**Examples:**
- `36194` → Tower 36, Floor 19, Unit 4
- `42012` → Tower 42, Floor 01, Unit 2
- `15031` → Tower 15, Floor 03, Unit 1

This system enables:
- Easy customer identification
- Efficient filtering and sorting
- Automated location parsing
- Delivery route optimization

## 📱 Mobile-First Design

QuantumTrack is built with a mobile-first approach:
- **Touch-optimized interfaces**
- **Responsive layouts**
- **Gesture support**
- **Offline functionality**
- **Progressive Web App (PWA) features**

## 🔮 Roadmap & Future Enhancements

### Phase 2 Features
- **Home Delivery Tracking**: Package and delivery management
- **Water Delivery Status**: Specialized tracking for water services
- **Advanced Filtering**: Filter by Tower, Floor, Building zones
- **PDF Statements**: Automated customer statement generation
- **Multi-language Support**: Internationalization capabilities

### Phase 3 Features
- **Analytics Dashboard**: Advanced business intelligence
- **Mobile App**: Native iOS and Android applications
- **API Integration**: Third-party service connections
- **Automated Billing**: Recurring payment processing

## 🤝 Contributing

We welcome contributions to QuantumTrack! Please read our contributing guidelines and submit pull requests for any improvements.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, questions, or feature requests:
- Create an issue on GitHub
- Contact: support@quantumclimb.com
- Documentation: [QuantumTrack Docs](https://docs.quantumtrack.app)

## 🙏 Acknowledgments

Built with ❤️ by the QuantumClimb team for the building store management community.

---

**QuantumTrack** - *Elevating Credit Management to the Next Level*
