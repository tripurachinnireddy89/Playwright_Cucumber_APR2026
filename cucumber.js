module.exports = {
  default: {
    require: ['features/steps/*.ts', 'fixtures/hooks.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'html:reports/report.html'
    ]
  }
};