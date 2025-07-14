'use client';
import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
export default function Counter() {
    const [counter, setCounter] = useState(0);
    // const  { isLoaded, isSignedIn, user } = useUser();
    const {isLoaded, userId, sessionId, getToken} = useAuth();
    if (!isLoaded || !userId) {return <div>Loading...</div>; }
  return (
    <div className="flex justify-center items-center flex-col h-screen">
        <h1>Counterr</h1>
      <h1 className="text-2xl font-bold">Counter {counter}</h1>
      <button onClick={() => setCounter(counter+1)}>Increment</button>
    </div>
  );
}