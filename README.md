# YourLocal: AI-Powered Fair Price Discovery for Groceries

A community-driven platform to combat overpricing and bring transparency to local grocery markets in Assam, India.

Ever moved to a new city and felt you were being overcharged for daily groceries? You're not alone. Price opacity exploits both consumers and honest local vendors. YourLocal is a prototype designed to solve this problem by leveraging community data and a powerful AI vision.

---

## 🎯 The Grand Vision: AI-Powered Price Intelligence

Our ultimate goal is to create an intelligent price advisor, not just a static price list. The full YourLocal application is envisioned to work like this:

- **User Input**: A user selects their location (e.g., Guwahati) and a list of grocery items (e.g., tomatoes, potatoes).
- **AI Processing**: This request is sent to our backend, which queries a proprietary Machine Learning model trained on hyper-local, historical pricing data.
- **Intelligent Output**: The model doesn't just return a single price. It calculates and returns a fair market price range (e.g., Tomatoes: ₹20-₹30/kg) for each item.

This AI-driven approach transforms the app from a simple directory into a powerful decision-support tool that:

- **Detects Overpricing**: Instantly flags if a shop's price falls outside the fair range.
- **Forecasts Trends**: Helps consumers and farmers plan by predicting price movements.
- **Adapts Locally**: Understands that the fair price for tomatoes in Guwahati is different from Dibrugarh.
- **Builds Trust**: Empowers consumers to shop confidently and supports honest local vendors.

---

## 🚀 Our Hackathon Prototype: Demonstrating the Core Loop

This prototype was built in 2 days to demonstrate the core user experience and functionality that will power our AI vision. While it does not include a live ML model, it effectively simulates the entire workflow from data contribution to price discovery, proving the concept's viability and value.

### Live Demonstration Features

**For End Users (/)**  
- Browse Verified Listings: View community-verified grocery prices.  
- Smart Search: Find items by name (rice, vegetables, tea) or location (Guwahati, Jorhat).  
- Community Voting: Upvote/downvote pricing accuracy.  
- Price Comparison: Compare prices across different areas.  

**For Contributors (/upload)**  
- Easy Item Upload: Add grocery items with prices and location.  
- Bulk Entry: Upload multiple items from the same location.  
- Local Storage: Data persists across sessions for demo purposes.  

**For Administrators (/admin)**  
- Content Moderation: Verify or reject community submissions.  
- Data Management: Delete inappropriate or outdated listings.  
- Quality Control: Ensure accuracy and relevance of displayed items.  

---

## 🎨 User Experience Highlights

### Intuitive Navigation
- Clear role-based entry points (User vs Admin).  
- Consistent header navigation with context-aware buttons.  
- Breadcrumb-style back navigation for easy returns.  

### Smart Search Features
- Flexible Matching: Handles singular/plural variations ("tomato" finds "tomatoes").  
- Partial Matching: Location search works with partial district names.  
- Real-time Filtering: Instant results as you type.  
- Reset Functionality: Quick return to full listings with one click.  

### Community Engagement
- Voting System: A democratic approach to price validation.  
- Visual Feedback: A score display shows the community consensus on a price's accuracy.  
- Verification Status: Clear visual indication of admin-approved items for added trust.  

---

## 🛠️ Technology Stack

This prototype is built with a modern, fast, and scalable frontend stack.

- **Frontend**: React 18 with modern hooks  
- **UI Framework**: shadcn/ui components with Radix UI primitives  
- **Styling**: Tailwind CSS for responsive, mobile-first design  
- **Build Tool**: Vite for a fast development experience and optimized builds  
- **Routing**: React Router for seamless single-page application navigation  
- **State Management**: React useState/useEffect with localStorage for data persistence  
- **Icons**: Lucide React for a consistent and clean iconography  

---

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v16 or higher)  
- npm or yarn package manager

### Quick Start

```bash
# 1. Clone the repository
git clone <your-repository-url>
cd yourlocal-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

---

### 📋 Demo Flow Recommendations

### 1. User Journey (5 minutes)
- Start at the homepage (`/`).
- Navigate to **View** to see all grocery listings.
- Demonstrate searching by item (**rice**) and then by location (**Guwahati**).
- Show the upvote/downvote functionality on a few items.
- Reset the filters to show all items again.

### 2. Contributor Journey (3 minutes)
- Go to the **Upload** page (`/upload`).
- Add a new, single grocery item with price and location.
- Demonstrate the multi-item entry capability.
- Submit and navigate back to view the newly added item in the main list.

### 3. Admin Journey (5 minutes)
- Access the **Admin Panel** (`/admin`).
- Show the verification controls (checking/unchecking items).
- Demonstrate the item deletion capability.
- Filter and search through the admin view to moderate specific submissions.

---

## 🎯 Business Value Demonstration

### For Communities
- **Price Transparency**: Prevent overcharging through community-led verification.  
- **Market Discovery**: Find the best deals across local vendors and save money.  
- **Support Local Economy**: Increase visibility for small, honest businesses.  

### For Administrators
- **Quality Control**: Maintain a high standard of accurate and relevant listings.  
- **Community Moderation**: Ensure appropriate and helpful content.  
- **Data Insights**: Understand local market trends across districts.  

### For Vendors
- **Free Listing Platform**: Gain visibility in the local market at zero cost.  
- **Community Trust**: Verified listings build customer confidence and drive sales.  
- **Competitive Intelligence**: Understand market pricing to stay competitive.  

---

## 👥 Meet the Team

This project was brought to life during a **2-day hackathon** by:

| Name              | GitHub Profile   | LinkedIn Profile   |
|-------------------|-----------------|-------------------|
| [Roktim Taye]   | Link to GitHub  | Link to LinkedIn  |
| [Manav Agarwalla]   | Link to GitHub  | Link to LinkedIn  |
| [Bishnu Kamal Dutta]   | Link to GitHub  | Link to LinkedIn  |
| [Sanjib Biswas]   | Link to GitHub  | Link to LinkedIn  |
| [Jyotirmoy Rajbongshi]   | Link to GitHub  | Link to LinkedIn  |

---

## 🔮 Future Enhancements (Not in Prototype)
- Real-time database integration (e.g., Firebase, Supabase).  
- User authentication and profiles.  
- Vendor verification and dedicated dashboards.  
- Native mobile app development for Android & iOS.  
- Advanced analytics and price trend visualizations.  
- Multi-language support (Assamese, Bengali).  
- SMS/WhatsApp notifications for price alerts.  

---

## 📞 Prototype Limitations
- **Data Storage**: Uses localStorage, meaning data is browser-specific and clears on reset.  
- **User Management**: Lacks a formal authentication system.  
- **Real-time Updates**: No live synchronization of data between different users.  
- **Image Support**: Does not currently support product image uploads.  
- **Payment Integration**: No transaction or payment capabilities are included.  

