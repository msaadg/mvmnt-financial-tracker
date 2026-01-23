"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Search, Download, Edit, Trash2, Filter, Loader2, DollarSign } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import PaymentDialog from "@/app/components/PaymentDialog";
import { useToast } from "@/app/hooks/use-toast";
import { SessionProvider, useSession } from "next-auth/react";
import { exportPaymentsToCSV } from "@/app/lib/pdfGenerator";
import axios from "axios";

function Payments() {
  return <SessionProvider><PaymentsContent /></SessionProvider>;
}

const PaymentsContent = () => {
  const [showZeroBalance, setShowZeroBalance] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [collectorFilter, setCollectorFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [vendorBalances, setVendorBalances] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [collectors, setCollectors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [editingPayment, setEditingPayment] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: "vendor" | "payment"; id: string | number; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const { data: session } = useSession();
  const isAdmin = !!(session?.user as any)?.role && (session?.user as any).role === "admin";

  useEffect(() => {
    fetchData();
    fetchCollectors();
  }, [showZeroBalance]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [balancesRes, paymentsRes] = await Promise.all([
        axios.get(`/api/vendors/balances?includeZero=${showZeroBalance}`),
        axios.get("/api/payments"),
      ]);

      setVendorBalances(balancesRes.data.balances || []);
      setPayments(paymentsRes.data.payments || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data from database");
    } finally {
      setLoading(false);
    }
  };

  const fetchCollectors = async () => {
    try {
      const response = await axios.get("/api/collectors");
      setCollectors(response.data.collectors || []);
    } catch (err) {
      console.error("Failed to fetch collectors:", err);
    }
  };

  const handlePayClick = (vendorName: string) => {
    setSelectedVendor(vendorName);
    setPaymentDialogOpen(true);
  };

  const handleEditPayment = (payment: any) => {
    setEditingPayment(payment);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (type: "vendor" | "payment", id: string | number, name: string) => {
    setDeleteTarget({ type, id, name });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      if (deleteTarget.type === "vendor") {
        await axios.delete(`/api/vendors?name=${deleteTarget.id}`);
        toast({
          title: "Vendor Deleted",
          description: "The vendor has been successfully deleted.",
        });
      } else {
        await axios.delete(`/api/payments?id=${deleteTarget.id}`);
        toast({
          title: "Payment Deleted",
          description: "The payment has been successfully deleted.",
        });
      }

      fetchData();
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting:", error);
      toast({
        title: "Error",
        description: axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to delete"
          : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollector = collectorFilter === "all" || payment.collector === collectorFilter;
    const matchesType = typeFilter === "all" || payment.type.toLowerCase() === typeFilter;
    const matchesPaymentMethod = paymentMethodFilter === "all" || payment.paymentMethod.toLowerCase() === paymentMethodFilter;
    const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter;

    const paymentDate = new Date(payment.date);
    const matchesDateFrom = !dateFrom || paymentDate >= new Date(dateFrom);
    const matchesDateTo = !dateTo || paymentDate <= new Date(dateTo);

    return matchesSearch && matchesCollector && matchesType && matchesPaymentMethod && matchesDateFrom && matchesDateTo && matchesStatus;
  });

  const totalPayments = filteredPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const totalBalance = vendorBalances.reduce((sum, v) => sum + Number(v.balance || 0), 0);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const uniqueVendors = [...new Set(payments.map((p) => p.vendorName))];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case "pending":
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-destructive text-destructive-foreground">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleExportCSV = () => {
    try {
      const csvData = filteredPayments.map(p => ({
        id: p.id.toString(),
        vendorName: p.vendorName || "N/A",
        collector: p.collector || "N/A",
        amount: p.amount,
        type: p.type,
        paymentMethod: p.paymentMethod,
        date: p.date,
      }));
      
      exportPaymentsToCSV(csvData, `payments-${new Date().toISOString().split('T')[0]}.csv`);
      
      toast({
        title: "CSV Exported",
        description: `Exported ${csvData.length} payment records to CSV.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export payments to CSV.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Manage vendor payments and track balances
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 my-4 w-full sm:w-auto"
            onClick={handleExportCSV}
            disabled={filteredPayments.length === 0}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </div>
      {error && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">{error}</p>
        </div>
      )}

      {/* Summary Card */}
      <Card className="mb-4 sm:mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Outstanding Balance</p>
              <p className="text-2xl font-bold text-destructive">{formatAmount(totalBalance)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Payments</p>
              <p className="text-2xl font-bold text-success">{formatAmount(totalPayments)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vendors with Balance</p>
              <p className="text-2xl font-bold text-foreground">
                {vendorBalances.filter((v) => v.balance > 0).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Balances Table */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <CardTitle className="text-base sm:text-lg">Vendor Balances</CardTitle>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showZero"
                checked={showZeroBalance}
                onCheckedChange={(checked) => setShowZeroBalance(!!checked)}
              />
              <label
                htmlFor="showZero"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Show vendors with 0 balance
              </label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-[600px] px-4 sm:px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor Name</TableHead>
                    <TableHead>Total Expenses</TableHead>
                    <TableHead>Total Paid</TableHead>
                    <TableHead>Balance Remaining</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendorBalances.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No vendors found
                      </TableCell>
                    </TableRow>
                  ) : (
                    vendorBalances.map((vendor) => (
                      <TableRow key={vendor.vendorName}>
                        <TableCell className="font-medium text-foreground text-sm">
                          {vendor.vendorName}
                        </TableCell>
                        <TableCell className="text-sm">{formatAmount(vendor.totalExpenses)}</TableCell>
                        <TableCell className="text-success text-sm">{formatAmount(vendor.totalPayments)}</TableCell>
                        <TableCell className="font-medium text-sm">
                          <Badge
                            variant={vendor.balance > 0 ? "destructive" : "outline"}
                            className={vendor.balance === 0 ? "bg-success text-success-foreground" : ""}
                          >
                            {formatAmount(vendor.balance)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <div className="flex gap-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handlePayClick(vendor.vendorName)}
                                  >
                                    <DollarSign className="h-3 w-3" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Make payment</p>
                                </TooltipContent>
                              </Tooltip>
                              {isAdmin && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                      onClick={() => handleDeleteClick("vendor", vendor.vendorName, vendor.vendorName)}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Delete vendor</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="mb-4 sm:mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
            Payment History Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            <div className="relative lg:col-span-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
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
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={collectorFilter} onValueChange={setCollectorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Collector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Collectors</SelectItem>
                {collectors.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="zakat">Zakat</SelectItem>
                <SelectItem value="sadqa">Sadqa</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="online">Online</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">From Date</label>
              <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="text-sm" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">To Date</label>
              <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="text-sm" />
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setCollectorFilter("all");
              setTypeFilter("all");
              setPaymentMethodFilter("all");
              setStatusFilter("all");
              setDateFrom("");
              setDateTo("");
            }}
            className="mt-4 w-full sm:w-auto"
          >
            Clear Filters
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Payment Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-[900px] px-4 sm:px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Collector</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        No payments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium text-foreground text-sm">{payment.vendorName}</TableCell>
                        <TableCell className="text-sm">{payment.collector}</TableCell>
                        <TableCell className="font-medium text-success text-sm">{formatAmount(payment.amount)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              payment.type === "Zakat" ? "border-primary text-primary" : "border-yellow-400 text-yellow-800"
                            }`}
                          >
                            {payment.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm capitalize">{payment.paymentMethod}</TableCell>
                        <TableCell className="text-sm">{new Date(payment.date).toLocaleDateString("en-GB")}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <div className="flex gap-1">
                              {isAdmin && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                      onClick={() => handleEditPayment(payment)}
                                    >
                                      <Edit className="h-3 w-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Edit payment</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                              {isAdmin && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                      onClick={() => handleDeleteClick("payment", payment.id, `${payment.vendorName} payment`)}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Delete payment</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Dialog */}
      <PaymentDialog
        vendorName={selectedVendor || undefined}
        open={paymentDialogOpen}
        onOpenChange={(open) => {
          setPaymentDialogOpen(open);
          if (!open) setSelectedVendor(null);
        }}
        onSubmit={() => {
          fetchData();
          setPaymentDialogOpen(false);
          setSelectedVendor(null);
        }}
      />

      {/* Edit Payment Dialog */}
      <PaymentDialog
        payment={editingPayment}
        open={editDialogOpen}
        onOpenChange={(open) => {
          setEditDialogOpen(open);
          if (!open) setEditingPayment(null);
        }}
        onSubmit={() => {
          fetchData();
          setEditDialogOpen(false);
          setEditingPayment(null);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}. Note that you must first delete any expenses against this vendor.
              <strong>{deleteTarget?.name}</strong>.
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
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Payments;
