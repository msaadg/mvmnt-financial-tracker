"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { DollarSign, CreditCard, TrendingUp, TrendingDown, FileText, Eye, Trophy, Medal } from "lucide-react";
import AddDonationDialog from "@/app/components/AddDonationDialog";
import AddExpenseDialog from "@/app/components/AddExpenseDialog";
import { useRouter } from "next/navigation";
import { sampleDonations, referrals } from "@/app/data/sampleData";

const Dashboard = () => {
  const router = useRouter();

  // Calculate referral leaderboard
  const referralData = referrals.map(referral => {
    const referralDonations = sampleDonations.filter(d => 
      d.referral === referral && (d.status === "Completed" || d.status === "Complete")
    );
    const totalAmount = referralDonations.reduce((sum, d) => sum + d.amount, 0);
    const donationCount = referralDonations.length;
    
    return {
      name: referral,
      totalAmount,
      donationCount
    };
  }).sort((a, b) => b.totalAmount - a.totalAmount);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const metrics = [
    {
      title: "Total Donated (Last Month)",
      value: "PKR 450,000",
      icon: DollarSign,
      trend: "+12.5%",
      positive: true,
    },
    {
      title: "Total Expenses (Last Month)",
      value: "PKR 280,000",
      icon: CreditCard,
      trend: "+8.2%",
      positive: false,
    },
    {
      title: "Net Flow",
      value: "PKR 170,000",
      icon: TrendingUp,
      trend: "+22.1%",
      positive: true,
    },
  ];

  const recentTransactions = [
    { id: 1, type: "donation", donor: "Ahmed Ali", amount: "PKR 25,000", date: "2024-01-15", category: "Zakat" },
    { id: 2, type: "expense", vendor: "Office Supplies Co.", amount: "PKR 8,500", date: "2024-01-14", category: "Operations" },
    { id: 3, type: "donation", donor: "Fatima Khan", amount: "PKR 15,000", date: "2024-01-13", category: "Sadqa" },
    { id: 4, type: "expense", vendor: "Utility Company", amount: "PKR 12,000", date: "2024-01-12", category: "Utilities" },
    { id: 5, type: "donation", donor: "Muhammad Hassan", amount: "PKR 50,000", date: "2024-01-11", category: "Zakat" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Welcome Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Welcome, Admin</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Here&apos;s an overview of your organization&apos;s financial status
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <div className="flex items-center mt-2">
                  {metric.positive ? (
                    <TrendingUp className="h-3 w-3 text-success mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-destructive mr-1" />
                  )}
                  <span
                    className={`text-xs ${
                      metric.positive ? "text-success" : "text-destructive"
                    }`}
                  >
                    {metric.trend} from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <AddDonationDialog />
            <AddExpenseDialog />
            <Button variant="outline" className="flex items-center gap-2" onClick={() => router.push("/analytics")}>
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">View Ledger</span>
              <span className="sm:hidden">Ledger</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={() => router.push("/analytics")}>
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Generate Report</span>
              <span className="sm:hidden">Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Referral Leaderboard */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Referral Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {referralData.slice(0, 5).map((referral, index) => (
              <div
                key={referral.name}
                className="flex items-center justify-between p-3 sm:p-4 border border-border rounded-lg"
              >
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                  <div className={`p-1.5 sm:p-2 rounded-full flex-shrink-0 ${
                    index === 0 ? "bg-yellow-100 text-yellow-600" :
                    index === 1 ? "bg-gray-100 text-gray-600" :
                    index === 2 ? "bg-orange-100 text-orange-600" :
                    "bg-blue-100 text-blue-600"
                  }`}>
                    {index === 0 ? <Trophy className="h-3 w-3 sm:h-4 sm:w-4" /> : 
                     index === 1 || index === 2 ? <Medal className="h-3 w-3 sm:h-4 sm:w-4" /> :
                     <span className="text-xs sm:text-sm font-bold">#{index + 1}</span>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground text-sm sm:text-base truncate">{referral.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {`${referral.donationCount} donation${referral.donationCount !== 1 ? 's' : ''}`}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-medium text-success text-sm sm:text-base">
                    {formatAmount(referral.totalAmount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 sm:p-4 border border-border rounded-lg"
              >
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                  <div
                    className={`p-1.5 sm:p-2 rounded-full flex-shrink-0 ${
                      transaction.type === "donation"
                        ? "bg-success-light text-success"
                        : "bg-destructive-light text-destructive"
                    }`}
                  >
                    {transaction.type === "donation" ? (
                      <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                      <CreditCard className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground text-sm sm:text-base truncate">
                      {transaction.type === "donation" ? transaction.donor : transaction.vendor}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div
                  className={`font-medium text-sm sm:text-base flex-shrink-0 ${
                    transaction.type === "donation" ? "text-success" : "text-destructive"
                  }`}
                >
                  {transaction.type === "donation" ? "+" : "-"}{transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;