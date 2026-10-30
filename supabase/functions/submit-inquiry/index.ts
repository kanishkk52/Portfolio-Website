// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
//   "Access-Control-Allow-Methods": "POST, OPTIONS",
// };

// const jsonResponse = (body: unknown, status = 200) =>
//   new Response(JSON.stringify(body), {
//     status,
//     headers: {
//       ...corsHeaders,
//       "Content-Type": "application/json",
//     },
//   });

// const clean = (value: unknown, maxLength = 5000): string | null => {
//   if (typeof value !== "string") return null;
//   const trimmed = value.trim();
//   return trimmed ? trimmed.slice(0, maxLength) : null;
// };

// const escapeHtml = (value: string) =>
//   value.replace(/[&<>"']/g, (char) => {
//     const entities: Record<string, string> = {
//       "&": "&amp;",
//       "<": "&lt;",
//       ">": "&gt;",
//       '"': "&quot;",
//       "'": "&#39;",
//     };
//     return entities[char];
//   });

// Deno.serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   if (req.method !== "POST") {
//     return jsonResponse({ error: "Method not allowed." }, 405);
//   }

//   try {
//     const body = await req.json();

//     // Hidden honeypot field for basic bot filtering.
//     if (body.honeypot) {
//       return jsonResponse({ success: true });
//     }

//     const name = clean(body.name, 120);
//     const email = clean(body.email, 254);
//     const projectDescription = clean(body.projectDescription, 10000);

//     if (!name || !email || !projectDescription) {
//       return jsonResponse(
//         { error: "Please complete all required fields." },
//         400
//       );
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       return jsonResponse({ error: "Please enter a valid email." }, 400);
//     }

//     const projectType =
//       body.projectType === "company" ? "company" : "personal";

//     const company =
//       projectType === "company" ? clean(body.company, 200) : null;

//     if (projectType === "company" && !company) {
//       return jsonResponse(
//         { error: "Please enter your company or brand name." },
//         400
//       );
//     }

//     const services = Array.isArray(body.services)
//       ? body.services.filter((x: unknown) => typeof x === "string").slice(0, 20)
//       : [];

//     const deliverables = Array.isArray(body.deliverables)
//       ? body.deliverables.filter((x: unknown) => typeof x === "string").slice(0, 20)
//       : [];

//     const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
//     const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
//     const resendApiKey = Deno.env.get("RESEND_API_KEY");
//     const recipient = "kanishkk52@gmail.com";
//     const sender = Deno.env.get("RESEND_FROM_EMAIL");

//     const supabase = createClient(supabaseUrl, serviceRoleKey);

//     // Save the inquiry first. Email delivery must not erase a submission.
//     const { data: inquiry, error: insertError } = await supabase
//       .from("inquiries")
//       .insert({
//         name,
//         email,
//         project_type: projectType,
//         company,
//         website: clean(body.website, 500),
//         services,
//         stage: clean(body.stage, 200),
//         deliverables,
//         project_description: projectDescription,
//         audience: clean(body.audience, 1000),
//         budget: clean(body.budget, 200),
//         timeline: clean(body.timeline, 200),
//         references: clean(body.references, 3000),
//         discovery: clean(body.discovery, 200),
//         additional_notes: clean(body.additionalNotes, 5000),
//       })
//       .select("id")
//       .single();

//     if (insertError || !inquiry) {
//       console.error("Supabase insert error:", insertError);
//       return jsonResponse(
//         { error: "We couldn't save your inquiry. Please try again." },
//         500
//       );
//     }

//     let notificationSent = false;

//     // Send an email notification after the database insert succeeds.
//     if (resendApiKey && sender) {
//       const rows = [
//         ["Name", name],
//         ["Email", email],
//         ["Project type", projectType === "company" ? "Company / Brand" : "Personal"],
//         ["Company / Brand", company || "Personal project"],
//         ["Website", clean(body.website) || "Not provided"],
//         ["Services", services.join(", ") || "Not specified"],
//         ["Project stage", clean(body.stage) || "Not specified"],
//         ["Deliverables", deliverables.join(", ") || "Not specified"],
//         ["Target audience", clean(body.audience) || "Not provided"],
//         ["Budget", clean(body.budget) || "Not specified"],
//         ["Timeline", clean(body.timeline) || "Not specified"],
//         ["References", clean(body.references) || "Not provided"],
//         ["Discovery source", clean(body.discovery) || "Not specified"],
//         ["Additional notes", clean(body.additionalNotes) || "None"],
//       ];

//       const detailsHtml = rows
//         .map(
//           ([label, value]) =>
//             `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`
//         )
//         .join("");

//       const emailResponse = await fetch("https://api.resend.com/emails", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${resendApiKey}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           from: sender,
//           to: [recipient],
//           reply_to: email,
//           subject: `New KK's Canvas inquiry from ${name}`,
//           html: `
//             <div style="font-family:Arial,sans-serif;line-height:1.6;color:#20201e">
//               <h2>New project inquiry</h2>
//               ${detailsHtml}
//               <hr />
//               <h3>Project description</h3>
//               <p>${escapeHtml(projectDescription).replace(/\n/g, "<br>")}</p>
//               <p style="color:#777;font-size:12px">Inquiry ID: ${inquiry.id}</p>
//             </div>
//           `,
//         }),
//       });

//       if (emailResponse.ok) {
//         notificationSent = true;

//         await supabase
//           .from("inquiries")
//           .update({ notification_sent: true })
//           .eq("id", inquiry.id);
//       } else {
//         console.error("Resend error:", await emailResponse.text());
//       }
//     }

//     return jsonResponse({
//       success: true,
//       inquiryId: inquiry.id,
//       notificationSent,
//     });
//   } catch (error) {
//     console.error("Submission error:", error);
//     return jsonResponse(
//       { error: "Something went wrong. Please try again." },
//       500
//     );
//   }
// });