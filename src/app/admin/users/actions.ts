"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { User } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
});

type SafeUser = {
  id: string;
  username: string | null;
  emailAddress: string | null;
};

export async function getUsers() {
  try {
    const clerk = await clerkClient();
    const response = await clerk.users.getUserList();
    
    const safeUsers: SafeUser[] = response.data.map(user => ({
      id: user.id,
      username: user.username,
      emailAddress: user.emailAddresses[0]?.emailAddress || null,
    }));

    return { users: safeUsers, error: null };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], error: "Failed to fetch users" };
  }
}

export async function createUser(data: z.infer<typeof createUserSchema>) {
  try {
    // Validate input
    const validatedData = createUserSchema.parse(data);

    const clerk = await clerkClient();
    
    // Check if email already exists
    const existingUsers = await clerk.users.getUserList({
      emailAddress: [validatedData.email],
    });
    
    if (existingUsers.length > 0) {
      return { 
        success: false, 
        error: "A user with this email already exists" 
      };
    }

    // Create the user
    await clerk.users.createUser({
      emailAddress: [validatedData.email],
      password: validatedData.password,
      username: validatedData.username,
      publicMetadata: { role: "admin" }
    });

    return { success: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.errors.map(e => e.message).join(", ") 
      };
    }
    
    console.error("Error creating user:", error);
    return { 
      success: false, 
      error: "Failed to create user. Please try again." 
    };
  }
}

export async function deleteUser(userId: string) {
  try {
    const clerk = await clerkClient();
    await clerk.users.deleteUser(userId);
    return { success: true, error: null };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { 
      success: false, 
      error: "Failed to delete user. Please try again." 
    };
  }
}

export async function updateUserRole(userId: string, role: string) {
  const { userId: currentUserId } = await auth();
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }

  // Check if current user is admin
  const clerk = await clerkClient(); 
  const currentUser = await clerk.users.getUser(currentUserId);
  if (currentUser.publicMetadata.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }

  // Update the user's role
  await clerk.users.updateUser(userId, {
    publicMetadata: { role },
  });

  // Revalidate the users page
  revalidatePath("/admin/users");
} 