import { describe, it, expect } from 'vitest';
import {
  getPostTeamSwitchLocation,
  stripTeamScopedSearchParams,
} from './team-switch-navigation';

describe('getPostTeamSwitchLocation', () => {
  it('redirects project detail pages to the projects list', () => {
    expect(
      getPostTeamSwitchLocation('/velox/projects/a1b2c3d4-e5f6-7890-abcd-ef1234567890')
    ).toBe('/velox/projects');
  });

  it('keeps shared projects rail pages in place', () => {
    expect(getPostTeamSwitchLocation('/velox/projects/all-projects')).toBe(
      '/velox/projects/all-projects'
    );
    expect(getPostTeamSwitchLocation('/velox/projects/time-entries')).toBe(
      '/velox/projects/time-entries'
    );
    expect(getPostTeamSwitchLocation('/velox/projects')).toBe('/velox/projects');
  });

  it('redirects task short links to the projects list', () => {
    expect(getPostTeamSwitchLocation('/velox/t/task-123')).toBe('/velox/projects');
  });

  it('keeps home, planner, and finance pages in place', () => {
    expect(getPostTeamSwitchLocation('/velox/home')).toBe('/velox/home');
    expect(getPostTeamSwitchLocation('/velox/planner/schedule')).toBe(
      '/velox/planner/schedule'
    );
    expect(getPostTeamSwitchLocation('/velox/finance/overview')).toBe(
      '/velox/finance/overview'
    );
  });
});

describe('stripTeamScopedSearchParams', () => {
  it('removes task deep-link params left over after a team switch', () => {
    expect(
      stripTeamScopedSearchParams(
        '?task=a9f612b5-41e3-4ed7-8afb-c833de3661ec&task_project=9f324f61-618c-4216-9b49-d72e2c442d07&tab=overview'
      )
    ).toBe('?tab=overview');
  });

  it('returns empty search when only team-scoped params were present', () => {
    expect(
      stripTeamScopedSearchParams('?task=abc&task_project=def&comment=1&from=notification')
    ).toBe('');
  });

  it('leaves unrelated search params unchanged', () => {
    expect(stripTeamScopedSearchParams('?page=2&sort=name')).toBe('?page=2&sort=name');
  });
});
