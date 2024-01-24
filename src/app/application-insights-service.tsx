"use client"
import {ApplicationInsights, ITelemetryItem} from '@microsoft/applicationinsights-web';
import {ReactPlugin} from '@microsoft/applicationinsights-react-js';

function initializeTelemetry(instrumentationKey: string): { reactPlugin: ReactPlugin, appInsights: ApplicationInsights } {

  const defaultBrowserHistory = {
    url: "/",
    location: { pathname: ""},
    state: { url: "" },
    listen: () => {},
  };

  let browserHistory = defaultBrowserHistory;

  if (typeof window !== "undefined") {
      browserHistory = { ...browserHistory, ...window.history };
      browserHistory.location.pathname = browserHistory?.state?.url;
  }

  const reactPlugin = new ReactPlugin();
  const appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: instrumentationKey,
      extensions: [reactPlugin],
      extensionConfig: {
          [reactPlugin.identifier]: { history: browserHistory },
      },
      enableAutoRouteTracking: true,
      disableAjaxTracking: false,
      autoTrackPageVisitTime: true,
      enableCorsCorrelation: true,
      enableRequestHeaderTracking: true,
      enableResponseHeaderTracking: true,
    }
  });

  appInsights.loadAppInsights();

  appInsights.addTelemetryInitializer((env:ITelemetryItem) => {
      env.tags = env.tags || [];
      env.tags["ai.cloud.role"] = "Bühler ChatGPT";
  });

  return { reactPlugin, appInsights };
}

export { initializeTelemetry };
