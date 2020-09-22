import EnvironmentHelper from './environmentHelper';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/apm';
import config from '../configs/config';

/**
 * Class representing methods related to logging and monitoring actions
 * @author Awesomity Lab
 * @since version 1.0
 */
class MonitoringHelper {
  static logEvent({ tag = 'EnvironmentHelper', error }) {
    if (EnvironmentHelper.isInProduction() || EnvironmentHelper.isInDevelopment()) {
      Sentry.captureException(error);
    } else {
      console.log(`${tag}`, error);
    }
  }

  static initSentryLogger() {
    if (EnvironmentHelper.isInProduction() || EnvironmentHelper.isInDevelopment()) {
      Sentry.init({
        dsn: config.sentryDns,
        integrations: [new Integrations.Tracing()],
        tracesSampleRate: 1.0
      });
    }
  }
}

export default MonitoringHelper;
