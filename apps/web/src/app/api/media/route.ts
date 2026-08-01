// @ts-nocheck
import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const images = await sql`
      SELECT * FROM media_library ORDER BY created_at DESC
    `;
    return Response.json(images);
  } catch (error) {
    console.error("Error fetching media:", error);
    return Response.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { url, filename, mime_type, alt_text } = await request.json();

    const [image] = await sql`
      INSERT INTO media_library (url, filename, mime_type, alt_text)
      VALUES (${url}, ${filename}, ${mime_type}, ${alt_text || ""})
      RETURNING *
    `;

    return Response.json(image);
  } catch (error) {
    console.error("Error saving media:", error);
    return Response.json({ error: "Failed to save media" }, { status: 500 });
  }
}
