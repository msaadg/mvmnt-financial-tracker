"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Search, Download, Edit, FileText, Filter } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";
import { sampleDonations } from "@/app/data/sampleData";
import AddDonationDialog from "@/app/components/AddDonationDialog";
import ReceiptDialog from "@/app/components/ReceiptDialog";

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
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);

  const filteredDonations = sampleDonations.filter(donation => {
    const matchesSearch = donation.donorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || donation.status.toLowerCase() === statusFilter;
    const matchesType = typeFilter === "all" || donation.type.toLowerCase() === typeFilter;
    const matchesPayment = paymentFilter === "all" || donation.paymentMethod.toLowerCase() === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesPayment;
  });

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

  const totalDonations = filteredDonations.reduce((sum, donation) => sum + donation.amount, 0);

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
          <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">Export</span>
          </Button>
          <AddDonationDialog />
        </div>
      </div>

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
              <p className="text-2xl font-bold text-foreground">{filteredDonations.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold text-success">
                {formatAmount(filteredDonations.filter(d => d.date.startsWith("2024-01")).reduce((sum, d) => sum + d.amount, 0))}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-warning">
                {filteredDonations.filter(d => d.status === "Pending").length}
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
                <SelectItem value="bank">Bank</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="online">Online</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setTypeFilter("all");
                setPaymentFilter("all");
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
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
    </div>
  );
};

export default Donations;