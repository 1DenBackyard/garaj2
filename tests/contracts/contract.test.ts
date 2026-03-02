import fs from 'fs';
const required=['docs/PROJECT_MEMORY.md','docs/ARCHITECTURE.md','docs/DESIGN_SPEC.md','docs/CONTENT_RULES.md','docs/RELEASE_CHECKLIST.md','docker-compose.yml','Dockerfile','nginx/nginx.conf','app/api/lead/route.ts','app/api/track/route.ts','app/api/telegram/callback/route.ts'];
describe('contract files',()=>{for(const f of required){it(`${f} exists`,()=>expect(fs.existsSync(f)).toBe(true));}});
