// @ts-nocheck
import sql from "@/app/api/utils/sql";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const status = searchParams.get("status");
  const offset = (page - 1) * limit;

  try {
    const args = [];
    let query = `
      SELECT id, title, slug, excerpt, cover_image, author_name, published_at, status
      FROM blog_posts
      WHERE 1=1
    `;

    if (status) {
      args.push(status);
      query += ` AND status = $${args.length}`;
    }

    query += ` ORDER BY published_at DESC LIMIT $${args.length + 1} OFFSET $${args.length + 2}`;
    args.push(limit, offset);

    const posts = await sql(query, args);

    // Mock post for demonstration
    const mockPost = {
      id: 999,
      title:
        "Never Miss a Beat: How Offline Resilience Keeps Your Sales Rolling",
      slug: "never-miss-a-beat-how-offline-resilience-keeps-your-sales-rolling",
      excerpt:
        "Discover how offline resilience technology ensures your restaurant never stops serving, even when the internet goes down.",
      cover_image:
        "https://ucarecdn.com/d08b4ab7-c83d-4cd2-b37e-4b202ad04b97/-/format/auto/",
      author_name: "eatOS Team",
      published_at: "2025-11-19T10:00:00Z",
      status: "published",
    };

    // Inject mock post at the top of the first page if filtering allows
    if (page === 1 && (!status || status === "published")) {
      // Check if it's already in the DB to avoid duplicates (based on slug)
      const exists = posts.some((p) => p.slug === mockPost.slug);
      if (!exists) {
        posts.unshift(mockPost);
      }
    }

    const countArgs = [];
    let countQuery = `SELECT COUNT(*) FROM blog_posts WHERE 1=1`;

    if (status) {
      countArgs.push(status);
      countQuery += ` AND status = $${countArgs.length}`;
    }

    const totalCount = await sql(countQuery, countArgs);

    return Response.json({
      data: posts,
      pagination: {
        page,
        limit,
        total: parseInt(totalCount[0].count),
        totalPages: Math.ceil(parseInt(totalCount[0].count) / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return Response.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      cover_image,
      author_name,
      published_at,
    } = body;

    if (!title || !slug) {
      return Response.json(
        { error: "Title and slug are required" },
        { status: 400 },
      );
    }

    const newPost = await sql`
      INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, author_name, published_at)
      VALUES (${title}, ${slug}, ${excerpt}, ${content}, ${cover_image}, ${author_name}, ${published_at || new Date().toISOString()})
      RETURNING *
    `;

    return Response.json(newPost[0], { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return Response.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}
