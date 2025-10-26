"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Search, Loader2, Trash2, Plus } from "lucide-react";
import { useToast } from "@/app/hooks/use-toast";

export default function Users() {
  const { toast } = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Invite form state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("/api/admin/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setError("Failed to load users");
      toast({
        title: "Error",
        description: "Could not load users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
      toast({ title: "Invited", description: `Invite sent to ${inviteEmail}` });
      setInviteEmail("");
      fetchUsers();
    } catch (err: any) {
      console.error("Invite failed", err);
      toast({
        title: "Invite failed",
        description: err?.response?.data?.message || String(err),
        variant: "destructive",
      });
    } finally {
      setInviteLoading(false);
    }
  };

  const handleDelete = async (id: number, username?: string, role?: string) => {
    if (!confirm(`Delete user ${username || id}? This cannot be undone.`)) return;
    try {
      setLoading(true);
      await axios.delete("/api/admin/users", { data: { id } });
      toast({ title: "Deleted", description: `User ${username || id} removed` });
      fetchUsers();
    } catch (err: any) {
      console.error("Delete failed", err);
      const msg = err?.response?.data?.message || String(err);
      toast({ title: "Delete failed", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter((u) =>
    (u.username || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={fetchUsers}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">User Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage application users and roles
          </p>
        </div>

        {/* Invite form */}
        <div className="w-full sm:w-auto flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Input
              className="pl-3"
              placeholder="Invite by email..."
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
          </div>
          <Button onClick={handleInvite} disabled={inviteLoading} className="flex items-center gap-2">
            {inviteLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            <span>Invite</span>
          </Button>
        </div>

        <div className="w-full sm:w-auto flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search by username or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
            }}
          >
            Clear
          </Button>
        </div>
      </div>

      <div className="grid gap-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.username}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {u.email}
                </TableCell>
                <TableCell>
                  <Badge className="text-xs">
                    {String(u.role || "user")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(u.id, u.username, u.role)} disabled={u.role !== "user"}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
