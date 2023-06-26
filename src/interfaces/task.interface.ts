import { STATUS_TASKS } from 'src/constants/status-task';

export interface ITask {
  taskName: string;
  taskDescription: string;
  status: STATUS_TASKS;
}
