module.exports = {
  default: {
    timeout: 30000,
    require: ['features/steps/*.ts', 'fixtures/hooks.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'html:reports/report.html'
    ]
  }
};