export const metadata = {
  title: 'Blog',
};

export default async function Page() {
  // Simulate server-side delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div>
      <h1>My Blog Page</h1>
    </div>
  );
}
