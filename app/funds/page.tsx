"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Input } from "@/app/components/ui/input";
import { sampleDonations, sampleExpenses, collectors } from "@/app/data/sampleData";
import { Wallet, PiggyBank, Smartphone, Banknote, Users, Search, BarChart3 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useState } from "react";

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
  status: "Paid" | "Pending";
  description: string;
  invoiceNumber: string;
  collectors?: CollectorEntry[];
}

interface CollectorData {
  name: string;
  totalBalance: number;
  zakat: number;
  sadqa: number;
  online: number;
  cash: number;
}

interface ChartData {
  name: string;
  value: number;
  fill: string;
  [key: string]: string | number; // Index signature for Recharts compatibility
}

interface CollectorChartData {
  name: string;
  Zakat: number;
  Sadqa: number;
  Online: number;
  Cash: number;
}

const FundsManagement = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Chart colors
  const COLORS = [
    "hsl(var(--primary))", 
    "hsl(var(--success))", 
    "hsl(var(--warning))", 
    "hsl(var(--destructive))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))"
  ];

  // Calculate total funds
  const totalDonations = (sampleDonations as Donation[])
    .filter((d: Donation) => d.status === "Completed" || d.status === "Complete")
    .reduce((sum: number, d: Donation) => sum + d.amount, 0);
  
  const totalExpenses = (sampleExpenses as Expense[])
    .filter((e: Expense) => e.status === "Paid")
    .reduce((sum: number, e: Expense) => sum + e.amount, 0);
  
  const currentBalance = totalDonations - totalExpenses;

  // Calculate fund distribution by type - these should equal current balance
  const zakatBalance = (sampleDonations as Donation[])
    .filter((d: Donation) => d.type === "Zakat" && (d.status === "Completed" || d.status === "Complete"))
    .reduce((sum: number, d: Donation) => sum + d.amount, 0) - 
    (sampleExpenses as Expense[])
    .filter((e: Expense) => e.status === "Paid")
    .reduce((sum: number, e: Expense) => {
      return sum + (e.collectors?.reduce((collSum: number, coll: CollectorEntry) => 
        collSum + (coll.type === "Zakat" ? coll.amount : 0), 0) || 0);
    }, 0);
  
  const sadqaBalance = (sampleDonations as Donation[])
    .filter((d: Donation) => d.type === "Sadqa" && (d.status === "Completed" || d.status === "Complete"))
    .reduce((sum: number, d: Donation) => sum + d.amount, 0) - 
    (sampleExpenses as Expense[])
    .filter((e: Expense) => e.status === "Paid")
    .reduce((sum: number, e: Expense) => {
      return sum + (e.collectors?.reduce((collSum: number, coll: CollectorEntry) => 
        collSum + (coll.type === "Sadqa" ? coll.amount : 0), 0) || 0);
    }, 0);

  // Calculate fund distribution by payment method - these should equal current balance
  const onlineBalance = (sampleDonations as Donation[])
    .filter((d: Donation) => d.paymentMethod === "Online" && (d.status === "Completed" || d.status === "Complete"))
    .reduce((sum: number, d: Donation) => sum + d.amount, 0) - 
    (sampleExpenses as Expense[])
    .filter((e: Expense) => e.status === "Paid" && e.paymentMethod === "Online")
    .reduce((sum: number, e: Expense) => sum + e.amount, 0);
  
  const cashBalance = (sampleDonations as Donation[])
    .filter((d: Donation) => d.paymentMethod === "Cash" && (d.status === "Completed" || d.status === "Complete"))
    .reduce((sum: number, d: Donation) => sum + d.amount, 0) - 
    (sampleExpenses as Expense[])
    .filter((e: Expense) => e.status === "Paid" && e.paymentMethod === "Cash")
    .reduce((sum: number, e: Expense) => sum + e.amount, 0);

  // Calculate collector distributions
  const collectorData: CollectorData[] = (collectors as string[]).map((collector: string) => {
    const collectorDonations = (sampleDonations as Donation[]).filter((d: Donation) => 
      d.collector === collector && (d.status === "Completed" || d.status === "Complete")
    );
    
    const collectorExpenses = (sampleExpenses as Expense[]).filter((e: Expense) => 
      e.status === "Paid" && e.collectors?.some((c: CollectorEntry) => c.name === collector)
    );

    const totalReceived = collectorDonations.reduce((sum: number, d: Donation) => sum + d.amount, 0);
    
    const totalPaid = collectorExpenses.reduce((sum: number, e: Expense) => {
      const collectorEntry = e.collectors?.find((c: CollectorEntry) => c.name === collector);
      return sum + (collectorEntry?.amount || 0);
    }, 0);

    const totalBalance = totalReceived - totalPaid;

    // Calculate current balance by type (Zakat vs Sadqa)
    const zakatBalance = collectorDonations
      .filter((d: Donation) => d.type === "Zakat")
      .reduce((sum: number, d: Donation) => sum + d.amount, 0) - 
      collectorExpenses.reduce((sum: number, e: Expense) => {
        const collectorEntry = e.collectors?.find((c: CollectorEntry) => c.name === collector && c.type === "Zakat");
        return sum + (collectorEntry?.amount || 0);
      }, 0);

    const sadqaBalance = collectorDonations
      .filter((d: Donation) => d.type === "Sadqa")
      .reduce((sum: number, d: Donation) => sum + d.amount, 0) - 
      collectorExpenses.reduce((sum: number, e: Expense) => {
        const collectorEntry = e.collectors?.find((c: CollectorEntry) => c.name === collector && c.type === "Sadqa");
        return sum + (collectorEntry?.amount || 0);
      }, 0);

    // Calculate current balance by method (Online vs Cash)
    const onlineBalance = collectorDonations
      .filter((d: Donation) => d.paymentMethod === "Online")
      .reduce((sum: number, d: Donation) => sum + d.amount, 0) - 
      collectorExpenses
      .filter((e: Expense) => e.paymentMethod === "Online")
      .reduce((sum: number, e: Expense) => {
        const collectorEntry = e.collectors?.find((c: CollectorEntry) => c.name === collector);
        return sum + (collectorEntry?.amount || 0);
      }, 0);

    const cashBalance = collectorDonations
      .filter((d: Donation) => d.paymentMethod === "Cash")
      .reduce((sum: number, d: Donation) => sum + d.amount, 0) - 
      collectorExpenses
      .filter((e: Expense) => e.paymentMethod === "Cash")
      .reduce((sum: number, e: Expense) => {
        const collectorEntry = e.collectors?.find((c: CollectorEntry) => c.name === collector);
        return sum + (collectorEntry?.amount || 0);
      }, 0);

    return {
      name: collector,
      totalBalance,
      zakat: Math.max(0, zakatBalance),
      sadqa: Math.max(0, sadqaBalance),
      online: Math.max(0, onlineBalance),
      cash: Math.max(0, cashBalance)
    };
  });

  // Filter collectors based on search term
  const filteredCollectorData = collectorData.filter((collector: CollectorData) =>
    collector.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Chart data
  const fundTypeData: ChartData[] = [
    { name: "Zakat", value: Math.max(0, zakatBalance), fill: COLORS[0] },
    { name: "Sadqa", value: Math.max(0, sadqaBalance), fill: COLORS[1] }
  ];

  const fundMethodData: ChartData[] = [
    { name: "Online", value: Math.max(0, onlineBalance), fill: COLORS[2] },
    { name: "Cash", value: Math.max(0, cashBalance), fill: COLORS[3] }
  ];

  const collectorChartData: CollectorChartData[] = filteredCollectorData.map((collector: CollectorData) => ({
    name: collector.name,
    Zakat: collector.zakat,
    Sadqa: collector.sadqa,
    Online: collector.online,
    Cash: collector.cash
  }));

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Funds Management</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Overview of fund distribution and collector balances
        </p>
      </div>

      {/* Total Funds Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatAmount(currentBalance)}</div>
            <p className="text-xs text-muted-foreground">
              Total donations minus expenses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{formatAmount(totalDonations)}</div>
            <p className="text-xs text-muted-foreground">
              All completed donations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{formatAmount(totalExpenses)}</div>
            <p className="text-xs text-muted-foreground">
              All paid expenses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Fund Distribution by Type and Method */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5" />
              Funds by Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Zakat</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Zakat</Badge>
                <span className="font-semibold">{formatAmount(Math.max(0, zakatBalance))}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Sadqa</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Sadqa</Badge>
                <span className="font-semibold">{formatAmount(Math.max(0, sadqaBalance))}</span>
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Total:</span>
                <span className="font-bold">{formatAmount(Math.max(0, zakatBalance) + Math.max(0, sadqaBalance))}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Funds by Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Online</span>
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-primary" />
                <span className="font-semibold">{formatAmount(Math.max(0, onlineBalance))}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Cash</span>
              <div className="flex items-center gap-2">
                <Banknote className="h-4 w-4 text-success" />
                <span className="font-semibold">{formatAmount(Math.max(0, cashBalance))}</span>
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Total:</span>
                <span className="font-bold">{formatAmount(Math.max(0, onlineBalance) + Math.max(0, cashBalance))}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fund Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Fund Distribution by Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={fundTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => window.innerWidth > 640 ? `${name}: ${formatAmount(value as number)}` : name}
                  outerRadius={window.innerWidth > 640 ? 80 : 60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fundTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatAmount(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Fund Distribution by Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={fundMethodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => window.innerWidth > 640 ? `${name}: ${formatAmount(value as number)}` : name}
                  outerRadius={window.innerWidth > 640 ? 80 : 60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fundMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatAmount(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Collector Distribution Chart */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
            Collector Fund Distribution Chart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <ResponsiveContainer width="100%" height={300} minWidth={400}>
              <BarChart data={collectorChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  fontSize={12}
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tickFormatter={(value) => `₨${(value / 1000).toFixed(0)}K`}
                  fontSize={12}
                />
                <Tooltip formatter={(value) => formatAmount(value as number)} />
                <Legend />
                <Bar dataKey="Zakat" fill={COLORS[0]} />
                <Bar dataKey="Sadqa" fill={COLORS[1]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Collector Distribution Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            Collector Fund Distribution
          </CardTitle>
          <div className="flex items-center space-x-2 mt-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search collectors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Collector</TableHead>
                <TableHead>Total Balance</TableHead>
                <TableHead>Zakat</TableHead>
                <TableHead>Sadqa</TableHead>
                <TableHead>Online</TableHead>
                <TableHead>Cash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCollectorData.map((collector: CollectorData) => (
                <TableRow key={collector.name}>
                  <TableCell className="font-medium">{collector.name}</TableCell>
                  <TableCell>
                    <span className={`font-semibold ${collector.totalBalance >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {formatAmount(collector.totalBalance)}
                    </span>
                  </TableCell>
                  <TableCell>{formatAmount(collector.zakat)}</TableCell>
                  <TableCell>{formatAmount(collector.sadqa)}</TableCell>
                  <TableCell>{formatAmount(collector.online)}</TableCell>
                  <TableCell>{formatAmount(collector.cash)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredCollectorData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No collectors found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FundsManagement;