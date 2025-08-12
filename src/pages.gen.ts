// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as File_About_getConfig } from './pages/about';
// prettier-ignore
import type { getConfig as File_DashboardCounter_getConfig } from './pages/dashboard/counter';
// prettier-ignore
import type { getConfig as File_DashboardIndex_getConfig } from './pages/dashboard/index';
// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';

// prettier-ignore
type Page =
| ({ path: '/about' } & GetConfigResponse<typeof File_About_getConfig>)
| ({ path: '/dashboard/counter' } & GetConfigResponse<typeof File_DashboardCounter_getConfig>)
| ({ path: '/dashboard' } & GetConfigResponse<typeof File_DashboardIndex_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>)
| { path: '/shadcn-demo'; render: 'dynamic' };

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
