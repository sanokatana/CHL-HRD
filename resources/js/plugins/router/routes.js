// Import your route components...
import DefaultLayout from '@/layouts/default.vue'
import BlankLayout from '@/layouts/blank.vue'
import DashboardPage from '@/pages/dashboard.vue'
import LoginPage from '@/pages/login.vue'
import RegisterPage from '@/pages/register.vue'
import AccountSettingsPage from '@/pages/account-settings.vue'
import TypographyPage from '@/pages/typography.vue'
import IconsPage from '@/pages/icons.vue'
import CardsPage from '@/pages/cards.vue'
import TablesPage from '@/pages/tables.vue'
import FormLayoutsPage from '@/pages/form-layouts.vue'
import ErrorPage from '@/pages/[...error].vue'

// Define your routes
export const routes = [
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      { path: 'dashboard', component: DashboardPage },
      { path: 'account-settings', component: AccountSettingsPage },
      { path: 'typography', component: TypographyPage },
      { path: 'icons', component: IconsPage },
      { path: 'cards', component: CardsPage },
      { path: 'tables', component: TablesPage },
      { path: 'form-layouts', component: FormLayoutsPage }
    ]
  },
  {
    path: '/',
    component: BlankLayout,
    children: [
      { path: 'login', component: LoginPage },
      { path: 'register', component: RegisterPage }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage
  }
]
