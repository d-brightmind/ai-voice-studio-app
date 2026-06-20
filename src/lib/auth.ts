import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { env } from "~/env";
import { db } from "@/server/db";
// If your Prisma file is located elsewhere, you can change the path

const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: "sandbox"
})

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
     emailAndPassword: { 
    enabled: true, 
  }, 

    plugins: [
            polar({
                client: polarClient,
                createCustomerOnSignUp: true,
                use: [
                    checkout({
                        products: [
                            {
                            productId: "f0f1fb50-8f14-4ed8-ad8a-3eaa3402545a",
                            slug: "small",
                            },
                            {
                            productId: "b7a2c644-02d3-4c6c-8723-917dbe1bbcd1",
                            slug: "medium",
                            },
                            {
                            productId: "2cb38766-a54a-4f9e-b9f2-9a77e4f0e472",
                            slug: "large",
                            },
                        ],
                        successUrl: "/success?checkout_id={CHECKOUT_ID}",
                        authenticatedUsersOnly: true
                    }),
                    portal(),
                    usage(),
                    webhooks({
                        secret: env.POLAR_WEBHOOK_SECRET,
                        onCustomerStateChanged: async (payload) => {
                            // Triggered when anything regarding a customer changes
                            console.log(payload);
                        },
                        onOrderPaid: async (order) => {
                            const externalCustomerId = order.data.customer.externalId;

                            if (!externalCustomerId) {
                                console.error("No external customer ID found.");
                                throw new Error("No external customer id found.");
                            }

                            const productId = order.data.productId;

                            let creditsToAdd = 0;

                            switch (productId) {
                                case "f0f1fb50-8f14-4ed8-ad8a-3eaa3402545a":
                                    creditsToAdd = 50;
                                    break;
                                case "b7a2c644-02d3-4c6c-8723-917dbe1bbcd1":
                                    creditsToAdd = 200;
                                    break;
                                case "2cb38766-a54a-4f9e-b9f2-9a77e4f0e472":
                                    creditsToAdd = 400;
                                    break;
                            }

                            await db.user.update({
                                where: { id: externalCustomerId },
                                data: {
                                    credits: {
                                        increment: creditsToAdd,
                                    },
                                },
                            });
                        },
                        onPayload: async (payload) => {
                            // Catch-all for all events
                            console.log(payload);
                        },
                    })
                ],
            })
        ]
  
});