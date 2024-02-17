"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <SnackbarProvider>{children}</SnackbarProvider>
    </SessionProvider>
  );
};

export default Provider;
