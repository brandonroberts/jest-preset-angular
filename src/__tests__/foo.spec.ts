import { Component } from '@angular/core';

test('angular 13', async () => {
  expect(Component).toBeDefined();

  const { getTestBed } = await import('@angular/core/testing');

  expect(getTestBed).toBeDefined();
});
