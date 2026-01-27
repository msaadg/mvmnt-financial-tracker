"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { DollarSign, CreditCard, TrendingUp, TrendingDown, FileText, Eye, Trophy, Medal, Loader2 } from "lucide-react";
import AddDonationDialog from "@/app/components/AddDonationDialog";
import AddExpenseDialog from "@/app/components/AddExpenseDialog";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";

export const Dashboard = () => {
  return (
  <SessionProvider>
    <DashboardContent />;
  </SessionProvider>
  );
}

const DashboardContent = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const isAdmin = !!(session?.user as any)?.role && (session?.user as any).role === "admin";
  
  // Separate state for each component
  const [donationStats, setDonationStats] = useState<any>(null);
  const [donationStatsLoading, setDonationStatsLoading] = useState(true);
  
  const [expenseStats, setExpenseStats] = useState<any>(null);
  const [expenseStatsLoading, setExpenseStatsLoading] = useState(true);
  
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  
  const [referralLeaderboard, setReferralLeaderboard] = useState<any[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

  useEffect(() => {
    // Fetch all data in parallel on mount
    fetchDonationStats();
    fetchExpenseStats();
    fetchRecentTransactions();
    fetchReferralLeaderboard();
  }, []);

  const fetchDonationStats = async () => {
    try {
      setDonationStatsLoading(true);
      const response = await axios.get('/api/dashboard/donations');
      setDonationStats(response.data);
    } catch (error) {
      console.error('Failed to fetch donation stats:', error);
    } finally {
      setDonationStatsLoading(false);
    }
  };

  const fetchExpenseStats = async () => {
    try {
      setExpenseStatsLoading(true);
      const response = await axios.get('/api/dashboard/expenses');
      setExpenseStats(response.data);
    } catch (error) {
      console.error('Failed to fetch expense stats:', error);
    } finally {
      setExpenseStatsLoading(false);
    }
  };

  const fetchRecentTransactions = async () => {
    try {
      setTransactionsLoading(true);
      const response = await axios.get('/api/dashboard/transactions');
      setRecentTransactions(response.data.recentTransactions);
    } catch (error) {
      console.error('Failed to fetch recent transactions:', error);
    } finally {
      setTransactionsLoading(false);
    }
  };

  const fetchReferralLeaderboard = async () => {
    try {
      setLeaderboardLoading(true);
      const response = await axios.get('/api/dashboard/leaderboard');
      setReferralLeaderboard(response.data.referralLeaderboard);
    } catch (error) {
      console.error('Failed to fetch referral leaderboard:', error);
    } finally {
      setLeaderboardLoading(false);
    }
  };

  // Refresh functions for when donations/expenses are added
  const handleDonationAdded = () => {
    fetchDonationStats();
    fetchRecentTransactions();
    fetchReferralLeaderboard();
  };

  const handleExpenseAdded = () => {
    fetchExpenseStats();
    fetchRecentTransactions();
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate net flow from both stats
  const netFlow = (donationStats?.totalDonations || 0) - (expenseStats?.totalExpenses || 0);
  
  // Calculate net flow trend (simple calculation based on individual trends)
  const donationTrendValue = donationStats?.donationTrend ? parseFloat(donationStats.donationTrend) : 0;
  const expenseTrendValue = expenseStats?.expenseTrend ? parseFloat(expenseStats.expenseTrend) : 0;
  const netFlowTrendValue = donationTrendValue - expenseTrendValue;
  const netFlowTrend = `${netFlowTrendValue > 0 ? "+" : ""}${netFlowTrendValue.toFixed(1)}%`;

  // Build metrics from both donation and expense stats
  const metrics = (donationStats && expenseStats) ? [
    {
      title: "Total Donated (Last Month)",
      value: formatAmount(donationStats.totalDonations),
      icon: DollarSign,
      trend: donationStats.donationTrend,
      trendValue: parseFloat(donationStats.donationTrend),
      positive: parseFloat(donationStats.donationTrend) >= 0,
      loading: donationStatsLoading,
      isExpense: false,
    },
    {
      title: "Total Expenses (Last Month)",
      value: formatAmount(expenseStats.totalExpenses),
      icon: CreditCard,
      trend: expenseStats.expenseTrend,
      trendValue: parseFloat(expenseStats.expenseTrend),
      // For expenses, negative trend (spending less) is good, positive trend (spending more) is bad
      positive: parseFloat(expenseStats.expenseTrend) < 0,
      loading: expenseStatsLoading,
      isExpense: true,
    },
    {
      title: "Net Flow",
      value: formatAmount(netFlow),
      icon: TrendingUp,
      trend: netFlowTrend,
      trendValue: netFlowTrendValue,
      positive: netFlowTrendValue >= 0,
      loading: donationStatsLoading || expenseStatsLoading,
      isExpense: false,
    },
  ] : [];

  // Format recent transactions
  const formattedTransactions = recentTransactions.map((t: any) => ({
    id: t.id,
    type: t.type,
    donor: t.donor,
    vendor: t.vendor,
    amount: formatAmount(t.amount),
    date: t.date,
    category: t.category,
  }));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Welcome Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Welcome, {isAdmin ? "Admin" : "User"}</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Here&apos;s an overview of your organization&apos;s financial status
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {(donationStatsLoading || expenseStatsLoading) && metrics.length === 0 ? (
          // Loading skeleton for metrics
          <>
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-24 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          metrics.map((metric) => {
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
                  {metric.loading ? (
                    <>
                      <div className="h-8 w-24 bg-muted animate-pulse rounded mb-2" />
                      <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                    </>
                  ) : (
                    <>
                      <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                      <div className="flex items-center mt-2">
                        {metric.isExpense ? (
                          metric.trendValue < 0 ? (
                            <TrendingDown className="h-3 w-3 text-success mr-1" />
                          ) : (
                            <TrendingUp className="h-3 w-3 text-destructive mr-1" />
                          )
                        ) : (
                          metric.positive ? (
                            <TrendingUp className="h-3 w-3 text-success mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-destructive mr-1" />
                          )
                        )}
                        <span
                          className={`text-xs ${
                            metric.positive ? "text-success" : "text-destructive"
                          }`}
                        >
                          {metric.trend} from last month
                        </span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <AddDonationDialog onSubmit={handleDonationAdded} />
            <AddExpenseDialog onSubmit={handleExpenseAdded} />
            <Button variant="outline" className="flex items-center gap-2" onClick={() => router.push("/analytics")}>
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">View Ledger</span>
              <span className="sm:hidden">Ledger</span>
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
          {leaderboardLoading ? (
            // Loading skeleton
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 sm:p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                    <div className="w-8 h-8 bg-muted animate-pulse rounded-full" />
                    <div className="flex-1">
                      <div className="h-4 w-32 bg-muted animate-pulse rounded mb-2" />
                      <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                  <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {referralLeaderboard.slice(0, 5).map((referral: any, index: number) => (
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
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactionsLoading ? (
            // Loading skeleton
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 sm:p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                    <div className="w-8 h-8 bg-muted animate-pulse rounded-full" />
                    <div className="flex-1">
                      <div className="h-4 w-32 bg-muted animate-pulse rounded mb-2" />
                      <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                  <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {formattedTransactions.map((transaction) => (
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
                        {transaction.category} • {new Date(transaction.date).toLocaleDateString('en-GB')}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;