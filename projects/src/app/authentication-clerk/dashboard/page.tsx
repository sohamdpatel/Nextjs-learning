import { auth, currentUser } from "@clerk/nextjs/server";


export default async function DashboardPage() {

    const authObj = await auth();
    const user = await currentUser();

    console.log("Auth Object:", authObj);
    console.log("Current User:", user);
    
  return (
    <div>
      <h1>Authentication Clerk Dashboard</h1>
      <p>This is the dashboard for managing user authentication.</p>
    </div>
  );
}