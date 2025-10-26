"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
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
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Search, Download, Edit, FileText, Filter, Loader2, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";
import AddDonationDialog from "@/app/components/AddDonationDialog";
import ReceiptDialog from "@/app/components/ReceiptDialog";
import { exportDonationsToCSV } from "@/app/lib/pdfGenerator";
import axios from "axios";
import { useToast } from "@/app/hooks/use-toast";
import { collectors } from "@/app/data/sampleData";

interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  type: string;
  paymentMethod: string;
  collector?: string;
  referral: string;
  date: string;
  status: string;
  notes: string;
  bankName?: string;
  accountName?: string;
}

const Donations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [collectorFilter, setCollectorFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [editDonation, setEditDonation] = useState<Donation | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [donationToDelete, setDonationToDelete] = useState<Donation | null>(null);
  const [deleting, setDeleting] = useState(false);
  
  // API integration
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/donations');
      setDonations(response.data.donations || []);
    } catch (err) {
      console.error('Error fetching donations:', err);
      setError('Failed to load donations from database');
    } finally {
      setLoading(false);
    }
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.donorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || (donation.status || "").toLowerCase() === statusFilter;
    const matchesType = typeFilter === "all" || (donation.type || "").toLowerCase() === typeFilter;
    const matchesPayment = paymentFilter === "all" || (donation.paymentMethod || "").toLowerCase() === paymentFilter;
    const matchesCollector = collectorFilter === "all" || (donation.collector || "") === collectorFilter;

    const donationDate = new Date(donation.date);
    const matchesDateFrom = !dateFrom || donationDate >= new Date(dateFrom);
    const matchesDateTo = !dateTo || donationDate <= new Date(dateTo);

    return matchesSearch && matchesStatus && matchesType && matchesPayment && matchesCollector && matchesDateFrom && matchesDateTo;
  });

  // derive summary values from filtered results so UI reflects current filters
  const totalDonations = filteredDonations.reduce((sum, d) => sum + Number(d.amount || 0), 0);
  const totalRecords = filteredDonations.length;
  const now = new Date();
  const thisMonthTotal = filteredDonations.reduce((sum, d) => {
    const dt = new Date(d.date);
    return (dt.getFullYear() === now.getFullYear() && dt.getMonth() === now.getMonth()) ? sum + Number(d.amount || 0) : sum;
  }, 0);
  const pendingCount = filteredDonations.filter(d => (d.status || "").toLowerCase() === "pending").length;

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
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

  const handleExportCSV = () => {
    try {
      const csvData = filteredDonations.map(d => ({
        id: d.id.toString(),
        donorName: d.donorName,
        amount: d.amount,
        type: d.type,
        paymentMethod: d.paymentMethod,
        collector: d.collector,
        referral: d.referral,
        date: d.date,
        notes: d.notes
      }));
      
      exportDonationsToCSV(csvData, `donations-${new Date().toISOString().split('T')[0]}.csv`);
      
      toast({
        title: "CSV Exported",
        description: `Exported ${csvData.length} donation records to CSV.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export donations to CSV.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (donation: any) => {
    setEditDonation(donation);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (donation: any) => {
    setDonationToDelete(donation);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!donationToDelete?.id) return;

    setDeleting(true);
    try {
      await axios.delete(`/api/donations?id=${donationToDelete.id}`);

      toast({
        title: "Donation Deleted",
        description: "The donation has been successfully deleted.",
      });

      // Refresh the donations list
      fetchDonations();
      setDeleteDialogOpen(false);
      setDonationToDelete(null);
    } catch (error) {
      console.error("Error deleting donation:", error);
      toast({
        title: "Error",
        description: axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to delete donation"
          : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Donations</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Manage all donation records and donor information
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 w-full sm:w-auto"
            onClick={handleExportCSV}
            disabled={filteredDonations.length === 0}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">Export</span>
          </Button>
          <AddDonationDialog onSubmit={fetchDonations} />
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
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Donations</p>
              <p className="text-2xl font-bold text-foreground">{formatAmount(totalDonations)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Records</p>
              <p className="text-2xl font-bold text-foreground">{totalRecords}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold text-success">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search donors..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
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
                {collectors.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="col-span-1 lg:col-span-5 mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                setStatusFilter("all");
                setTypeFilter("all");
                setPaymentFilter("all");
                setCollectorFilter("all");
                setDateFrom("");
                setDateTo("");
              }}
              className="w-full sm:w-auto"
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Donations Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Donation Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-[800px] px-4 sm:px-0">
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Referral</TableHead>
                  <TableHead>Collector</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground text-sm">{donation.donorName}</p>
                        {donation.notes && (
                          <p className="text-xs text-muted-foreground truncate max-w-[150px]">{donation.notes}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-success text-sm">
                      {formatAmount(donation.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${donation.type === "Zakat" ? "border-primary text-primary" : "border-secondary text-secondary-foreground"}`}>
                        {donation.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{donation.paymentMethod}</TableCell>
                    <TableCell className="text-sm">{donation.referral}</TableCell>
                    <TableCell className="text-sm">{donation.collector}</TableCell>
                    <TableCell className="text-sm">{new Date(donation.date).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(donation.status)}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <div className="flex gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleEdit(donation)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit donation</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  const receiptDonation = {
                                    ...donation,
                                    id: donation.id.toString(),
                                    donorEmail: `${donation.donorName.toLowerCase().replace(' ', '.')}@example.com`
                                  };
                                  setSelectedDonation(receiptDonation);
                                  setReceiptDialogOpen(true);
                                }}
                              >
                                <FileText className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Generate receipt</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteClick(donation)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete donation</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Receipt Dialog */}
      {selectedDonation && (
        <ReceiptDialog
          donation={selectedDonation}
          open={receiptDialogOpen}
          onOpenChange={setReceiptDialogOpen}
        />
      )}

      {/* Edit Donation Dialog */}
      <AddDonationDialog
        donation={editDonation}
        open={editDialogOpen}
        onOpenChange={(open) => {
          setEditDialogOpen(open);
          if (!open) {
            setEditDonation(null);
          }
        }}
        onSubmit={() => {
          fetchDonations();
          setEditDialogOpen(false);
          setEditDonation(null);
        }}
        triggerButton={null}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the donation
              record for <strong>{donationToDelete?.donorName}</strong> of amount{" "}
              <strong>PKR {donationToDelete?.amount?.toLocaleString()}</strong>.
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
                "Delete Donation"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Donations;