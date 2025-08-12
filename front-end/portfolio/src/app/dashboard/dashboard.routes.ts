import { Routes } from '@angular/router';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
import { DashboardHome } from './dashboard-home/dashboard-home';
import { PersonalInfo } from './personal-info/personal-info';
import { Education } from './education/education';
import { Experience } from './experience/experience';
import { Messages } from './messages/messages';
import { Projects } from './projects/projects';
import { Services } from './services/services';
import { Skills } from './skills/skills';


export const dashboardRoutes: Routes = [
      { path: '', component: DashboardHome },
      { path: 'personal-info', component: PersonalInfo },
      { path: 'skills', component: Skills},
      { path: 'education', component: Education },
      { path: 'experience', component: Experience },
      { path: 'projects', component: Projects },
      { path: 'services', component: Services },
      { path: 'messages', component: Messages },
   
];
