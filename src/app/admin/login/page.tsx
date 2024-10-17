"use client";

import { useDocumentVisibility, useThrottleEffect } from "ahooks";
import { useEffect, useLayoutEffect } from "react";

export default function LoginPage() {

  useThrottleEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('login page', window.config);
    }
  }, [],{
    wait:100
  });
  

  return (
    <div>Login Page</div>
  )
} 