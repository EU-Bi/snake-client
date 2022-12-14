import Auth from "./pages/Auth";
import Game from "./pages/Game";
import TableScore from "./pages/TableScore";
import { GAME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, TABLE_SCORE_ROUTE } from "./utils/constants";

export const authRoutes = [
  {
    path: GAME_ROUTE,
    Component: <Game/>
  }
]

export const publicRoutes = [
  {
    path: LOGIN_ROUTE ,
    Component: <Auth/>
  },
  {
    path: REGISTRATION_ROUTE,
    Component: <Auth/>
  },
  {
    path: TABLE_SCORE_ROUTE,
    Component: <TableScore/>
  }
]