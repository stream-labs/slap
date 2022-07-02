import { createPostMessageListener } from '../lib/utils/remote/post-message-transport';
import { ApiServer } from '../lib/utils/remote/api-server';
import { TAppContext } from '../lib';

export function startInspectorInWindow() {
  startInspectorServer();
  window.open('/inspectorapp.html', '__blank');
}

export function startInspectorServer() {
  const inspectedApp = findInspectedApp();
  const listener = createPostMessageListener();
  const apiServer = new ApiServer({ listener, scope: inspectedApp.servicesScope });
  apiServer.listen();
}

function findInspectedApp() {
  const apps = (window as any).ReactModulesApps;
  const inspectedApp = Object.values(apps)[0] as TAppContext;
  if (!inspectedApp) {
    throw new Error('No apps found to inspect');
  }
  return inspectedApp;
}
