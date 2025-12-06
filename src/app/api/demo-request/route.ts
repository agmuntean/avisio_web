import { NextRequest, NextResponse } from "next/server";

const BREVO_API_URL = "https://api.brevo.com/v3";
const NOTIFICATION_EMAIL = "adrian.m@axiomik.ai";
const SENDER_EMAIL = "adrian.m@axiomik.ai";
const LIST_NAME = "Demo Requests";
const BREVO_LIST_URL = "https://app.brevo.com/contact/list/id";
const MAX_FIELD_LENGTH = 500;

type DemoRequestBody = {
  nombre: string;
  email: string;
  empresa: string;
};

// Sanitize user input to prevent email injection
const sanitize = (str: string) => str.replace(/[\r\n]/g, " ").trim();

async function getOrCreateList(apiKey: string): Promise<number> {
  // Get all lists
  const listsRes = await fetch(`${BREVO_API_URL}/contacts/lists`, {
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
  });

  if (!listsRes.ok) {
    throw new Error("Failed to fetch lists");
  }

  const listsData = await listsRes.json();
  const existingList = listsData.lists?.find(
    (list: { name: string }) => list.name === LIST_NAME
  );

  if (existingList) {
    return existingList.id;
  }

  // Create list if it doesn't exist
  const createRes = await fetch(`${BREVO_API_URL}/contacts/lists`, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: LIST_NAME,
      folderId: 1, // Default folder
    }),
  });

  if (!createRes.ok) {
    throw new Error("Failed to create list");
  }

  const newList = await createRes.json();
  return newList.id;
}

async function addContactToList(
  apiKey: string,
  listId: number,
  data: DemoRequestBody
): Promise<void> {
  const res = await fetch(`${BREVO_API_URL}/contacts`, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      attributes: {
        NOMBRE: data.nombre,
        EMPRESA: data.empresa,
      },
      listIds: [listId],
      updateEnabled: true, // Update if contact exists
    }),
  });

  // 201 = created, 204 = updated
  if (!res.ok && res.status !== 204) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to add contact");
  }
}

