import * as migration_20251222_015737 from './20251222_015737';
import * as migration_20260109_195216 from './20260109_195216';
import * as migration_20260110_223854 from './20260110_223854';
import * as migration_20260125_084918 from './20260125_084918';

export const migrations = [
  {
    up: migration_20251222_015737.up,
    down: migration_20251222_015737.down,
    name: '20251222_015737',
  },
  {
    up: migration_20260109_195216.up,
    down: migration_20260109_195216.down,
    name: '20260109_195216',
  },
  {
    up: migration_20260110_223854.up,
    down: migration_20260110_223854.down,
    name: '20260110_223854',
  },
  {
    up: migration_20260125_084918.up,
    down: migration_20260125_084918.down,
    name: '20260125_084918'
  },
];
