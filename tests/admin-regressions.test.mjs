import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL("../" + path, import.meta.url), "utf8");

test("database migration restricts publishing and direct audit writes", async () => {
  const files = await readdir(new URL("../supabase/migrations/", import.meta.url));
  const name = files.find((entry) => entry.startsWith("20261019000100_harden_admin_workflows"));
  assert.ok(name, "security migration exists");
  const sql = await read("supabase/migrations/" + name);
  assert.match(sql, /publication_status = 'draft'/);
  assert.match(sql, /admins can delete places/);
  assert.match(sql, /REVOKE INSERT ON public\.admin_audit_log FROM PUBLIC, anon, authenticated/);
  assert.match(sql, /active staff can insert draft place guides/);
  assert.match(sql, /admin_save_place/);
  assert.match(sql, /admin_save_province/);
  assert.match(sql, /SECURITY INVOKER/);
});

test("content saves use transactional RPCs and validate unsafe values", async () => {
  const placeApi = await read("src/pages/api/admin/places/[id].ts");
  const provinceApi = await read("src/pages/api/admin/provinces/[id].ts");
  assert.match(placeApi, /rpc\("admin_save_place"/);
  assert.match(provinceApi, /rpc\("admin_save_province"/);
  assert.doesNotMatch(placeApi, /from\("places"\)\.update\(payload\)/);
  assert.doesNotMatch(placeApi, /from\("admin_audit_log"\)\.insert/);
  assert.match(placeApi, /url\.protocol === "https:"/);
  assert.match(placeApi, /lat < -90 \|\| lat > 90/);
  assert.match(placeApi, /lng < -180 \|\| lng > 180/);
  assert.match(placeApi, /current\.publication_status === "paused"/);
});

test("public homepage and detail routes are request rendered", async () => {
  const homepage = await read("src/pages/[lang]/index.astro");
  const destination = await read("src/pages/[lang]/destinations/[slug].astro");
  const region = await read("src/pages/[lang]/regions/[slug].astro");
  for (const source of [homepage, destination, region]) {
    assert.doesNotMatch(source, /export const prerender = true/);
    assert.doesNotMatch(source, /export (async )?function getStaticPaths/);
  }
});

test("admin list pagination and nearby destination exclusion are present", async () => {
  const list = await read("src/pages/admin/places.astro");
  const catalog = await read("src/lib/catalog.ts");
  assert.match(list, /\.range\(\(page - 1\) \* pageSize, page \* pageSize - 1\)/);
  assert.match(list, /admin-pagination/);
  assert.match(catalog, /\.neq\("slug", excludedSlug\)/);
  assert.match(catalog, /filter\(\(entry\) => entry\.km <= 300\)/);
});
