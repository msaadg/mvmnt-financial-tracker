"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import { Search, Loader2, Trash2, Plus, Users, UserPlus, Tags } from "lucide-react";
import { useToast } from "@/app/hooks/use-toast";

interface User {
  id: number;
  email: string;
  username: string;
  role: string;
}

interface Collector {
  collectorId: number;
  name: string;
}

interface Referral {
  referralId: number;
  name: string;
}

export default function Admin() {
  const { toast } = useToast();
  
  // Users state
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);

  // Collectors state
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [collectorsLoading, setCollectorsLoading] = useState(true);
  const [collectorSearchTerm, setCollectorSearchTerm] = useState("");
  const [newCollectorName, setNewCollectorName] = useState("");
  const [addingCollector, setAddingCollector] = useState(false);

  // Referrals state
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referralsLoading, setReferralsLoading] = useState(true);
  const [referralSearchTerm, setReferralSearchTerm] = useState("");
  const [newReferralName, setNewReferralName] = useState("");
  const [addingReferral, setAddingReferral] = useState(false);

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'user' | 'collector' | 'referral'; id: number; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchCollectors();
    fetchReferrals();
  }, []);

  // ===== Users Functions =====
  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      const res = await axios.get("/api/admin/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
      toast({
        title: "Error",
        description: "Could not load users",
        variant: "destructive",
      });
    } finally {
      setUsersLoading(false);
    }
  };

  const handleInvite = async () => {
    if (!inviteEmail || !inviteEmail.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }
    try {
      setInviteLoading(true);
      await axios.post("/api/admin/users", { email: inviteEmail });
      toast({ 
        title: "Success", 
        description: `Invitation sent to ${inviteEmail}` 
      });
      setInviteEmail("");
      fetchUsers();
    } catch (err: any) {
      console.error("Invite failed", err);
      toast({
        title: "Invite failed",
        description: err?.response?.data?.message || "Failed to send invitation",
        variant: "destructive",
      });
    } finally {
      setInviteLoading(false);
    }
  };

  // ===== Collectors Functions =====
  const fetchCollectors = async () => {
    try {
      setCollectorsLoading(true);
      const res = await axios.get("/api/admin/collectors");
      setCollectors(res.data.collectors || []);
    } catch (err) {
      console.error("Failed to fetch collectors", err);
      toast({
        title: "Error",
        description: "Could not load collectors",
        variant: "destructive",
      });
    } finally {
      setCollectorsLoading(false);
    }
  };

  const handleAddCollector = async () => {
    if (!newCollectorName.trim()) {
      toast({
        title: "Invalid name",
        description: "Please enter a collector name",
        variant: "destructive",
      });
      return;
    }
    try {
      setAddingCollector(true);
      await axios.post("/api/admin/collectors", { name: newCollectorName.trim() });
      toast({ 
        title: "Success", 
        description: `Collector "${newCollectorName}" added successfully` 
      });
      setNewCollectorName("");
      fetchCollectors();
    } catch (err: any) {
      console.error("Add collector failed", err);
      toast({
        title: "Failed to add collector",
        description: err?.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setAddingCollector(false);
    }
  };

  // ===== Referrals Functions =====
  const fetchReferrals = async () => {
    try {
      setReferralsLoading(true);
      const res = await axios.get("/api/admin/referrals");
      setReferrals(res.data.referrals || []);
    } catch (err) {
      console.error("Failed to fetch referrals", err);
      toast({
        title: "Error",
        description: "Could not load referrals",
        variant: "destructive",
      });
    } finally {
      setReferralsLoading(false);
    }
  };

  const handleAddReferral = async () => {
    if (!newReferralName.trim()) {
      toast({
        title: "Invalid name",
        description: "Please enter a referral name",
        variant: "destructive",
      });
      return;
    }
    try {
      setAddingReferral(true);
      await axios.post("/api/admin/referrals", { name: newReferralName.trim() });
      toast({ 
        title: "Success", 
        description: `Referral "${newReferralName}" added successfully` 
      });
      setNewReferralName("");
      fetchReferrals();
    } catch (err: any) {
      console.error("Add referral failed", err);
      toast({
        title: "Failed to add referral",
        description: err?.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setAddingReferral(false);
    }
  };

  // ===== Delete Functions =====
  const openDeleteDialog = (type: 'user' | 'collector' | 'referral', id: number, name: string) => {
    setDeleteTarget({ type, id, name });
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      
      if (deleteTarget.type === 'user') {
        await axios.delete("/api/admin/users", { data: { id: deleteTarget.id } });
        toast({ title: "Success", description: `User "${deleteTarget.name}" deleted` });
        fetchUsers();
      } else if (deleteTarget.type === 'collector') {
        await axios.delete("/api/admin/collectors", { data: { id: deleteTarget.id } });
        toast({ title: "Success", description: `Collector "${deleteTarget.name}" deleted` });
        fetchCollectors();
      } else if (deleteTarget.type === 'referral') {
        await axios.delete("/api/admin/referrals", { data: { id: deleteTarget.id } });
        toast({ title: "Success", description: `Referral "${deleteTarget.name}" deleted` });
        fetchReferrals();
      }
      
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
    } catch (err: any) {
      console.error("Delete failed", err);
      toast({
        title: "Delete failed",
        description: err?.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  // Filtered lists
  const filteredUsers = users.filter((u) =>
    (u.username || "").toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const filteredCollectors = collectors.filter((c) =>
    c.name.toLowerCase().includes(collectorSearchTerm.toLowerCase())
  );

  const filteredReferrals = referrals.filter((r) =>
    r.name.toLowerCase().includes(referralSearchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage users, collectors, and referrals for your organization
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="collectors" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span>Collectors</span>
          </TabsTrigger>
          <TabsTrigger value="referrals" className="flex items-center gap-2">
            <Tags className="h-4 w-4" />
            <span>Referrals</span>
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Invite new users and manage existing user accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Invite Form */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Enter email to invite..."
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleInvite} 
                  disabled={inviteLoading}
                  className="sm:w-auto"
                >
                  {inviteLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Invite User
                    </>
                  )}
                </Button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name or email..."
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Users Table */}
              {usersLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="border rounded-lg max-h-[400px] overflow-y-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-background">
                      <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.username}</TableCell>
                          <TableCell className="text-muted-foreground">{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openDeleteDialog('user', user.id, user.username)}
                              disabled={user.role === 'admin'}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredUsers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                            No users found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Collectors Tab */}
        <TabsContent value="collectors">
          <Card>
            <CardHeader>
              <CardTitle>Manage Collectors</CardTitle>
              <CardDescription>
                Add and manage collectors who process donations and expenses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Form */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Enter collector name..."
                  value={newCollectorName}
                  onChange={(e) => setNewCollectorName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCollector()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAddCollector} 
                  disabled={addingCollector}
                  className="sm:w-auto"
                >
                  {addingCollector ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Collector
                    </>
                  )}
                </Button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search collectors..."
                  value={collectorSearchTerm}
                  onChange={(e) => setCollectorSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Collectors Table */}
              {collectorsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="border rounded-lg max-h-[400px] overflow-y-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-background">
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Collector Name</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCollectors.map((collector) => (
                        <TableRow key={collector.collectorId}>
                          <TableCell className="text-muted-foreground">#{collector.collectorId}</TableCell>
                          <TableCell className="font-medium">{collector.name}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openDeleteDialog('collector', collector.collectorId, collector.name)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredCollectors.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                            No collectors found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Referrals Tab */}
        <TabsContent value="referrals">
          <Card>
            <CardHeader>
              <CardTitle>Manage Referrals</CardTitle>
              <CardDescription>
                Add and manage referral sources for donations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Form */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Enter referral name..."
                  value={newReferralName}
                  onChange={(e) => setNewReferralName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddReferral()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAddReferral} 
                  disabled={addingReferral}
                  className="sm:w-auto"
                >
                  {addingReferral ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Referral
                    </>
                  )}
                </Button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search referrals..."
                  value={referralSearchTerm}
                  onChange={(e) => setReferralSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Referrals Table */}
              {referralsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="border rounded-lg max-h-[400px] overflow-y-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-background">
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Referral Name</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReferrals.map((referral) => (
                        <TableRow key={referral.referralId}>
                          <TableCell className="text-muted-foreground">#{referral.referralId}</TableCell>
                          <TableCell className="font-medium">{referral.name}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openDeleteDialog('referral', referral.referralId, referral.name)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredReferrals.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                            No referrals found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{deleteTarget?.name}</strong>.
              {deleteTarget?.type === 'collector' && ' This action cannot be undone if the collector has associated donations or payments.'}
              {deleteTarget?.type === 'referral' && ' This action cannot be undone if the referral has associated donations.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
