import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/app/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Plus, Loader2, Check, ChevronsUpDown } from "lucide-react";
import { useToast } from "@/app/hooks/use-toast";
import axios from "axios";
import { cn } from "@/app/lib/utils";

interface AddDonationDialogProps {
  donation?: any;
  onSubmit?: (data: any) => void;
  triggerButton?: React.ReactNode | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AddDonationDialog = ({ donation, onSubmit, triggerButton, open: controlledOpen, onOpenChange }: AddDonationDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Use controlled or internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;
  
  // Fetch collectors and referrals from database
  const [collectors, setCollectors] = useState<string[]>([]);
  const [referrals, setReferrals] = useState<string[]>([]);
  const [collectorsLoading, setCollectorsLoading] = useState(false);
  
  // Popover states for searchable dropdowns
  const [collectorOpen, setCollectorOpen] = useState(false);
  const [referralOpen, setReferralOpen] = useState(false);
  
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
  
  // Fetch collectors and referrals when dialog opens
  useEffect(() => {
    if (open) {
      fetchCollectorsAndReferrals();
    }
  }, [open]);
  
  const fetchCollectorsAndReferrals = async () => {
    try {
      setCollectorsLoading(true);
      const response = await axios.get('/api/collectors');
      setCollectors(response.data.collectors || []);
      setReferrals(response.data.referrals || []);
    } catch (error) {
      console.error('Failed to fetch collectors and referrals:', error);
    } finally {
      setCollectorsLoading(false);
    }
  };
  
  // Update form data when donation prop changes
  useEffect(() => {
    if (donation) {
      setFormData({
        donorName: donation.donorName || "",
        amount: donation.amount?.toString() || "",
        type: donation.type || "",
        paymentMethod: donation.paymentMethod || "",
        collector: donation.collector || "",
        referral: donation.referral || "",
        date: donation.date || "",
        notes: donation.notes || ""
      });
      if (controlledOpen !== undefined) {
        setOpen(true);
      }
    }
  }, [donation]);
  const { toast } = useToast();

  // const donors = [
  //   "Ahmed Ali",
  //   "Fatima Khan", 
  //   "Muhammad Hassan",
  //   "Sarah Ahmed",
  //   "Ali Khan"
  // ];

  const validateForm = () => {
    const missingFields: string[] = [];
    
    if (!formData.donorName.trim()) {
      missingFields.push("Donor Name");
    }
    if (!formData.amount.trim() || parseFloat(formData.amount) <= 0) {
      missingFields.push("Amount (must be greater than 0)");
    }
    if (!formData.type) {
      missingFields.push("Donation Type");
    }
    if (!formData.paymentMethod) {
      missingFields.push("Payment Method");
    }
    if (!formData.collector) {
      missingFields.push("Collector");
    }
    if (!formData.referral) {
      missingFields.push("Referral");
    }
    if (!formData.date) {
      missingFields.push("Date");
    }
    
    return missingFields;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submitting
    const missingFields = validateForm();
    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill in: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }
    
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
      let response;
      if (donation?.id) {
        // Update existing donation
        response = await axios.put("/api/donations", {
          id: donation.id,
          ...apiData
        });
      } else {
        // Create new donation
        response = await axios.post("/api/donations", apiData);
      }

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
      console.error("Error saving donation:", error);
      toast({
        title: "Error",
        description: axios.isAxiosError(error)
          ? error.response?.data?.message || `Failed to ${donation ? "update" : "create"} donation`
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (PKR)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="referral">Referral</Label>
              <Popover open={referralOpen} onOpenChange={setReferralOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={referralOpen}
                    className="w-full justify-between"
                  >
                    {formData.referral || "Select referral..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search referral..." />
                    <CommandList>
                      <CommandEmpty>No referral found.</CommandEmpty>
                      <CommandGroup>
                        {referrals.map((referral) => (
                          <CommandItem
                            key={referral}
                            value={referral}
                            onSelect={(currentValue) => {
                              setFormData({...formData, referral: currentValue === formData.referral ? "" : currentValue});
                              setReferralOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.referral === referral ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {referral}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="collector">Collector</Label>
              <Popover open={collectorOpen} onOpenChange={setCollectorOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={collectorOpen}
                    className="w-full justify-between"
                  >
                    {formData.collector || "Select collector..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search collector..." />
                    <CommandList>
                      <CommandEmpty>No collector found.</CommandEmpty>
                      <CommandGroup>
                        {collectors.map((collector) => (
                          <CommandItem
                            key={collector}
                            value={collector}
                            onSelect={(currentValue) => {
                              setFormData({...formData, collector: currentValue === formData.collector ? "" : currentValue});
                              setCollectorOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.collector === collector ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {collector}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
                  <SelectItem value="Zakat">Zakat</SelectItem>
                  <SelectItem value="Sadqa">Sadqa</SelectItem>
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
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {donation ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>{donation ? "Update Donation" : "Add Donation"}</>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDonationDialog;