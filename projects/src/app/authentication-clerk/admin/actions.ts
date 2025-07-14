'use server';


import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function setRole(formData: FormData) {
    const {sessionClaims} = await auth();
    if(sessionClaims?.metadata?.role !== "admin") {
        throw new Error("Unauthorized: Only admins can set roles");
    }

  const userId = formData.get("id") as string;
  const role = formData.get("role") as string;

  if (!userId || !role) {
    throw new Error("User ID and role are required");
  }

  const client = await clerkClient();
  try {
    // Assuming you have a function to update user metadata
    await client.users.updateUser(userId, {
      publicMetadata: {
        role
      },
    });
    revalidatePath("/authentication-clerk/admin");

  } catch (error) {
    console.error("Error updating role:", error);
    throw new Error("Failed to update role");
  }
}

export async function removeRole(formData: FormData) {
  const {sessionClaims} = await auth();
  if(sessionClaims?.metadata?.role !== "admin") {
      throw new Error("Unauthorized: Only admins can remove roles");
  }

  const userId = formData.get("id") as string;

  if (!userId) {
    throw new Error("User ID is required");
  }

  const client = await clerkClient();
  try {
    // Assuming you have a function to update user metadata
    await client.users.updateUser(userId, {
      publicMetadata: {
        role: null
      },
    });
    revalidatePath("/authentication-clerk/admin");
  } catch (error) {
    console.error("Error removing role:", error);
    throw new Error("Failed to remove role");
  }
}