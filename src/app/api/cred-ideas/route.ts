import { NextResponse } from "next/server";
import { query } from "../../../db/index";

export async function POST(req: Request) {
  const { name, description, criteria, verification_process, links, type } =
    await req.json();

  const result = await query(
    `INSERT INTO cred_ideas 
    (name, description, criteria, verification_process, links, type) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *`,
    [name, description, criteria, verification_process, links, type]
  );

  return NextResponse.json(result.rows[0]);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");

  let queryText = "SELECT * FROM cred_ideas";
  const queryParams: string[] = [];

  if (type && type !== "all") {
    queryText += " WHERE type = $1";
    queryParams.push(type);
  }

  queryText += " ORDER BY created_at DESC";

  const result = await query(queryText, queryParams);
  return NextResponse.json(result.rows);
}
