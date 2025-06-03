"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { createUser, deleteUser, getUsers } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

type SafeUser = {
  id: string;
  username: string | null;
  emailAddress: string | null;
};

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newUser, setNewUser] = useState({ email: "", password: "", username: "" });
  const [userToDelete, setUserToDelete] = useState<SafeUser | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchUsers = async () => {
      const { users, error } = await getUsers();
      if (!error) {
        setUsers(users);
      } else {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      }
      setIsLoading(false);
    };
    fetchUsers();
  }, [toast]);

  const handleCreateUser = async () => {
    setIsCreating(true);
    setFormErrors({});
    
    try {
      const { success, error } = await createUser(newUser);
      if (success) {
        const { users } = await getUsers();
        setUsers(users);
        setNewUser({ email: "", password: "", username: "" });
        toast({
          title: "Success",
          description: "User created successfully",
        });
      } else {
        setFormErrors({ submit: error || "Failed to create user" });
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    setIsDeleting(userToDelete.id);
    try {
      const { success, error } = await deleteUser(userToDelete.id);
      if (success) {
        setUsers(users.filter(user => user.id !== userToDelete.id));
        toast({
          title: "Success",
          description: "User deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(null);
      setUserToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow sm:rounded-lg p-6">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/admin"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Link>
        </div>
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Create User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogDescription>
                      Create a new admin user. The user will be able to access the admin panel.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className={formErrors.email ? "border-red-500" : ""}
                      />
                      {formErrors.email && (
                        <p className="text-sm text-red-500">{formErrors.email}</p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="username">Username (optional)</Label>
                      <Input
                        id="username"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        className={formErrors.username ? "border-red-500" : ""}
                      />
                      {formErrors.username && (
                        <p className="text-sm text-red-500">{formErrors.username}</p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        className={formErrors.password ? "border-red-500" : ""}
                      />
                      {formErrors.password && (
                        <p className="text-sm text-red-500">{formErrors.password}</p>
                      )}
                    </div>
                    {formErrors.submit && (
                      <p className="text-sm text-red-500">{formErrors.submit}</p>
                    )}
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleCreateUser}
                      disabled={isCreating || !newUser.email || !newUser.password}
                    >
                      {isCreating ? "Creating..." : "Create User"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.username || "No username"}
                    </TableCell>
                    <TableCell>{user.emailAddress}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setUserToDelete(user)}
                        disabled={isDeleting === user.id}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user
              {userToDelete?.username ? ` ${userToDelete.username}` : ""}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 