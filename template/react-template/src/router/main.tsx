import { AdminContent } from '../modules/Admin';
import { ROUTE_PATH } from '../config';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminHeader, AdminSilder } from '../components';
import { Home } from '../modules/Home';

export const headerNav = [
  {
    path: ROUTE_PATH.NAV1,
    menutext: 'nav1',
    component: AdminSilder
  },
  {
    path: ROUTE_PATH.NAV2,
    menutext: 'nav2',
    component: AdminSilder
  },
  {
    path: ROUTE_PATH.NAV3,
    menutext: 'nav3',
    component: AdminSilder
  }
]

export const SliderMenuMap = {
  [ROUTE_PATH.NAV1]: [
    { path: `sub1`, menutext: 'nav1-sub1', component: AdminContent },
    { path: `sub2`, menutext: 'nav1-sub2', component: AdminContent },
    { path: `sub3`, menutext: 'nav1-sub3', component: AdminContent },
    { path: `sub4`, menutext: 'nav1-sub4', component: AdminContent },
    { path: `sub5`, menutext: 'nav1-sub5', component: AdminContent },
    { path: `sub6`, menutext: 'nav1-sub6', component: AdminContent },
    { path: `sub7`, menutext: 'nav1-sub7', component: AdminContent },
  ],
  [ROUTE_PATH.NAV2]: [
    { path: `sub1`, menutext: 'nav2-sub1', component: AdminContent },
    { path: `sub2`, menutext: 'nav2-sub2', component: AdminContent },
    { path: `sub3`, menutext: 'nav2-sub3', component: AdminContent },
    { path: `sub4`, menutext: 'nav2-sub4', component: AdminContent },
    { path: `sub5`, menutext: 'nav2-sub5', component: AdminContent },
    { path: `sub6`, menutext: 'nav2-sub6', component: AdminContent },
    { path: `sub7`, menutext: 'nav2-sub7', component: AdminContent },
  ],
  [ROUTE_PATH.NAV3]: [
    { path: `sub1`, menutext: 'nav3-sub1', component: AdminContent },
    { path: `sub2`, menutext: 'nav3-sub2', component: AdminContent },
    { path: `sub3`, menutext: 'nav3-sub3', component: AdminContent },
    { path: `sub4`, menutext: 'nav3-sub4', component: AdminContent },
    { path: `sub5`, menutext: 'nav3-sub5', component: AdminContent },
    { path: `sub6`, menutext: 'nav3-sub6', component: AdminContent },
    { path: `sub7`, menutext: 'nav3-sub7', component: AdminContent },
  ]
}

export const MainRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminHeader menus={headerNav} />}>
          {headerNav.map(nav => (
            <Route key={nav.path} path={nav.path} element={<nav.component menus={SliderMenuMap[nav.path]} />}>
              {SliderMenuMap[nav.path].map(item => (
                <Route key={item.path} path={item.path} element={<item.component text={`${nav.menutext}: ${item.menutext}`} />} />
              ))}
            </Route>
          ))}
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}