import {AppBar, Toolbar, Typography} from "@mui/material";
import React from "react";
import {Bookmarks, GitHub, Home} from "@mui/icons-material";
import "./Header.scss";
import {NavLink} from "react-router-dom";


const Header = () => {

    return (
        <div className="header">
            <AppBar>
                <Toolbar>
                    <GitHub fontSize="large" />
                    <Typography className="title" variant="h6" color="inherit" noWrap>
                        GitHub Searcher
                    </Typography>
                    <div className="grow" />
                    <div className="navigation">
                        <NavLink
                            to="/"
                            className={(navData) => (navData.isActive ? 'navButton activeLink' : 'navButton')}
                        >
                            <Home fontSize="small" sx={{ verticalAlign: 'bottom' }} /> Home
                        </NavLink>
                        <NavLink
                            to="/favorites"
                            className={(navData) => (navData.isActive ? 'navButton activeLink' : 'navButton')}
                        >
                            <Bookmarks fontSize="small" sx={{ verticalAlign: 'bottom' }} /> Favorites
                        </NavLink>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;