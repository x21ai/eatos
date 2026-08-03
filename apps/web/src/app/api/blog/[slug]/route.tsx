// @ts-nocheck
import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  const { slug } = params;

  // Mock data for the specific eatOS article requested
  if (
    slug === "never-miss-a-beat-how-offline-resilience-keeps-your-sales-rolling"
  ) {
    return Response.json({
      id: 999,
      title:
        "Never Miss a Beat: How Offline Resilience Keeps Your Sales Rolling",
      slug: "never-miss-a-beat-how-offline-resilience-keeps-your-sales-rolling",
      excerpt:
        "Discover how offline resilience technology ensures your restaurant never stops serving, even when the internet goes down.",
      content: `
        <p>In the fast-paced world of restaurant management, reliability is everything. When the internet goes down, your sales shouldn't have to stop. That's why offline resilience is a critical feature for modern point-of-sale systems.</p>
        
        <h2>Why Offline Mode Matters</h2>
        <p>Internet outages are unpredictable. Whether it's a storm, a service provider issue, or a hardware glitch, losing connectivity can cost restaurants thousands of dollars in lost revenue during peak hours. Traditional cloud-based systems often freeze up, leaving staff unable to process orders or payments.</p>
        
        <h2>How Offline Resilience Works</h2>
        <p>With advanced offline resilience technology, your POS system locally stores all transaction data. The moment connectivity is lost, the system seamlessly switches to offline mode without skipping a beat. Staff can continue to:</p>
        <ul>
          <li>Take orders and send tickets to the kitchen</li>
          <li>Process credit card payments (stored for later authorization)</li>
          <li>Manage table seating and reservations</li>
          <li>Print receipts and kitchen tickets</li>
        </ul>
        
        <h2>Syncing Back Up</h2>
        <p>Once the internet connection is restored, the system automatically syncs all offline data back to the cloud. This ensures your reporting, inventory, and sales data are always accurate, with zero manual entry required.</p>
        
        <p>Don't let a bad connection break your business. Embrace offline resilience and keep your sales rolling, no matter what.</p>
      `,
      cover_image:
        "https://ucarecdn.com/d08b4ab7-c83d-4cd2-b37e-4b202ad04b97/-/format/auto/",
      author_name: "eatOS Team",
      published_at: "2025-11-19T10:00:00Z",
      seo_title: "Never Miss a Beat: Offline Resilience in POS",
      seo_description:
        "Keep your restaurant running even when the internet is down with offline resilience.",
      keywords: "offline mode, restaurant pos, resilience, business continuity",
      status: "published",
    });
  }

  try {
    const post = await sql`
      SELECT *
      FROM blog_posts
      WHERE slug = ${slug}
    `;

    if (post.length === 0) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    return Response.json(post[0]);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return Response.json(
      { error: "Failed to fetch blog post" },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  const { slug } = params;
  const body = await request.json();
  const {
    title,
    content,
    excerpt,
    cover_image,
    seo_title,
    seo_description,
    keywords,
    new_slug,
    status,
    published_at,
  } = body;

  try {
    const updatedPost = await sql`
      UPDATE blog_posts
      SET
        title = COALESCE(${title}, title),
        content = COALESCE(${content}, content),
        excerpt = COALESCE(${excerpt}, excerpt),
        cover_image = COALESCE(${cover_image}, cover_image),
        seo_title = COALESCE(${seo_title}, seo_title),
        seo_description = COALESCE(${seo_description}, seo_description),
        keywords = COALESCE(${keywords}, keywords),
        slug = COALESCE(${new_slug}, slug),
        status = COALESCE(${status}, status),
        published_at = COALESCE(${published_at}, published_at),
        updated_at = CURRENT_TIMESTAMP
      WHERE slug = ${slug}
      RETURNING *
    `;

    if (updatedPost.length === 0) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    return Response.json(updatedPost[0]);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return Response.json(
      { error: "Failed to update blog post" },
      { status: 500 },
    );
  }
}
