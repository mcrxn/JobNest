import { FirmDataDto } from './firm.dto';
import { HirerDataDto } from './hirer.dto';
import { WorkerDataDto } from './worker.dto';

export type UserProfileDto =
  | { userType: 'WORKER'; data: WorkerDataDto }
  | { userType: 'FIRM'; data: FirmDataDto }
  | { userType: 'HIRER'; data: HirerDataDto };
