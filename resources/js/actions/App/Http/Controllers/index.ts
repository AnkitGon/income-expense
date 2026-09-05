import DashboardController from './DashboardController'
import BankAccountController from './BankAccountController'
import CategoryController from './CategoryController'
import TransactionController from './TransactionController'
import TransferController from './TransferController'
import GoalController from './GoalController'
import Teams from './Teams'
import Settings from './Settings'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
BankAccountController: Object.assign(BankAccountController, BankAccountController),
CategoryController: Object.assign(CategoryController, CategoryController),
TransactionController: Object.assign(TransactionController, TransactionController),
TransferController: Object.assign(TransferController, TransferController),
GoalController: Object.assign(GoalController, GoalController),
Teams: Object.assign(Teams, Teams),
Settings: Object.assign(Settings, Settings),
}

export default Controllers