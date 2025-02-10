import UserManagerReducer from './UserManagerReducer'
import AppManagerReducer from './AppManagerReducer'
import ProductManagerReducer from './ProductsManagerReducer'
import SeriegrafiaManagerReducer from './SeriegrafiasManagerReducer'
import PedidosManagerReducer from './PedidosManagerReducer'
const RootReducer = (state, action) => ({
  appManager: AppManagerReducer(state.appManager, action),
  userManager: UserManagerReducer(state.userManager, action),
  productsManager: ProductManagerReducer(state.productsManager, action),
  seriegrafiaManager: SeriegrafiaManagerReducer(
    state.seriegrafiaManager,
    action
  ),
  pedidosManager: PedidosManagerReducer(state.pedidosManager, action)
})
export default RootReducer
