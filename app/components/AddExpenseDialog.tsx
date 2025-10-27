import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/app/hooks/use-toast";
import { collectors } from "@/app/data/sampleData";
import axios from "axios";

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
  category: string;
  paymentMethod: string;
  date: string;
  description: string;
  invoiceNumber: string;
  collectors: CollectorEntry[];
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
  
  const [formData, setFormData] = useState({
    vendorName: expense?.vendorName || "",
    amount: expense?.amount?.toString() || "",
    category: expense?.category || "",
    paymentMethod: expense?.paymentMethod || "",
    date: expense?.date || "",
    description: expense?.description || "",
    invoiceNumber: expense?.invoiceNumber || "",
    collectors: expense?.collectors?.map(c => ({ ...c, amount: c.amount.toString() })) || [{ name: "", type: "", amount: "" }] as FormCollectorEntry[]
  });
  
  // Update form data when expense prop changes
  useEffect(() => {
    if (expense) {
      setFormData({
        vendorName: expense.vendorName || "",
        amount: expense.amount?.toString() || "",
        category: expense.category || "",
        paymentMethod: expense.paymentMethod || "",
        date: expense.date || "",
        description: expense.description || "",
        invoiceNumber: expense.invoiceNumber || "",
        collectors: expense.collectors?.map(c => ({ ...c, amount: c.amount.toString() })) || [{ name: "", type: "", amount: "" }]
      });
      if (controlledOpen !== undefined) {
        setOpen(true);
      }
    }
  }, [expense]);
  
  const { toast } = useToast();

  const vendors = [
    "Office Supplies Co.",
    "Utility Company",
    "Marketing Agency",
    "Tech Solutions",
    "Catering Services",
    "Food Distribution Project",
    "IT Services Ltd.",
    "Education Program"
  ];

  const addCollector = () => {
    setFormData({
      ...formData,
      collectors: [...formData.collectors, { name: "", type: "", amount: "" }]
    });
  };

  const removeCollector = (index: number) => {
    const newCollectors = formData.collectors.filter((_, i) => i !== index);
    setFormData({ ...formData, collectors: newCollectors });
  };

  const updateCollector = (index: number, field: string, value: string) => {
    const newCollectors = formData.collectors.map((collector, i) => 
      i === index ? { ...collector, [field]: value } : collector
    );
    setFormData({ ...formData, collectors: newCollectors });
  };

  // compute totals and remaining
  const getCollectorsTotal = () => {
    return formData.collectors.reduce((sum, c) => sum + (parseFloat(c.amount || "0") || 0), 0);
  };

  const collectorsTotal = getCollectorsTotal();
  const expenseAmount = parseFloat(formData.amount || "0") || 0;
  const remainingBalance = expenseAmount - collectorsTotal;

  const validateForm = () => {
    const missingFields: string[] = [];
    
    // Check basic required fields
    if (!formData.vendorName) {
      missingFields.push("Vendor/Project Name");
    }
    if (!formData.amount.trim() || parseFloat(formData.amount) <= 0) {
      missingFields.push("Amount (must be greater than 0)");
    }
    if (!formData.category) {
      missingFields.push("Category");
    }
    if (!formData.paymentMethod) {
      missingFields.push("Payment Method");
    }
    if (!formData.date) {
      missingFields.push("Date");
    }
    if (!formData.description.trim()) {
      missingFields.push("Description");
    }

    // Check collectors
    formData.collectors.forEach((collector, index) => {
      const collectorLabel = `Collector ${index + 1}`;
      if (!collector.name) {
        missingFields.push(`${collectorLabel} - Name`);
      }
      if (!collector.type) {
        missingFields.push(`${collectorLabel} - Payment Type`);
      }
      if (!collector.amount.trim() || parseFloat(collector.amount) <= 0) {
        missingFields.push(`${collectorLabel} - Amount (must be greater than 0)`);
      }
    });

    // New validation: collectors total must not exceed expense amount
    if (collectorsTotal > expenseAmount) {
      missingFields.push("Sum of collector amounts exceeds total expense amount");
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
      // Find the vendor/project ID from the list
      const vendorIndex = vendors.indexOf(formData.vendorName);
      const vendorProjId = vendorIndex >= 0 ? vendorIndex + 1 : 1;

      // Determine status based on collectors total vs expense amount
      const status = collectorsTotal < expenseAmount ? "Pending" : "Paid";

      // Prepare data for API
      const apiData = {
        date: formData.date,
        amount: parseInt(formData.amount),
        paymentMethod: formData.paymentMethod,
        vendorProjId: vendorProjId,
        category: formData.category,
        description: formData.description,
        status, // computed status
        collectors: formData.collectors.map(c => ({
          name: c.name,
          type: c.type,
          amount: parseInt(c.amount) || 0
        }))
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
          amount: parseFloat(formData.amount) || 0,
          collectors: formData.collectors.map(c => ({
            ...c,
            amount: parseFloat(c.amount) || 0
          }))
        };
        onSubmit(submissionData);
      }
      
      setOpen(false);
      
      // Reset form if adding new expense
      if (!expense) {
        setFormData({
          vendorName: "",
          amount: "",
          category: "",
          paymentMethod: "",
          date: "",
          description: "",
          invoiceNumber: "",
          collectors: [{ name: "", type: "", amount: "" }]
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{expense ? "Edit Expense" : "Add New Expense"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vendorName">Vendor/Project Name</Label>
              <Input
                id="vendorName"
                type="text"
                value={formData.vendorName}
                onChange={(e) => setFormData({...formData, vendorName: e.target.value})}
                placeholder="Enter vendor or project name"
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
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Programs">Programs</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Expense description..."
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Collectors</Label>
              <Button type="button" onClick={addCollector} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Collector
              </Button>
            </div>
            
            <div className="max-h-[135px] overflow-y-auto space-y-3 pr-2">
              {formData.collectors.map((collector, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Collector {index + 1}</span>
                    {formData.collectors.length > 1 && (
                      <Button 
                        type="button" 
                        onClick={() => removeCollector(index)} 
                        size="sm" 
                        variant="outline"
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Collector Name</Label>
                      <Select 
                        value={collector.name} 
                        onValueChange={(value) => updateCollector(index, "name", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select collector" />
                        </SelectTrigger>
                        <SelectContent>
                          {collectors.map((collectorName) => (
                            <SelectItem key={collectorName} value={collectorName}>
                              {collectorName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-xs">Payment Type</Label>
                      <Select 
                        value={collector.type} 
                        onValueChange={(value) => updateCollector(index, "type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Zakat">Zakat</SelectItem>
                          <SelectItem value="Sadqa">Sadqa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-xs">Amount (PKR)</Label>
                      <Input
                        type="number"
                        value={collector.amount}
                        onChange={(e) => updateCollector(index, "amount", e.target.value)}
                        placeholder="Amount"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Remaining Balance display */}
            <div className={`flex items-center justify-between mt-2 px-3 py-2 rounded ${remainingBalance < 0 ? 'bg-red-100 text-red-800' : remainingBalance > 0 ? 'bg-yellow-50 text-yellow-800' : 'bg-green-50 text-green-800'}`}>
              <div className="text-sm">Remaining Balance</div>
              <div className="font-medium">
                {new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", minimumFractionDigits: 0 }).format(remainingBalance)}
              </div>
            </div>
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