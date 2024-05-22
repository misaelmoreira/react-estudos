import { signIn, signOut, useSession } from "next-auth/react"
import React from "react"
import { Button } from "../button/button"

export const LoginButton: React.FC = () => {
    const { data: session } = useSession()
    if (session) {
      return (
        <>
          Olá {session?.user?.email} <br />
          <Button onClick={() => signOut()}>Sair</Button>
        </>
      )
    }
    return (
      <>
        <Button onClick={() => signIn()}>Entrar</Button>
      </>
    )
}