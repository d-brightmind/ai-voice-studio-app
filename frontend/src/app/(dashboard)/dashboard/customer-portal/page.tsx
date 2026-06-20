import CustomerPortalRedirect from "@/components/sidebar/customerportalredirect";
import { auth } from "@/lib/auth";
import { redirect } from "next/dist/client/components/navigation";
import { headers } from "next/dist/server/request/headers";


export default async function Page() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        redirect("/auth/sign-in");
    }
    return <CustomerPortalRedirect />;
}
