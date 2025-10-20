import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { Plus } from "lucide-react";
import { useToast } from "@/app/hooks/use-toast";
import { referrals, collectors } from "@/app/data/sampleData";
import axios from "axios";

interface AddDonationDialogProps {
  donation?: any;
  onSubmit?: (data: any) => void;
  triggerButton?: React.ReactNode;
}

const AddDonationDialog = ({ donation, onSubmit, triggerButton }: AddDonationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    donorName: donation?.donorName || "",
    amount: donation?.amount?.toString() || "",
    type: donation?.type || "",
    paymentMethod: donation?.paymentMethod || "",
    collector: donation?.collector || "",
    referral: donation?.referral || "",
    date: donation?.date || "",
    notes: donation?.notes || ""
  });
  const { toast } = useToast();

  const donors = [
    "Ahmed Ali",
    "Fatima Khan", 
    "Muhammad Hassan",
    "Sarah Ahmed",
    "Ali Khan"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare API data
      const apiData = {
        date: formData.date,
        amount: parseInt(formData.amount) || 0,
        paymentMethod: formData.paymentMethod,
        donorName: formData.donorName,
        type: formData.type,
        notes: formData.notes,
        referral: formData.referral,
        collector: formData.collector,
      };

      // POST or PUT depending on whether donation exists
      const response = await axios.post("/api/donations", apiData);

      const action = donation ? "updated" : "added";

      toast({
        title: `Donation ${action}`,
        description: `The donation has been successfully ${action}.`,
      });

      // Trigger onSubmit callback if provided
      onSubmit?.({
        ...formData,
        amount: parseFloat(formData.amount) || 0,
      });

      setOpen(false);

      // Reset form if adding new donation
      if (!donation) {
        setFormData({
          donorName: "",
          amount: "",
          type: "",
          paymentMethod: "",
          collector: "",
          referral: "",
          date: "",
          notes: "",
        });
      }
    } catch (error) {
      console.error("Error creating donation:", error);
      toast({
        title: "Error",
        description: axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to create donation"
          : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerButton ? (
        <DialogTrigger asChild>
          {triggerButton}
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Donation
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{donation ? "Edit Donation" : "Add New Donation"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="donorName">Donor Name</Label>
              <Input
                id="donorName"
                value={formData.donorName}
                onChange={(e) => setFormData({...formData, donorName: e.target.value})}
                placeholder="Enter donor name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (PKR)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="referral">Referral</Label>
              <Select value={formData.referral} onValueChange={(value) => setFormData({...formData, referral: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select referral" />
                </SelectTrigger>
                <SelectContent>
                  {referrals.map((referral) => (
                    <SelectItem key={referral} value={referral}>{referral}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="collector">Collector</Label>
              <Select value={formData.collector} onValueChange={(value) => setFormData({...formData, collector: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select collector" />
                </SelectTrigger>
                <SelectContent>
                  {collectors.map((collector) => (
                    <SelectItem key={collector} value={collector}>{collector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Donation Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zakat">Zakat</SelectItem>
                  <SelectItem value="sadqa">Sadqa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({...formData, paymentMethod: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Additional notes..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {donation ? "Update Donation" : "Add Donation"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDonationDialog;