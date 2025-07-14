import { clerkClient } from "@clerk/nextjs/server";
import { removeRole, setRole } from "./actions";

function getLastActiveDisplay(timestamp?: number) {
  if (!timestamp) return "Never";

  const now = Date.now();
  const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));

  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60) return `${diffInMinutes} minute(s) ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hour(s) ago`;
  return `${Math.floor(diffInMinutes / 1440)} day(s) ago`;
}

export default async function Admin() {
  const client = await clerkClient();

  const users = (await client.users.getUserList()).data;

  return (
    <>
      {users.map((user) => {
        const lastActiveAt = user.lastActiveAt || undefined; // sometimes it's camelCase or snake_case
        const lastActiveDisplay = getLastActiveDisplay(user.lastActiveAt || undefined);

        return (
          <div
            key={user.id}
            className={`flex items-center justify-between gap-4 p-4 ${
              users.indexOf(user) % 2 === 0
                ? "bg-neutral-50 dark:bg-neutral-800"
                : "bg-white dark:bg-neutral-900"
            }`}
          >
            <div className="flex flex-col gap-1 dark:text-neutral-200">
              <div className="flex gap-8">
                <div>
                  {user.firstName} {user.lastName}
                </div>

                <div>
                  {
                    user.emailAddresses.find(
                      (email) => email.id === user.primaryEmailAddressId
                    )?.emailAddress
                  }
                </div>

                <div>{user.publicMetadata.role as string}</div>
              </div>

              <div className="text-sm text-neutral-500 dark:text-neutral-400">
                Last Active: {getLastActiveDisplay(user.lastActiveAt || undefined)}
              </div>
            </div>

            <div className="flex gap-2">
              <form action={setRole} className="inline">
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="admin" name="role" />
                <button
                  type="submit"
                  className="px-2 py-1 text-sm border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
                >
                  Make Admin
                </button>
              </form>

              <form action={setRole} className="inline">
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="moderator" name="role" />
                <button
                  type="submit"
                  className="px-2 py-1 text-sm border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
                >
                  Make Moderator
                </button>
              </form>

              <form action={removeRole} className="inline">
                <input type="hidden" value={user.id} name="id" />
                <button
                  type="submit"
                  className="px-2 py-1 text-sm border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
                >
                  Remove Role
                </button>
              </form>
            </div>
          </div>
        );
      })}
    </>
  );
}
