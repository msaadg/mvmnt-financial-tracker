"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import { Download, Search, Edit, Trash2, FileText, Filter, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
// import { sampleExpenses, collectors } from "@/app/data/sampleData";
import AddExpenseDialog from "@/app/components/AddExpenseDialog";
import ExpenseReceiptDialog from "@/app/components/ExpenseReceiptDialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";
import { useToast } from "@/app/hooks/use-toast";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle
} from "@/app/components/ui/alert-dialog";
import { exportExpensesToCSV } from "@/app/lib/pdfGenerator";
import axios from "axios";

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [collectorFilter, setCollectorFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collectors, setCollectors] = useState<string[]>([]);

  // Fetch expenses from API
  useEffect(() => {
    fetchExpenses();
    fetchCollectors();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/expenses');
      setExpenses(response.data.expenses || []);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      setError('Failed to load expenses from database');
      // Fallback to sample data
      // setExpenses(sampleExpenses);
    } finally {
      setLoading(false);
    }
  };

    const fetchCollectors = async () => {
    try {
      const response = await axios.get('/api/collectors');
      setCollectors(response.data.collectors || []);
    } catch (err) {
      console.error('Failed to fetch collectors:', err);
    }
  }

  const filteredExpenses = expenses.filter(expense => {
    const vendorName = expense.vendorName || expense.vendorProject?.name || "";
    const description = expense.description || "";
    
    const matchesSearch = vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || expense.status.toLowerCase() === statusFilter;
    const matchesCategory = categoryFilter === "all" || expense.category.toLowerCase() === categoryFilter;
    const matchesPayment = paymentFilter === "all" || expense.paymentMethod?.toLowerCase() === paymentFilter;
    const matchesCollector = collectorFilter === "all" || 
                            expense.collectors?.some((c: any) => c.name === collectorFilter);
    
    const expenseDate = new Date(expense.date);
    const matchesDateFrom = !dateFrom || expenseDate >= new Date(dateFrom);
    const matchesDateTo = !dateTo || expenseDate <= new Date(dateTo);
    
    return matchesSearch && matchesStatus && matchesCategory && matchesPayment && 
           matchesCollector && matchesDateFrom && matchesDateTo;
  });

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const totalRecords = filteredExpenses.length;
  const now = new Date();
  const thisMonthTotal = filteredExpenses.reduce((sum, e) => {
    const d = new Date(e.date);
    return (d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()) ? sum + Number(e.amount || 0) : sum;
  }, 0);
  const pendingCount = filteredExpenses.filter(e => (e.status || "").toLowerCase() === "pending").length;

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <Badge className="bg-success text-success-foreground">Paid</Badge>;
      case "pending":
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-destructive text-destructive-foreground">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      operations: "bg-blue-100 text-blue-800 border-blue-200",
      utilities: "bg-green-100 text-green-800 border-green-200",
      programs: "bg-purple-100 text-purple-800 border-purple-200",
      technology: "bg-orange-100 text-orange-800 border-orange-200",
      marketing: "bg-pink-100 text-pink-800 border-pink-200",
    };
    
    const colorClass = colors[category.toLowerCase() as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
    
    return (
      <Badge variant="outline" className={colorClass}>
        {category}
      </Badge>
    );
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleReceiptClick = (expense: any) => {
    setSelectedExpense(expense);
    setReceiptOpen(true);
  };

  const handleEditClick = (expense: any) => {
    setEditingExpense(expense);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (expense: any) => {
    setExpenseToDelete(expense);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!expenseToDelete?.id) return;

    setDeleting(true);
    try {
      await axios.delete(`/api/expenses?id=${expenseToDelete.id}`);

      toast({
        title: "Expense Deleted",
        description: "The expense record has been successfully deleted.",
      });

      // Refresh the expenses list
      fetchExpenses();
      setDeleteDialogOpen(false);
      setExpenseToDelete(null);
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast({
        title: "Error",
        description: axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to delete expense"
          : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleExportCSV = () => {
    try {
      const csvData = filteredExpenses.map(e => ({
        id: e.id.toString(),
        vendorName: e.vendorName || e.vendorProject?.name || "N/A",
        amount: e.amount,
        category: e.category,
        paymentMethod: e.paymentMethod,
        date: e.date,
        description: e.description || '',
        collectors: e.collectors
      }));
      
      exportExpensesToCSV(csvData, `expenses-${new Date().toISOString().split('T')[0]}.csv`);
      
      toast({
        title: "CSV Exported",
        description: `Exported ${csvData.length} expense records to CSV.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export expenses to CSV.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Expenses</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Track and manage organizational expenditures
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 w-full sm:w-auto"
            onClick={handleExportCSV}
            disabled={filteredExpenses.length === 0}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">Export</span>
          </Button>
          <AddExpenseDialog onSubmit={fetchExpenses} />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
      {/* Summary Card */}
      <Card className="mb-4 sm:mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold text-foreground">{formatAmount(totalExpenses)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Records</p>
              <p className="text-2xl font-bold text-foreground">{totalRecords}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold text-destructive">
                {formatAmount(thisMonthTotal)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-warning">
                {pendingCount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="mb-4 sm:mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                {/* <SelectItem value="overdue">Overdue</SelectItem> */}
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="programs">Programs</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
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
            
            <Select value={collectorFilter} onValueChange={setCollectorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Collector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Collectors</SelectItem>
                {collectors.map((collector) => (
                  <SelectItem key={collector} value={collector}>{collector}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">From Date</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="text-sm"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">To Date</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="text-sm"
              />
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setCategoryFilter("all");
              setPaymentFilter("all");
              setCollectorFilter("all");
              setDateFrom("");
              setDateTo("");
            }}
            className="mt-4 w-full sm:w-auto"
          >
            Clear Filters
          </Button>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Expense Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-[900px] px-4 sm:px-0">
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor/Project</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Collectors</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {expense.vendorName || expense.vendorProject?.name || "N/A"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate max-w-[150px]">{expense.description}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-destructive text-sm">
                      {formatAmount(expense.amount)}
                    </TableCell>
                    <TableCell>
                      {getCategoryBadge(expense.category)}
                    </TableCell>
                    <TableCell className="text-sm">{expense.paymentMethod}</TableCell>
                    <TableCell>
                      <div className="space-y-1 max-w-[200px]">
                        {expense.collectors?.map((collector: any, index: number) => (
                          <div key={index} className="text-xs">
                            <span className="font-medium">{collector.name}</span>
                            <span className="text-muted-foreground block sm:inline"> ({collector.type}: {formatAmount(Number(collector.amount))})</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{new Date(expense.date).toLocaleDateString('en-GB')}</TableCell>
                    <TableCell>{getStatusBadge(expense.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleEditClick(expense)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit expense</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {/* <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleReceiptClick(expense)}
                              >
                                <FileText className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Generate receipt</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider> */}

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteClick(expense)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete expense</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        </Card>
        </>
      )}

        {selectedExpense && (
          <ExpenseReceiptDialog
            expense={selectedExpense}
            open={receiptOpen}
            onOpenChange={setReceiptOpen}
          />
        )}

        {/* Edit Expense Dialog */}
        <AddExpenseDialog
          expense={editingExpense}
          open={editDialogOpen}
          onOpenChange={(open) => {
            setEditDialogOpen(open);
            if (!open) {
              setEditingExpense(null);
            }
          }}
          onSubmit={() => {
            fetchExpenses();
            setEditDialogOpen(false);
            setEditingExpense(null);
          }}
          triggerButton={null}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the expense
                record for <strong>{expenseToDelete?.vendorName || expenseToDelete?.vendorProject?.name}</strong> of amount{" "}
                <strong>PKR {expenseToDelete?.amount?.toLocaleString()}</strong>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Expense"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };
  
  export default Expenses;