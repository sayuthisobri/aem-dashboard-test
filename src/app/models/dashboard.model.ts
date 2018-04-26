/**
 * @author:msms
 * 26/04/2018
 */
import {BaseModel} from '@app/models/base.model';

interface DashboardUserModel {
  firstname: string,
  lastname: string,
  username: string,
}

interface DashboardChartDonutModel {
  country: string,
  litres: number
}

interface DashboardChartBarModel {
  country: string,
  visits: number
}

export interface DashboardModel extends BaseModel {
  chartDonut: DashboardChartDonutModel[],
  chartBar: DashboardChartBarModel[],
  tableUsers: DashboardUserModel[]
}
