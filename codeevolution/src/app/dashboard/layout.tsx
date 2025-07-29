


export default  function AuthLayout({
  children,
  notification,
  revenue,
  users,
  login
}: {
  children: React.ReactNode,
  notification: React.ReactNode,
  revenue: React.ReactNode,
  users: React.ReactNode,
  login: React.ReactNode
}) {
  const isLoggedIn = true; // Replace with actual authentication logic
  return isLoggedIn ? (
    <div className=" h-screen">                         
      {children}
      <div>{notification}</div>
      <div>{revenue}</div>
      <div>{users}</div>
      
    </div>
  ) : (
    <div className=" h-screen flex items-center justify-center">
      {login}
    </div>
  );
}
