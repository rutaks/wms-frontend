import config from '../configs/config';

/**
 * Class representing methods related to environment variable actions
 * @author Awesomity Lab
 * @since version 1.0
 */
class EnvironmentHelper {
  /**
   * Methods that checks if current running project has env set to production or not
   * @returns boolean: true or false if is in production or not respectively
   */
  static isInProduction() {
    if (config.env === 'production') return true;
    return false;
  }

  /**
   * Methods that checks if current running project has env set to production or not
   * @returns boolean: true or false if is in production or not respectively
   */
  static isInDevelopment() {
    if (config.env === 'development') return true;
    return false;
  }
}

export default EnvironmentHelper;
