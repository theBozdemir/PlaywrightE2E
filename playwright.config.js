// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { config } from 'node:process';
/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40*1000,
  expect:{
    //This is for assertions
    timeout:40*1000
  },

  use: {
    browserName:'chromium',
    headless:false
  
  },

  
});
