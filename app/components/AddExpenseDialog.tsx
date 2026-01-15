import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/app/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Plus, Trash2, Loader2, Check, ChevronsUpDown } from "lucide-react";
import { useToast } from "@/app/hooks/use-toast";
import axios from "axios";
import { cn } from "@/app/lib/utils";

interface FormCollectorEntry {
  name: string;
  type: string;
  amount: string;
}

interface CollectorEntry {
  name: string;
  type: string;
  amount: number;
}

interface Expense {
  id?: string | number;
  vendorName: string;
  amount: number;
  project: string;
  date: string;
  description: string;
  invoiceNumber: string;
}

interface AddExpenseDialogProps {
  expense?: Expense;
  onSubmit?: (data: Expense) => void;
  triggerButton?: React.ReactNode | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AddExpenseDialog = ({ expense, onSubmit, triggerButton, open: controlledOpen, onOpenChange }: AddExpenseDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Use controlled or internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;
  // Fetch collectors from database
  const [vendors, setVendors] = useState<string[]>([]);
  const [vendorsLoading, setVendorsLoading] = useState(false); 
  
  // Fetch vendors when dialog opens
  useEffect(() => {
    if (open) {
      fetchVendors();
    }
  }, [open]);
  
  const fetchVendors = async () => {
    try {
      setVendorsLoading(true);
      const response = await axios.get('/api/vendors');
      setVendors(response.data.vendors || []);
      console.log('Fetched vendors:', vendors);
    } catch (error) {
      console.error('Failed to fetch vendors:', error);
    } finally {
      setVendorsLoading(false);
    }
  };
  

  // Fetch collectors from database
  const [collectors, setCollectors] = useState<string[]>([]);
  const [collectorsLoading, setCollectorsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    vendorName: expense?.vendorName || "",
    amount: expense?.amount?.toString() || "",
    project: expense?.project || "",
    date: expense?.date || "",
    description: expense?.description || "",
    invoiceNumber: expense?.invoiceNumber || "",
  });
  
  // Fetch collectors when dialog opens
  useEffect(() => {
    if (open) {
      fetchCollectors();
    }
  }, [open]);
  
  const fetchCollectors = async () => {
    try {
      setCollectorsLoading(true);
      const response = await axios.get('/api/collectors');
      setCollectors(response.data.collectors || []);
    } catch (error) {
      console.error('Failed to fetch collectors:', error);
    } finally {
      setCollectorsLoading(false);
    }
  };
  
  // Update form data when expense prop changes
  useEffect(() => {
    if (expense) {
      setFormData({
        vendorName: expense.vendorName || "",
        amount: expense.amount?.toString() || "",
        project: expense.project || "",
        date: expense.date || "",
        description: expense.description || "",
        invoiceNumber: expense.invoiceNumber || "",
      });
      if (controlledOpen !== undefined) {
        setOpen(true);
      }
    }
  }, [expense]);
  
  const { toast } = useToast();

  const validateForm = () => {
    const missingFields: string[] = [];
    
    // Check basic required fields
    if (!formData.vendorName) {
      missingFields.push("Vendor Name");
    }
    if (!formData.amount.trim() || parseFloat(formData.amount) <= 0) {
      missingFields.push("Amount (must be greater than 0)");
    }
    if (!formData.project) {
      missingFields.push("Project");
    }
    if (!formData.date) {
      missingFields.push("Date");
    }
    if (!formData.description.trim()) {
      missingFields.push("Description");
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
        description: `Please fix: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare data for API
      const apiData = {
        date: formData.date,
        amount: parseInt(formData.amount),
        vendorName: formData.vendorName,
        project: formData.project,
        description: formData.description,
      };

      // POST or PUT depending on whether expense exists
      let response;
      if (expense?.id) {
        // Update existing expense
        response = await axios.put('/api/expenses', {
          id: expense.id,
          ...apiData
        });
      } else {
        // Create new expense
        response = await axios.post('/api/expenses', apiData);
      }
      
      const action = expense ? "updated" : "added";
      
      toast({
        title: `Expense ${action}`,
        description: `The expense has been successfully ${action}.`,
      });
      
      // Call onSubmit callback if provided
      if (onSubmit) {
        const submissionData: Expense = {
          ...formData,
          amount: parseFloat(formData.amount) || 0
        };
        onSubmit(submissionData);
      }
      
      setOpen(false);
      
      // Reset form if adding new expense
      if (!expense) {
        setFormData({
          vendorName: "",
          amount: "",
          project: "",
          date: "",
          description: "",
          invoiceNumber: "",
        });
      }
    } catch (error) {
      console.error('Error creating expense:', error);
      toast({
        title: "Error",
        description: axios.isAxiosError(error) 
          ? error.response?.data?.message || "Failed to create expense"
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
            Add Expense
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>{expense ? "Edit Expense" : "Add New Expense"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vendorName">Vendor Name</Label>
              <Input
                id="vendorName"
                list="vendor-options" // This links to the datalist ID
                type="text"
                value={formData.vendorName}
                onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                placeholder="Enter vendor or project name"
              />
              <datalist id="vendor-options">
                {vendors.map((vendor) => (
                  <option key={vendor} value={vendor} />
                ))}
              </datalist>
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
          
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Input
                id="project"
                type="text"
                value={formData.project}
                onChange={(e) => setFormData({...formData, project: e.target.value})}
                placeholder="Enter project name"
              />
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Expense description..."
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {expense ? "Updating..." : "Adding..."}
                </>
              ) : (
                expense ? "Update Expense" : "Add Expense"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseDialog;