//RouterIndex.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "../components/navigation/Navigation";
import { IndividualsView } from "../views/individuals-view/IndividualsView";
import { OrganizationsView } from "../views/organizations-view/OrganizationsView";
import { ProductsView } from "../views/product-view/ProductsView";
import { ProxyListView } from "../views/proxy-view/proxy-list-view/ProxyListView";
import { ProxyView } from "../views/proxy-view/proxy-view/ProxyView";
import { ProxyCreateView } from "../views/proxy-view/proxy-view/ProxyCreateView";
import { DepartmentsView } from "../views/departments-view/DepartmentsView";
import { PrikazListView } from "../views/prikaz-view/prikaz-list-view/PrikazListView";
import { PrikazView } from "../views/prikaz-view/prikaz-view/PrikazView";
import { PrikazCreateView } from "../views/prikaz-view/prikaz-view/PrikazCreateView";
import { ROUTE_PATHS } from "./paths";

export const RouterIndex = (props) => {
  return (
    <BrowserRouter>
      <Navigation>
        <Routes>
          <Route path={ROUTE_PATHS.products} element={<ProductsView />} />
          <Route path={ROUTE_PATHS.individuals} element={<IndividualsView />} />
          <Route
            path={ROUTE_PATHS.organizations}
            element={<OrganizationsView />}
          />
          <Route path={ROUTE_PATHS.departments} element={<DepartmentsView />} />
          <Route path={ROUTE_PATHS.proxy.list} element={<ProxyListView />} />
          <Route path={ROUTE_PATHS.proxy.proxy} element={<ProxyView />} />
          <Route
            path={ROUTE_PATHS.proxy.create + "/:id?"}
            element={<ProxyCreateView />}
          />

          <Route path={ROUTE_PATHS.prikaz.list} element={<PrikazListView />} />
          <Route path={ROUTE_PATHS.prikaz.prikaz} element={<PrikazView />} />

          <Route
            path={ROUTE_PATHS.prikaz.create + "/:id?"}
            element={<PrikazCreateView />}
          />

          <Route path={"/"} element={<ProxyListView />} />
        </Routes>
      </Navigation>
    </BrowserRouter>
  );
};
