import { numberToWords } from "./utils";

interface DonationData {
  id: string;
  donorName: string;
  amount: number;
  type: string;
  paymentMethod: string;
  collector?: string;
  referral?: string;
  date: string;
  notes?: string;
}

export const generateDonationReceiptPDF = async (donation: DonationData) => {
  const amountInWords = numberToWords(donation.amount);
  const formattedDate = new Date(donation.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate LaTeX content
  const latexContent = `\\documentclass{article}
\\usepackage{graphicx}
\\usepackage{geometry}
\\usepackage{xcolor}

\\geometry{a4paper, margin=1in}

% Define custom colors
\\definecolor{lightgray}{RGB}{220,220,220}
\\definecolor{darkgray}{RGB}{105,105,105}

% Define command for rectangular box
\\newcommand{\\receiptbox}[1]{%
    \\fbox{\\begin{minipage}{0.9\\textwidth}
    \\vspace{5mm}
    \\begin{tabular}{ll}
    #1
    \\end{tabular}
    \\vspace{5mm}
    \\end{minipage}}%
}

\\begin{document}

\\begin{center}
\\includegraphics[width=8cm]{logo.png}
\\end{center}

\\vspace{1cm}

\\begin{center}
\\Huge\\textbf{DONATION RECEIPT}
\\end{center}

\\vspace{0.5cm}

\\begin{flushright}
\\textbf{Date:} ${formattedDate}
\\end{flushright}

\\vspace{0.5cm}

\\receiptbox{
\\textbf{RECEIPT NUMBER:} & ${donation.id} \\\\[0.3cm]
\\textbf{DONATION BY:} & ${donation.donorName} \\\\[0.3cm]
\\textbf{NATURE OF DONATION:} & ${donation.type} \\\\[0.3cm]
\\textbf{PURPOSE:} & General Fund \\\\[0.3cm]
\\textbf{RECEIVED BY:} & ${donation.collector || 'MVMNT Team'} \\\\[0.3cm]
\\textbf{AMOUNT PAID:} & PKR ${donation.amount.toLocaleString()} \\\\[0.3cm]
\\textbf{IN WORDS:} & \\parbox[t]{0.5\\textwidth}{${amountInWords} rupees only} \\\\[0.3cm]
\\textbf{PAYMENT METHOD:} & ${donation.paymentMethod} \\\\[0.3cm]
\\textbf{REFERRAL:} & ${donation.referral || 'N/A'} \\\\[0.3cm]
\\textbf{NOTE:} & \\parbox[t]{0.5\\textwidth}{${donation.notes || 'Thank you for your generous donation.'}} \\\\
}

\\begin{center}
\\includegraphics[width=7cm]{sign.png}
\\hspace{2cm}
\\includegraphics[width=5cm]{stamp.png}
\\end{center}

\\begin{center}
\\textit{Thank you for your generous contribution to MVMNT.}
\\end{center}

\\end{document}`;

  // Use browser-side PDF generation instead of server
  // This will be handled by the API route
  try {
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latex: latexContent,
        filename: `donation-receipt-${donation.id}.pdf`
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate PDF');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `donation-receipt-${donation.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

interface ExpenseData {
  id: string;
  vendorName: string;
  amount: number;
  category: string;
  paymentMethod: string;
  date: string;
  description: string;
  collectors?: Array<{
    name: string;
    type: string;
    amount: number;
  }>;
}

export const generateExpenseReceiptPDF = async (expense: ExpenseData) => {
  const amountInWords = numberToWords(expense.amount);
  const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate collectors section
  const collectorsSection = expense.collectors && expense.collectors.length > 0
    ? expense.collectors.map(c => 
        `\\textbf{${c.name}} & (${c.type}: PKR ${c.amount.toLocaleString()}) \\\\[0.2cm]`
      ).join('\n')
    : '\\textbf{N/A} & \\\\[0.2cm]';

  // Generate LaTeX content
  const latexContent = `\\documentclass{article}
\\usepackage{graphicx}
\\usepackage{geometry}
\\usepackage{xcolor}

\\geometry{a4paper, margin=1in}

% Define custom colors
\\definecolor{lightgray}{RGB}{220,220,220}
\\definecolor{darkgray}{RGB}{105,105,105}

% Define command for rectangular box
\\newcommand{\\receiptbox}[1]{%
    \\fbox{\\begin{minipage}{0.9\\textwidth}
    \\vspace{5mm}
    \\begin{tabular}{ll}
    #1
    \\end{tabular}
    \\vspace{5mm}
    \\end{minipage}}%
}

\\begin{document}

\\begin{center}
\\includegraphics[width=8cm]{logo.png}
\\end{center}

\\vspace{1cm}

\\begin{center}
\\Huge\\textbf{EXPENSE RECEIPT}
\\end{center}

\\vspace{0.5cm}

\\begin{flushright}
\\textbf{Date:} ${formattedDate}
\\end{flushright}

\\vspace{0.5cm}

\\receiptbox{
\\textbf{RECEIPT NUMBER:} & ${expense.id} \\\\[0.3cm]
\\textbf{VENDOR/PROJECT:} & ${expense.vendorName} \\\\[0.3cm]
\\textbf{CATEGORY:} & ${expense.category} \\\\[0.3cm]
\\textbf{DESCRIPTION:} & \\parbox[t]{0.5\\textwidth}{${expense.description}} \\\\[0.3cm]
\\textbf{AMOUNT PAID:} & PKR ${expense.amount.toLocaleString()} \\\\[0.3cm]
\\textbf{IN WORDS:} & \\parbox[t]{0.5\\textwidth}{${amountInWords} rupees only} \\\\[0.3cm]
\\textbf{PAYMENT METHOD:} & ${expense.paymentMethod} \\\\[0.3cm]
\\textbf{COLLECTORS:} & \\\\[0.2cm]
${collectorsSection}
}

\\vspace{1cm}

\\begin{center}
\\includegraphics[width=7cm]{sign.png}
\\hspace{2cm}
\\includegraphics[width=5cm]{stamp.png}
\\end{center}

\\begin{center}
\\textit{Thank you for your services to MVMNT.}
\\end{center}

\\end{document}`;

  // Call API to generate PDF
  try {
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latex: latexContent,
        filename: `expense-receipt-${expense.id}.pdf`
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate PDF');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expense-receipt-${expense.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const exportExpensesToCSV = (expenses: ExpenseData[], filename: string = 'expenses.csv') => {
  // Define CSV headers
  const headers = [
    'Receipt Number',
    'Vendor/Project',
    'Amount (PKR)',
    'Category',
    'Payment Method',
    'Date',
    'Description',
    'Collectors'
  ];

  // Convert expenses to CSV rows
  const csvRows = expenses.map(expense => [
    expense.id,
    expense.vendorName,
    expense.amount,
    expense.category,
    expense.paymentMethod,
    new Date(expense.date).toLocaleDateString(),
    expense.description || '',
    expense.collectors?.map(c => `${c.name} (${c.type}: ${c.amount})`).join('; ') || ''
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...csvRows.map(row => 
      row.map(cell => {
        // Escape fields that contain commas or quotes
        const cellStr = String(cell);
        if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
          return `"${cellStr.replace(/"/g, '""')}"`;
        }
        return cellStr;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportDonationsToCSV = (donations: DonationData[], filename: string = 'donations.csv') => {
  // Define CSV headers
  const headers = [
    'Receipt Number',
    'Donor Name',
    'Amount (PKR)',
    'Type',
    'Payment Method',
    'Collector',
    'Referral',
    'Date',
    'Notes'
  ];

  // Convert donations to CSV rows
  const csvRows = donations.map(donation => [
    donation.id,
    donation.donorName,
    donation.amount,
    donation.type,
    donation.paymentMethod,
    donation.collector || '',
    donation.referral || '',
    new Date(donation.date).toLocaleDateString(),
    donation.notes || ''
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...csvRows.map(row => 
      row.map(cell => {
        // Escape fields that contain commas or quotes
        const cellStr = String(cell);
        if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
          return `"${cellStr.replace(/"/g, '""')}"`;
        }
        return cellStr;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  type: string;
  subType: string;
  paymentMethod: string;
  amount: number;
  isIncome: boolean;
  status: string;
  reference: string;
}

interface AnalyticsData {
  totalDonations: number;
  totalExpenses: number;
  netFlow: number;
  ledgerData: LedgerEntry[];
  monthlyData?: Array<{
    month: string;
    donations: number;
    expenses: number;
  }>;
  donationBreakdown?: Array<{
    name: string;
    value: number;
  }>;
}

export const generateAnalyticsReportPDF = async (data: AnalyticsData, dateRangeLabel: string = 'All Time') => {
  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate monthly trends table
  const monthlyTrendsRows = data.monthlyData && data.monthlyData.length > 0
    ? data.monthlyData.map(m => 
        `${m.month} & PKR ${m.donations.toLocaleString()} & PKR ${m.expenses.toLocaleString()} & PKR ${(m.donations - m.expenses).toLocaleString()} \\\\`
      ).join('\n')
    : 'No data available & - & - & - \\\\';

  // Generate donation breakdown table
  const donationBreakdownRows = data.donationBreakdown && data.donationBreakdown.length > 0
    ? data.donationBreakdown.map(d => 
        `${d.name} & PKR ${d.value.toLocaleString()} \\\\`
      ).join('\n')
    : 'No data available & - \\\\';

  // Generate ledger entries (limit to first 30 entries to keep PDF manageable)
  const ledgerRows = data.ledgerData.slice(0, 30).map(entry => {
    const formattedDate = new Date(entry.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
    const amount = entry.isIncome ? `+${entry.amount.toLocaleString()}` : `-${entry.amount.toLocaleString()}`;
    return `${formattedDate} & ${entry.description.substring(0, 30)} & ${entry.type} & ${entry.status} & ${amount} \\\\`;
  }).join('\n');

  const ledgerNote = data.ledgerData.length > 30 
    ? `\\textit{Note: Showing first 30 of ${data.ledgerData.length} total transactions}`
    : '';

  // Generate LaTeX content
  const latexContent = `\\documentclass{article}
\\usepackage{graphicx}
\\usepackage{geometry}
\\usepackage{xcolor}
\\usepackage{longtable}
\\usepackage{booktabs}

\\geometry{a4paper, margin=0.75in}

% Define custom colors
\\definecolor{lightgray}{RGB}{220,220,220}
\\definecolor{darkgray}{RGB}{105,105,105}
\\definecolor{incomegreen}{RGB}{34,139,34}
\\definecolor{expensered}{RGB}{220,20,60}

\\begin{document}

\\begin{center}
\\includegraphics[width=8cm]{logo.png}
\\end{center}

\\vspace{0.5cm}

\\begin{center}
\\Huge\\textbf{ANALYTICS REPORT}
\\end{center}

\\vspace{0.3cm}

\\begin{center}
\\large\\textbf{Period: ${dateRangeLabel}}
\\end{center}

\\begin{flushright}
\\textbf{Generated:} ${reportDate}
\\end{flushright}

\\vspace{0.5cm}

% Summary Section
\\section*{Financial Summary}

\\begin{center}
\\begin{tabular}{|l|r|}
\\hline
\\textbf{Metric} & \\textbf{Amount (PKR)} \\\\
\\hline
Total Donations & \\textcolor{incomegreen}{${data.totalDonations.toLocaleString()}} \\\\
\\hline
Total Expenses & \\textcolor{expensered}{${data.totalExpenses.toLocaleString()}} \\\\
\\hline
Net Cash Flow & \\textbf{${data.netFlow.toLocaleString()}} \\\\
\\hline
\\end{tabular}
\\end{center}

\\vspace{0.5cm}

% Monthly Trends Section
\\section*{Monthly Trends (Last 6 Months)}

\\begin{center}
\\begin{tabular}{|l|r|r|r|}
\\hline
\\textbf{Month} & \\textbf{Donations} & \\textbf{Expenses} & \\textbf{Net Flow} \\\\
\\hline
${monthlyTrendsRows}
\\hline
\\end{tabular}
\\end{center}

\\vspace{0.5cm}

% Donation Breakdown Section
\\section*{Donation Breakdown by Type}

\\begin{center}
\\begin{tabular}{|l|r|}
\\hline
\\textbf{Type} & \\textbf{Amount (PKR)} \\\\
\\hline
${donationBreakdownRows}
\\hline
\\end{tabular}
\\end{center}

\\vspace{0.5cm}

% Ledger Section
\\section*{Transaction Ledger}

${ledgerNote}

\\vspace{0.3cm}

\\begin{center}
\\begin{longtable}{|l|p{5cm}|l|l|r|}
\\hline
\\textbf{Date} & \\textbf{Description} & \\textbf{Type} & \\textbf{Status} & \\textbf{Amount (PKR)} \\\\
\\hline
\\endfirsthead

\\hline
\\textbf{Date} & \\textbf{Description} & \\textbf{Type} & \\textbf{Status} & \\textbf{Amount (PKR)} \\\\
\\hline
\\endhead

${ledgerRows}
\\hline
\\end{longtable}
\\end{center}

\\vspace{1cm}

\\begin{center}
\\includegraphics[width=7cm]{sign.png}
\\hspace{2cm}
\\includegraphics[width=5cm]{stamp.png}
\\end{center}

\\begin{center}
\\textit{This is an automatically generated report from MVMNT Financial Tracker.}
\\end{center}

\\end{document}`;

  // Call API to generate PDF
  try {
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latex: latexContent,
        filename: `analytics-report-${Date.now()}.pdf`
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate PDF');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-report-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
