import { createServerFn } from "@tanstack/react-start";
import { assertAdmin } from "@/lib/admin-auth";
import rawContent from "@/content/data.json";
import type { PortfolioContent } from "@/content/types";

const GITHUB_API = "https://api.github.com";

function githubConfig() {
  const token = process.env["GITHUB_TOKEN"];
  const repo = process.env["GITHUB_REPO"]; // e.g. "SREEJITH-16/Sreejith-Portfolio"
  const branch = process.env["GITHUB_BRANCH"] || "main";
  const path = process.env["CONTENT_FILE_PATH"] || "src/content/data.json";
  return { token, repo, branch, path };
}

export const getContent = createServerFn({ method: "GET" }).handler(async () => {
  await assertAdmin();
  return rawContent as unknown as PortfolioContent;
});

export const contentStoreStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { token, repo } = githubConfig();
  return { configured: Boolean(token && repo) };
});

export const saveContent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as { content: PortfolioContent })
  .handler(async ({ data }) => {
    await assertAdmin();

    const { token, repo, branch, path } = githubConfig();
    if (!token || !repo) {
      return {
        ok: false,
        error:
          "Publishing isn't configured yet. Set GITHUB_TOKEN and GITHUB_REPO in your environment variables (see the README) so admin edits can be committed and redeployed.",
      };
    }

    const json = JSON.stringify(data.content, null, 2) + "\n";
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "portfolio-admin-cms",
    };

    // 1. Get the current file SHA (required by the GitHub Contents API for updates)
    const getRes = await fetch(
      `${GITHUB_API}/repos/${repo}/contents/${path}?ref=${branch}`,
      { headers },
    );
    if (!getRes.ok) {
      return { ok: false, error: `Could not read current content from GitHub (${getRes.status}).` };
    }
    const current = (await getRes.json()) as { sha: string };

    // 2. Commit the updated content
    const putRes = await fetch(`${GITHUB_API}/repos/${repo}/contents/${path}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: "chore: update portfolio content via admin CMS",
        content: Buffer.from(json, "utf-8").toString("base64"),
        sha: current.sha,
        branch,
      }),
    });

    if (!putRes.ok) {
      const errBody = await putRes.text();
      return { ok: false, error: `GitHub commit failed (${putRes.status}): ${errBody.slice(0, 200)}` };
    }

    return {
      ok: true,
      message: "Saved. Vercel will redeploy automatically from this commit in a minute or two.",
    };
  });
