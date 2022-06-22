import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageHome from "../containers/PageHome/PageHome";
import Page404 from "../containers/Page404/Page404";

export const pages = [{ path: "/", exact: true, Component: PageHome }];

const Router = () => {
    return (
        <BrowserRouter>
            {/* <ScrollToTop /> */}
            {/* <HeaderContainer /> */}
            <Routes>
                {pages.map(({ Component, path }) => {
                    return (
                        <Route key={path} element={<Component />} path={path} />
                    );
                })}
                <Route path="*" element={<Page404 />} />
            </Routes>
            {/* <Footer /> */}
        </BrowserRouter>
    );
};

export default Router;
