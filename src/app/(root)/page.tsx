import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const session = await auth()

  return (
    <div>
      {session ? (
        <>
          <h1>{JSON.stringify(session.user, null, 2)}</h1>
          <Button
            onClick={async () => {
              "use server"
              await signOut({
                redirectTo: "/auth",
              })
            }}
          >
            Logout
          </Button>
        </>
      ) : (
        <h1>Please sign in</h1>
      )}
    </div>
  )
}
