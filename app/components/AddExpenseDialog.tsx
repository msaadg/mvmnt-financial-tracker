import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/app/hooks/use-toast";
import { collectors } from "@/app/data/sampleData";

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
  triggerButton?: React.ReactNode;
}

const AddExpenseDialog = ({ expense, onSubmit, triggerButton }: AddExpenseDialogProps) => {
  const [open, setOpen] = useState(false);
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
  const { toast } = useToast();

  const vendors = [
    "Office Supplies Co.",
    "Utility Company",
    "Marketing Agency",
    "Tech Solutions",
    "Catering Services"
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const action = expense ? "updated" : "added";
    const submissionData: Expense = {
      ...formData,
      amount: parseFloat(formData.amount) || 0,
      collectors: formData.collectors.map(c => ({
        ...c,
        amount: parseFloat(c.amount) || 0
      }))
    };
    onSubmit?.(submissionData);
    
    toast({
      title: `Expense ${action}`,
      description: `The expense has been successfully ${action}.`,
    });
    
    setOpen(false);
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
              <Select value={formData.vendorName} onValueChange={(value) => setFormData({...formData, vendorName: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select or type vendor/project name" />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor} value={vendor}>{vendor}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="programs">Programs</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Expense description..."
              required
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

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {expense ? "Update Expense" : "Add Expense"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseDialog;