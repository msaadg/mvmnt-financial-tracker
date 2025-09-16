// Master data for referrals and collectors
export const referrals = [
  "Abdullah Khan",
  "Fatima Ahmed", 
  "Muhammad Ali",
  "Aisha Hassan",
  "Omar Malik"
];

export const collectors = [
  "Muhammad Hassan",
  "Ahmad Khan", 
  "Fatima Ali",
  "Hassan Ahmed",
  "Zainab Malik"
];

// TypeScript interfaces
interface Donation {
  id: string | number;
  donorName: string;
  amount: number;
  type: "Zakat" | "Sadqa";
  paymentMethod: "Online" | "Cash";
  collector: string;
  referral: string;
  date: string;
  status: "Complete" | "Completed" | "Pending";
  notes: string;
}

interface CollectorEntry {
  name: string;
  type: "Zakat" | "Sadqa";
  amount: number;
}

interface Expense {
  id: string | number;
  vendorName: string;
  amount: number;
  category: string;
  paymentMethod: "Online" | "Cash";
  date: string;
  status: "Paid" | "Pending" | "Overdue";
  description: string;
  invoiceNumber: string;
  collectors: CollectorEntry[];
}

export const sampleDonations = [
  {
    id: "DON-001",
    donorName: "Ahmed Ali Khan",
    amount: 25000,
    type: "Zakat",
    paymentMethod: "Cash",
    collector: "Muhammad Hassan",
    referral: "Abdullah Khan",
    date: "2024-01-15",
    status: "Complete",
    notes: "Monthly Zakat contribution"
  },
  {
    id: 2,
    donorName: "Fatima Hassan",
    amount: 15000,
    type: "Sadqa",
    paymentMethod: "Online",
    collector: "Ahmad Khan",
    referral: "Fatima Ahmed",
    date: "2024-01-13",
    status: "Completed",
    notes: "General donation"
  },
  {
    id: 3,
    donorName: "Muhammad Usman",
    amount: 50000,
    type: "Zakat",
    paymentMethod: "Online",
    collector: "Hassan Ahmed",
    referral: "Muhammad Ali",
    date: "2024-01-11",
    status: "Pending",
    notes: "Annual Zakat payment"
  },
  {
    id: 4,
    donorName: "Aisha Malik",
    amount: 8000,
    type: "Sadqa",
    paymentMethod: "Cash",
    collector: "Fatima Ali",
    referral: "Aisha Hassan",
    date: "2024-01-10",
    status: "Completed",
    notes: "Weekly contribution"
  },
  {
    id: 5,
    donorName: "Hassan Ahmed",
    amount: 30000,
    type: "Zakat",
    paymentMethod: "Online",
    collector: "Zainab Malik",
    referral: "Omar Malik",
    date: "2024-01-08",
    status: "Completed",
    notes: "Quarterly Zakat"
  },
  {
    id: 6,
    donorName: "Zainab Ali",
    amount: 12000,
    type: "Sadqa",
    paymentMethod: "Cash",
    collector: "Muhammad Hassan",
    referral: "Abdullah Khan",
    date: "2024-01-05",
    status: "Completed",
    notes: "Online donation via website"
  }
];

export const sampleExpenses = [
  {
    id: "EXP-001",
    vendorName: "Office Supplies Co.",
    amount: 8500,
    category: "Operations",
    paymentMethod: "Online",
    date: "2024-01-14",
    status: "Paid",
    description: "Monthly office supplies and stationery",
    invoiceNumber: "INV-2024-001",
    collectors: [
      { name: "Muhammad Hassan", type: "Zakat", amount: 5000 },
      { name: "Ahmad Khan", type: "Sadqa", amount: 3500 }
    ]
  },
  {
    id: 2,
    vendorName: "Utility Company",
    amount: 12000,
    category: "Utilities",
    paymentMethod: "Cash",
    date: "2024-01-12",
    status: "Paid",
    description: "Electricity and water bills",
    invoiceNumber: "UC-2024-001",
    collectors: [
      { name: "Hassan Ahmed", type: "Zakat", amount: 12000 }
    ]
  },
  {
    id: 3,
    vendorName: "Food Distribution Project",
    amount: 45000,
    category: "Programs",
    paymentMethod: "Cash",
    date: "2024-01-10",
    status: "Pending",
    description: "Food packages for needy families",
    invoiceNumber: "FDP-2024-001",
    collectors: [
      { name: "Fatima Ali", type: "Zakat", amount: 30000 },
      { name: "Zainab Malik", type: "Sadqa", amount: 15000 }
    ]
  },
  {
    id: 4,
    vendorName: "IT Services Ltd.",
    amount: 15000,
    category: "Technology",
    paymentMethod: "Online",
    date: "2024-01-08",
    status: "Paid",
    description: "Website maintenance and hosting",
    invoiceNumber: "IT-2024-001",
    collectors: [
      { name: "Muhammad Hassan", type: "Sadqa", amount: 15000 }
    ]
  },
  {
    id: 5,
    vendorName: "Marketing Agency",
    amount: 20000,
    category: "Marketing",
    paymentMethod: "Online",
    date: "2024-01-06",
    status: "Overdue",
    description: "Social media campaign",
    invoiceNumber: "MA-2024-001",
    collectors: [
      { name: "Ahmad Khan", type: "Zakat", amount: 12000 },
      { name: "Hassan Ahmed", type: "Sadqa", amount: 8000 }
    ]
  },
  {
    id: 6,
    vendorName: "Education Program",
    amount: 35000,
    category: "Programs",
    paymentMethod: "Cash",
    date: "2024-01-04",
    status: "Paid",
    description: "School supplies for students",
    invoiceNumber: "EP-2024-001",
    collectors: [
      { name: "Zainab Malik", type: "Zakat", amount: 35000 }
    ]
  }
];

// TypeScript interface for ledger entries
interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  type: "Donation" | "Expense";
  subType: string;
  paymentMethod: "Online" | "Cash";
  amount: number;
  isIncome: boolean;
  status: string;
  reference: string;
}

export const generateLedgerData = (): LedgerEntry[] => {
  const ledgerEntries: LedgerEntry[] = [];
  
  // Add donations to ledger
  (sampleDonations as Donation[]).forEach(donation => {
    ledgerEntries.push({
      id: `D-${donation.id}`,
      date: donation.date,
      description: `Donation from ${donation.donorName}`,
      type: "Donation",
      subType: donation.type,
      paymentMethod: donation.paymentMethod,
      amount: donation.amount,
      isIncome: true,
      status: donation.status,
      reference: donation.donorName
    });
  });

  // Add expenses to ledger
  (sampleExpenses as Expense[]).forEach(expense => {
    ledgerEntries.push({
      id: `E-${expense.id}`,
      date: expense.date,
      description: expense.description,
      type: "Expense",
      subType: expense.category,
      paymentMethod: expense.paymentMethod,
      amount: expense.amount,
      isIncome: false,
      status: expense.status,
      reference: expense.vendorName
    });
  });

  // Sort by date (newest first)
  return ledgerEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const monthlyData = [
  { month: "Aug 2023", donations: 180000, expenses: 150000 },
  { month: "Sep 2023", donations: 220000, expenses: 180000 },
  { month: "Oct 2023", donations: 195000, expenses: 165000 },
  { month: "Nov 2023", donations: 250000, expenses: 200000 },
  { month: "Dec 2023", donations: 320000, expenses: 280000 },
  { month: "Jan 2024", donations: 450000, expenses: 280000 },
];

export const donationBreakdown = [
  { name: "Zakat", value: 65, amount: 292500 },
  { name: "Sadqa", value: 35, amount: 157500 },
];