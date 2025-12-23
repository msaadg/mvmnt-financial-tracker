"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Search, Download, Filter, Calendar, TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { generateAnalyticsReportPDF } from "@/app/lib/pdfGenerator";
import { useToast } from "@/app/hooks/use-toast";
import axios from "axios";

const Analytics = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [subtypeFilter, setSubtypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // API integration
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/analytics');
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">Failed to load analytics data</p>
          <Button onClick={fetchAnalytics} className="mt-4">Retry</Button>
        </div>
      </div>
    );
  }

  const ledgerData = analyticsData.ledgerData;
  // derive everything from filtered ledger (so charts and summary reflect filters)

  const filteredLedger = ledgerData.filter((entry: any) => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || entry.type.toLowerCase() === typeFilter;
    const matchesSubtype = subtypeFilter === "all" || entry.subType.toLowerCase() === subtypeFilter;
    const matchesStatus = statusFilter === "all" || entry.status.toLowerCase() === statusFilter;
    const matchesPayment = paymentFilter === "all" || entry.paymentMethod.toLowerCase() === paymentFilter;
    
    // Date range filter logic
    let matchesDateRange = true;
    if (dateRange !== "all") {
      const itemDate = new Date(entry.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      switch (dateRange) {
        case "today":
          matchesDateRange = itemDate.toDateString() === today.toDateString();
          break;
        case "week":
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          matchesDateRange = itemDate >= weekAgo && itemDate <= today;
          break;
        case "month":
          const monthAgo = new Date(today);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          matchesDateRange = itemDate >= monthAgo && itemDate <= today;
          break;
        case "quarter":
          const quarterAgo = new Date(today);
          quarterAgo.setMonth(quarterAgo.getMonth() - 3);
          matchesDateRange = itemDate >= quarterAgo && itemDate <= today;
          break;
      }
    }
    
    return matchesSearch && matchesType && matchesSubtype && matchesStatus && matchesPayment && matchesDateRange;
  });

  // compute totals from filtered ledger
  const totalDonations = filteredLedger.reduce((sum: number, e: any) => e.isIncome ? sum + Number(e.amount || 0) : sum, 0);
  const totalExpenses = filteredLedger.reduce((sum: number, e: any) => !e.isIncome ? sum + Number(e.amount || 0) : sum, 0);
  const netFlow = totalDonations - totalExpenses;

  // build monthly data for the last 6 months (including current month)
  const now = new Date();
  const months: { key: string; label: string; year: number; month: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const dt = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ key: `${dt.getFullYear()}-${dt.getMonth()}`, label: dt.toLocaleString(undefined, { month: "short" }), year: dt.getFullYear(), month: dt.getMonth() });
  }
  const monthlyMap = new Map<string, { month: string; donations: number; expenses: number }>();
  months.forEach(m => monthlyMap.set(m.key, { month: m.label, donations: 0, expenses: 0 }));
  filteredLedger.forEach((e: any) => {
    const d = new Date(e.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (!monthlyMap.has(key)) return;
    const item = monthlyMap.get(key)!;
    if (e.isIncome) item.donations += Number(e.amount || 0);
    else item.expenses += Number(e.amount || 0);
  });
  const monthlyData = Array.from(monthlyMap.values());

  // donation breakdown (by subType or type) for income entries — value is percentage, amount preserved for tooltip
  const donationGroups = new Map<string, number>();
  filteredLedger.forEach((e: any) => {
    if (!e.isIncome) return;
    const name = e.subType || e.type || "Donation";
    donationGroups.set(name, (donationGroups.get(name) || 0) + Number(e.amount || 0));
  });
  const donationBreakdown = Array.from(donationGroups.entries()).map(([name, amount]) => ({
    name,
    value: totalDonations > 0 ? Math.round((amount / totalDonations) * 100) : 0,
    amount,
  }));

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "paid":
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case "pending":
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-destructive text-destructive-foreground">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getDateRangeLabel = () => {
    switch (dateRange) {
      case "today": return "Today";
      case "week": return "Last 7 Days";
      case "month": return "Last Month";
      case "quarter": return "Last Quarter";
      default: return "All Time";
    }
  };

  const handleExportReport = async () => {
    setIsGeneratingPDF(true);
    try {
      await generateAnalyticsReportPDF({
        totalDonations,
        totalExpenses,
        netFlow,
        ledgerData: filteredLedger,
        monthlyData,
        donationBreakdown,
      }, getDateRangeLabel());
      
      toast({
        title: "Success",
        description: "Analytics report exported successfully",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate analytics report",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const COLORS = ["hsl(var(--primary))", "hsl(var(--success))"];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Analytics & Ledger</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Comprehensive financial analytics and detailed transaction records
          </p>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 w-full sm:w-auto"
          onClick={handleExportReport}
          disabled={isGeneratingPDF}
        >
          {isGeneratingPDF ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">
            {isGeneratingPDF ? "Generating..." : "Export Report"}
          </span>
          <span className="sm:hidden">
            {isGeneratingPDF ? "..." : "Export"}
          </span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Donations
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{formatAmount(totalDonations)}</div>
            <p className="text-xs text-muted-foreground">
              Based on filtered data
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{formatAmount(totalExpenses)}</div>
            <p className="text-xs text-muted-foreground">
              Based on filtered data
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Flow
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netFlow >= 0 ? "text-success" : "text-destructive"}`}>
              {formatAmount(netFlow)}
            </div>
            <p className="text-xs text-muted-foreground">
              Donations minus expenses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Financial Trends (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="month" 
                  className="text-muted-foreground"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-muted-foreground"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}K`}
                />
                <Tooltip 
                  formatter={(value: number) => [formatAmount(value), ""]}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="donations" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="Donations"
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  name="Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Donation Type Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={donationBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => window.innerWidth > 640 ? `${name}: ${value}%` : name}
                  outerRadius={window.innerWidth > 640 ? 80 : 60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {donationBreakdown.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string, props: { payload?: { amount: number } }) => [
                    `${value}% (${formatAmount(props.payload?.amount || 0)})`,
                    name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-4 sm:mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
            Advanced Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="donation">Donations</SelectItem>
                <SelectItem value="expense">Expenses</SelectItem>
              </SelectContent>
            </Select>
            <Select value={subtypeFilter} onValueChange={setSubtypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Sub-Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sub-Types</SelectItem>
                <SelectItem value="sadqa">Sadqa</SelectItem>
                <SelectItem value="zakat">Zakat</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="programs">Programs</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                {/* <SelectItem value="overdue">Overdue</SelectItem> */}
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="online">Online</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setTypeFilter("all");
                setStatusFilter("all");
                setPaymentFilter("all");
                setDateRange("all");
              }}
              className="w-full sm:w-auto"
            >
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Ledger Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
            Complete Transaction Ledger
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-[800px] px-4 sm:px-0">
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Sub-Type</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLedger.map((entry: any) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium text-sm">
                      {new Date(entry.date).toLocaleDateString('en-GB')}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground text-sm">{entry.description}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[150px]">{entry.reference}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={entry.isIncome ? "default" : "secondary"} className={`text-xs ${entry.isIncome ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}`}>
                        {entry.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {entry.subType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{entry.paymentMethod}</TableCell>
                    <TableCell className={`text-right font-medium text-sm ${entry.isIncome ? "text-success" : "text-destructive"}`}>
                      {entry.isIncome ? "+" : "-"}{formatAmount(entry.amount)}
                    </TableCell>
                    <TableCell>{getStatusBadge(entry.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;