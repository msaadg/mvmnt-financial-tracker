"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Loader2, DollarSign } from "lucide-react";
import { useToast } from "@/app/hooks/use-toast";
import axios from "axios";

interface PaymentDialogProps {
  vendorName?: string;
  payment?: {
    id: number;
    vendorName: string;
    collector: string;
    type: string;
    amount: number;
    date: string;
    paymentMethod: string;
  } | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: () => void;
  triggerButton?: React.ReactNode;
}

export default function PaymentDialog({
  vendorName: initialVendorName,
  payment,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onSubmit,
  triggerButton,
}: PaymentDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [collectors, setCollectors] = useState<string[]>([]);
  const { toast } = useToast();

  // Form state
  const [vendorName, setVendorName] = useState(payment?.vendorName || initialVendorName || "");
  const [collector, setCollector] = useState(payment?.collector || "");
  const [type, setType] = useState(payment?.type || "zakat");
  const [amount, setAmount] = useState(payment?.amount?.toString() || "");
  const [paymentMethod, setPaymentMethod] = useState(payment?.paymentMethod || "cash");
  const [date, setDate] = useState(
    payment?.date || new Date().toISOString().split("T")[0]
  );

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : open;
  const handleOpenChange = isControlled ? controlledOnOpenChange : setOpen;

  useEffect(() => {
    fetchCollectors();
  }, []);

  useEffect(() => {
    if (payment) {
      setVendorName(payment.vendorName);
      setCollector(payment.collector);
      setType(payment.type);
      setAmount(payment.amount.toString());
      setPaymentMethod(payment.paymentMethod);
      setDate(payment.date);
    } else if (initialVendorName) {
      setVendorName(initialVendorName);
    }
  }, [payment, initialVendorName]);

  const fetchCollectors = async () => {
    try {
      const response = await axios.get("/api/collectors");
      setCollectors(response.data.collectors || []);
    } catch (err) {
      console.error("Failed to fetch collectors:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!vendorName || !collector || !amount) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const paymentData = {
        id: payment?.id,
        vendorName,
        collector,
        type,
        amount: parseFloat(amount),
        date,
        paymentMethod,
      };

      if (payment?.id) {
        // Update existing payment
        await axios.put("/api/payments", paymentData);
        toast({
          title: "Payment Updated",
          description: "Payment has been successfully updated.",
        });
      } else {
        // Create new payment
        await axios.post("/api/payments", paymentData);
        toast({
          title: "Payment Created",
          description: "Payment has been successfully recorded.",
        });
      }

      // Reset form
      if (!payment) {
        setVendorName(initialVendorName || "");
        setCollector("");
        setType("zakat");
        setAmount("");
        setPaymentMethod("cash");
        setDate(new Date().toISOString().split("T")[0]);
      }

      handleOpenChange?.(false);
      onSubmit?.();
    } catch (error) {
      console.error("Error saving payment:", error);
      toast({
        title: "Error",
        description: axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to save payment"
          : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const DialogComponent = (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {triggerButton && <DialogTrigger asChild>{triggerButton}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {payment ? "Edit Payment" : "Record Payment"}
          </DialogTitle>
          <DialogDescription>
            {payment
              ? "Update payment details below."
              : "Record a new payment to vendor."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Vendor Name */}
            <div className="grid gap-2">
              <Label htmlFor="vendor">Vendor Name</Label>
              <Input
                id="vendor"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                disabled={!!initialVendorName || !!payment}
                required
              />
            </div>

            {/* Collector */}
            <div className="grid gap-2">
              <Label htmlFor="collector">Collector</Label>
              <Select value={collector} onValueChange={setCollector} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select collector" />
                </SelectTrigger>
                <SelectContent>
                  {collectors.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount (PKR)</Label>
              <Input
                id="amount"
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </div>

            {/* Payment Type */}
            <div className="grid gap-2">
              <Label>Payment Type</Label>
              <RadioGroup value={type} onValueChange={setType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="zakat" id="zakat" />
                  <Label htmlFor="zakat" className="font-normal cursor-pointer">
                    Zakat
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sadqa" id="sadqa" />
                  <Label htmlFor="sadqa" className="font-normal cursor-pointer">
                    Sadqa
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Payment Method */}
            <div className="grid gap-2">
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="font-normal cursor-pointer">
                    Cash
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online" className="font-normal cursor-pointer">
                    Online
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Date */}
            <div className="grid gap-2">
              <Label htmlFor="date">Payment Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange?.(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <DollarSign className="mr-2 h-4 w-4" />
                  {payment ? "Update Payment" : "Record Payment"}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );

  return DialogComponent;
}
