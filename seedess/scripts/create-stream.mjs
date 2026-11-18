#!/usr/bin/env node
/**
 * Create a Seedess stream and print the playback handoff.
 *
 *   SEEDESS_API_KEY=key_… node scripts/create-stream.mjs \
 *     --url https://origin.example/master.m3u8 --id demo
 *
 * Optional: --live, --base https://seedess.com, --html
 *
 * No dependencies. Uses fetch. The API key stays in this process.
 */

const args = process.argv.slice(2);
const get = (name, fallback = null) => {
  const index = args.indexOf(`--${name}`);
  if (index === -1) return fallback;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) return true;
  return value;
};

const apiKey = process.env.SEEDESS_API_KEY;
if (!apiKey || !apiKey.startsWith('key_')) {
  console.error('Set SEEDESS_API_KEY to a server API key (key_…).');
  process.exit(1);
}

const url = get('url');
if (!url || typeof url !== 'string') {
  console.error('Pass --url <manifest URL>.');
  process.exit(1);
}

const base = String(get('base', 'https://seedess.com')).replace(/\/+$/, '');
const id = get('id', null);
const live = args.includes('--live');
const html = args.includes('--html');

const body = { url };
if (id) body.id = id;
if (live) body.live = true;

const response = await fetch(`${base}/api/v1/streams`, {
  method: 'POST',
  headers: {
    authorization: `Bearer ${apiKey}`,
    'content-type': 'application/json',
  },
  body: JSON.stringify(body),
});

const payload = await response.json();
if (!response.ok) {
  console.error(JSON.stringify(payload, null, 2));
  process.exit(1);
}

const token = payload.publicToken;
const playback = payload.playback ?? {};
const absolute = (path) => (path ? new URL(path, base).toString() : null);
const result = {
  ok: true,
  stream: payload.id,
  token,
  playback: {
    master: absolute(playback.master),
    manifest: absolute(playback.manifest),
    signaling: absolute(playback.signaling),
    config: `${base}/signaling/config?token=${encodeURIComponent(token)}`,
  },
};

console.log(JSON.stringify(result, null, 2));

if (html) {
  console.log(`
<!-- Seedess player -->
<script src="https://cdn.jsdelivr.net/npm/hls.js@1"></script>
<script type="module">
  import { createPlayer } from '${base}/p2p.js';

  const player = await createPlayer(document.querySelector('video'), {
    stream: '${payload.id}',
    token: '${token}',
    origin: '${base}',
  });

  player.on('stats', console.log);
</script>`);
}