function buildUserConfirmationEmail(nombre: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'IBM Plex Sans', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;">
    <div style="display: none; max-height: 0px; overflow: hidden;">
        Gracias por tu interés en Avisio - Te contactaremos pronto
    </div>
    <table width="100%" style="background-color: #f3f4f6; padding: 40px 0;">
        <tr>
            <td align="center">
                <table width="600" style="background-color: #ffffff; max-width: 600px; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                    <tr>
                        <td align="center" style="background: linear-gradient(135deg, #390099 0%, #5a00d6 100%); padding: 40px 32px;">
                            <img src="https://axiomik.ai/wp-content/uploads/2025/11/avisio-logo-emails.png" alt="AVISIO" width="160" />
                            <h1 style="margin: 16px 0 0 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                                Solicitud de Demo Recibida
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 32px; color: #374151; font-size: 15px; line-height: 1.6;">
                            <p style="margin: 0 0 16px 0; color: #1f2937; font-size: 15px;">
                                Hola <strong>${nombre}</strong>,
                            </p>
                            <p style="margin: 0 0 16px 0; color: #4b5563; font-size: 15px;">
                                Gracias por tu interés en Avisio. Hemos recibido tu solicitud de demo y nos pondremos en contacto contigo muy pronto.
                            </p>
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 15px;">
                                Mientras tanto, si tienes alguna pregunta, no dudes en escribirnos.
                            </p>
                            <table width="100%" style="background-color: #f5f3ff; border-left: 4px solid #390099; border-radius: 8px;">
                                <tr>
                                    <td style="padding: 16px 20px;">
                                        <p style="margin: 0; font-size: 13px; color: #6b7280; line-height: 1.6;">
                                            <strong style="color: #390099;">¿Qué es Avisio?</strong><br/>
                                            Avisio procesa automáticamente las notificaciones de la AEAT: aplazamientos, requerimientos y liquidaciones. Olvídate de revisar PDFs manualmente.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            <div style="margin: 32px 0 0 0; text-align: center;">
                                <img src="https://axiomik.ai/wp-content/uploads/2025/11/avisio-logo-symbol-emails.png" alt="Avisio" width="40" style="display: block; margin: 0 auto;" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="background-color: #f9fafb; padding: 24px 32px; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 8px 0; font-size: 12px; color: #9ca3af;">
                                Este es un correo automático.
                            </p>
                            <p style="margin: 0 0 12px 0; font-size: 12px; color: #9ca3af;">
                                © 2025 Avisio - Gestión inteligente de notificaciones AEAT
                            </p>
                            <p style="margin: 0; font-size: 11px; color: #d1d5db;">
                                <strong>Powered by AVISIO</strong>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

function buildAdminNotificationEmail(
  data: DemoRequestBody,
  listId: number
): string {
  const listUrl = `${BREVO_LIST_URL}/${listId}`;
  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'IBM Plex Sans', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;">
    <table width="100%" style="background-color: #f3f4f6; padding: 40px 0;">
        <tr>
            <td align="center">
                <table width="600" style="background-color: #ffffff; max-width: 600px; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                    <tr>
                        <td align="center" style="background: linear-gradient(135deg, #390099 0%, #5a00d6 100%); padding: 40px 32px;">
                            <img src="https://axiomik.ai/wp-content/uploads/2025/11/avisio-logo-emails.png" alt="AVISIO" width="160" />
                            <h1 style="margin: 16px 0 0 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                                Nueva Solicitud de Demo
                            </h1>
                            <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                                Alguien quiere probar Avisio
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 32px; color: #374151; font-size: 15px; line-height: 1.6;">
                            <table width="100%" style="background-color: #f5f3ff; border-radius: 8px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="margin: 0 0 12px 0; font-size: 14px; color: #390099; font-weight: 600;">
                                            Datos del contacto:
                                        </p>
                                        <p style="margin: 0 0 8px 0; font-size: 15px; color: #1f2937;">
                                            <strong>Nombre:</strong> ${sanitize(data.nombre)}
                                        </p>
                                        <p style="margin: 0 0 8px 0; font-size: 15px; color: #1f2937;">
                                            <strong>Email:</strong> <a href="mailto:${sanitize(data.email)}" style="color: #390099;">${sanitize(data.email)}</a>
                                        </p>
                                        <p style="margin: 0; font-size: 15px; color: #1f2937;">
                                            <strong>Empresa:</strong> ${sanitize(data.empresa)}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                                <tr>
                                    <td align="center" style="border-radius: 12px; background: linear-gradient(135deg, #390099 0%, #5a00d6 100%); box-shadow: 0 4px 12px rgba(57, 0, 153, 0.25);">
                                        <a href="${listUrl}" style="display: inline-block; padding: 16px 48px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 12px;">
                                            Ver en Brevo
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="background-color: #f9fafb; padding: 24px 32px; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                                Notificación automática de avisio.es
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

async function sendUserConfirmationEmail(
  apiKey: string,
  data: DemoRequestBody
): Promise<void> {
  const res = await fetch(`${BREVO_API_URL}/smtp/email`, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "Avisio",
        email: SENDER_EMAIL,
      },
      to: [{ email: data.email, name: data.nombre }],
      subject: "Solicitud de demo recibida - Avisio",
      htmlContent: buildUserConfirmationEmail(sanitize(data.nombre)),
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to send user confirmation email");
  }
}

async function sendNotificationEmail(
  apiKey: string,
  data: DemoRequestBody,
  listId: number
): Promise<void> {
  const res = await fetch(`${BREVO_API_URL}/smtp/email`, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "Avisio Web",
        email: SENDER_EMAIL,
      },
      to: [{ email: NOTIFICATION_EMAIL }],
      subject: `Nueva solicitud de demo: ${sanitize(data.nombre)} - ${sanitize(data.empresa)}`,
      htmlContent: buildAdminNotificationEmail(data, listId),
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to send notification email");
  }
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      console.error("BREVO_API_KEY is not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const body: DemoRequestBody = await request.json();

    // Validate required fields
    if (!body.nombre?.trim() || !body.email?.trim() || !body.empresa?.trim()) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (
      body.nombre.length > MAX_FIELD_LENGTH ||
      body.email.length > MAX_FIELD_LENGTH ||
      body.empresa.length > MAX_FIELD_LENGTH
    ) {
      return NextResponse.json(
        { error: "Los campos exceden la longitud máxima" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Email no válido" },
        { status: 400 }
      );
    }

    // Get or create the list
    const listId = await getOrCreateList(apiKey);

    // Add contact to list and send emails in parallel
    await Promise.all([
      addContactToList(apiKey, listId, body),
      sendUserConfirmationEmail(apiKey, body),
      sendNotificationEmail(apiKey, body, listId),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Demo request error:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
