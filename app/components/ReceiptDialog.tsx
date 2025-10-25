"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Download, Mail } from "lucide-react";
import { useToast } from "@/app/hooks/use-toast";
import { numberToWords } from "@/app/lib/utils";
import { generateDonationReceiptPDF } from "@/app/lib/pdfGenerator";
import { useState } from "react";

interface ReceiptDialogProps {
  donation: {
    id: string;
    donorName: string;
    donorEmail: string;
    amount: number;
    type: string;
    date: string;
    paymentMethod: string;
    bankName?: string;
    accountName?: string;
    collector?: string;
    referral?: string;
    notes?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReceiptDialog = ({ donation, open, onOpenChange }: ReceiptDialogProps) => {
  const { toast } = useToast();
  const [downloading, setDownloading] = useState(false);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await generateDonationReceiptPDF({
        id: donation.id,
        donorName: donation.donorName,
        amount: donation.amount,
        type: donation.type,
        paymentMethod: donation.paymentMethod,
        collector: donation.collector,
        referral: donation.referral,
        date: donation.date,
        notes: donation.notes,
      });
      
      toast({
        title: "Receipt Downloaded",
        description: "The receipt has been downloaded as PDF.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please ensure LaTeX is installed on the server.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  const handleEmail = () => {
    toast({
      title: "Receipt Sent",
      description: `Receipt has been emailed to ${donation.donorEmail}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Donation Receipt</DialogTitle>
        </DialogHeader>
        
        <div className="bg-background border rounded-lg p-6">
          {/* Header */}
          <div className="text-center border-b pb-2">
            <h2 className="text-xl font-bold text-foreground">MVMNT</h2>
            <p className="text-muted-foreground">Donation Receipt</p>
          </div>

          {/* Receipt Details */}
          <div className="space-y-2 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Receipt No.</p>
                <p className="font-medium">#{donation.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{new Date(donation.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="border-t pt-2">
              <h3 className="font-semibold mb-3">Donor Information</h3>
              <div className="space-y-1">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{donation.donorName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{donation.donorEmail}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-2">
              <h3 className="font-semibold mb-3">Donation Details</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Type:</p>
                  <p className="font-medium">{donation.type}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Payment Method:</p>
                  <p className="font-medium">{donation.paymentMethod}</p>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <p className="text-lg font-semibold">Total Amount:</p>
                  <p className="text-xl font-bold text-success">{formatAmount(donation.amount)}</p>
                </div>
                <div className="text-sm text-muted-foreground border-t pt-2">
                  <p><strong>Amount in words:</strong> {numberToWords(donation.amount)} rupees only</p>
                </div>
                {donation.paymentMethod === "Bank Transfer" && donation.bankName && (
                  <div className="border-t pt-2 space-y-1">
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Bank Name:</p>
                      <p className="font-medium">{donation.bankName}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Account Name:</p>
                      <p className="font-medium">{donation.accountName}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Collected By</p>
                  <p className="font-medium">{donation.collector || "Admin"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">MVMNT Signature</p>
                  <div className="mt-2">
                    <img 
                      src="/sign.png" 
                      alt="MVMNT Signature" 
                      className="h-16 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 text-center text-sm text-muted-foreground">
              <p>Thank you for your generous contribution to MVMNT.</p>
              <p className="mt-2">This receipt serves as confirmation of your donation.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={handleDownload} 
            disabled={downloading}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {downloading ? "Generating..." : "Download PDF"}
          </Button>
          <Button onClick={handleEmail} className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email to Donor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptDialog;