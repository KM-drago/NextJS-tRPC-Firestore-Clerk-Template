import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

/**
 * Webhooks for Clerk
 * Provide CLERK_WEBHOOK_SECRET in .env file
 *
 * When certain events (ie: user creation, deletion) happen with users in Clerk webhooks are fired.
 * To fire webhook events first you need to configure an endpoint in Clerk Dashboard/Configure/Webhooks.
 * Go to https://dashboard.clerk.com and go to configure and you can see Webhooks in left side menu in Developers section.
 *
 * Here those webhooks are handled.
 *
 * For more info: https://clerk.com/docs/integrations/webhooks/overview
 *
 * For testing in local environments ngrok (https://ngrok.com/) or localtunner (https://theboroer.github.io/localtunnel-www/) is needed.
 * This is to redirect the clerk webhook trafic to your local environment.
 * Here is guide from Clerk: https://clerk.com/docs/integrations/webhooks/sync-data
 */

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Error" }, { status: 405 });
  }

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook secret not found!");
  }

  const payload = await req.json();
  const payloadString = JSON.stringify(payload);
  const headerPayload = headers();

  const svix_id = headerPayload.get("svix-id") as string;
  const svix_timestamp = headerPayload.get("svix-timestamp") as string;
  const svix_signature = headerPayload.get("svix-signature") as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "error occured - no svix headers" }, { status: 400 });
  }

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Notice Webhook verification with svix
  try {
    evt = wh.verify(payloadString, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook: ", err);
    return NextResponse.json({ Error: err }, { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  // Switch statement to hanlde various webhook even types
  switch (eventType) {
    case "user.created": {
      try {
        /**
         * Webhook event user.created has occured
         * Do the neccesary actions.
         * ie: create a user document in firestore.
         */
        return NextResponse.json({ response: "Success" }, { status: 200 });
      } catch (err) {
        console.error("Error: ", err);
        return NextResponse.json({ Error: "Error" }, { status: 400 });
      }
    }
    case "user.deleted": {
      try {
        /**
         * Webhook event user.created has occured
         * Do the neccesary actions.
         * ie: Delete the user document in firestore.
         */
        return NextResponse.json({ response: "Success" }, { status: 200 });
      } catch (err) {
        console.error("Error: ", err);
        return NextResponse.json({ Error: "Error" }, { status: 400 });
      }
    }

    default: {
      console.error(`The event type: ${eventType} is not configured`);
      return NextResponse.json({ response: "Success" }, { status: 200 });
    }
  }
}
