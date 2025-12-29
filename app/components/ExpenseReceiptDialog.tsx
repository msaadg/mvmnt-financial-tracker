import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Download, Mail, Loader2 } from "lucide-react";
import { useToast } from "@/app/hooks/use-toast";
import { numberToWords } from "@/app/lib/utils";
import { generateExpenseReceiptPDF } from "@/app/lib/pdfGenerator";
import { useState } from "react";

interface ExpenseReceiptDialogProps {
  expense: {
    id: string;
    vendorName: string;
    amount: number;
    category: string;
    date: string;
    paymentMethod: string;
    description: string;
    collectors?: Array<{
      name: string;
      type: string;
      amount: number;
    }>;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExpenseReceiptDialog = ({ expense, open, onOpenChange }: ExpenseReceiptDialogProps) => {
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
      await generateExpenseReceiptPDF({
        id: expense.id,
        vendorName: expense.vendorName,
        amount: expense.amount,
        category: expense.category,
        paymentMethod: expense.paymentMethod,
        date: expense.date,
        description: expense.description,
        collectors: expense.collectors,
      });
      
      toast({
        title: "Receipt Downloaded",
        description: "The expense receipt has been downloaded as PDF.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  const handleEmail = () => {
    toast({
      title: "Receipt Sent",
      description: `Expense receipt has been emailed to vendor.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Expense Receipt</DialogTitle>
        </DialogHeader>
        
        <div className="bg-background border rounded-lg p-8 space-y-2">
          {/* Header */}
          <div className="text-center border-b pb-2">
            <h2 className="text-2xl font-bold text-foreground">MVMNT</h2>
            <p className="text-muted-foreground">Expense Receipt</p>
          </div>

          {/* Receipt Details */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Receipt No.</p>
                <p className="font-medium">#{expense.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{new Date(expense.date).toLocaleDateString('en-GB')}</p>
              </div>
            </div>

            <div className="border-t pt-2">
              <h3 className="font-semibold mb-3">Vendor Information</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Vendor/Project Name</p>
                  <p className="font-medium">{expense.vendorName}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-2">
              <h3 className="font-semibold mb-3">Expense Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Category:</p>
                  <p className="font-medium">{expense.category}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Payment Method:</p>
                  <p className="font-medium">{expense.paymentMethod}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Description:</p>
                  <p className="font-medium">{expense.description}</p>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <p className="text-lg font-semibold">Total Amount:</p>
                  <p className="text-xl font-bold text-destructive">{formatAmount(expense.amount)}</p>
                </div>
                <div className="text-sm text-muted-foreground border-t pt-2">
                  <p><strong>Amount in words:</strong> {numberToWords(expense.amount)} rupees only</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Prepared By</p>
                  <p className="font-medium">Finance Department</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">MVMNT Signature</p>
                  <div className="mt-2 flex items-center justify-center">
                    <img 
                      src="/sign.png" 
                      alt="MVMNT Signature" 
                      className="h-16 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-2 text-center text-sm text-muted-foreground">
              <p>Thank you for your services to MVMNT.</p>
              <p className="mt-2">This receipt serves as confirmation of expense payment.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <Button 
            variant="outline" 
            onClick={handleDownload} 
            disabled={downloading}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {downloading ? "Generating..." : "Download PDF"}
          </Button>
          {/* <Button onClick={handleEmail} className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Receipt
          </Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseReceiptDialog;