import DashboardController from './DashboardController'
import CategoryController from './CategoryController'
import TransactionController from './TransactionController'
import Teams from './Teams'
import Settings from './Settings'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
CategoryController: Object.assign(CategoryController, CategoryController),
TransactionController: Object.assign(TransactionController, TransactionController),
Teams: Object.assign(Teams, Teams),
Settings: Object.assign(Settings, Settings),
}

export default Controllers