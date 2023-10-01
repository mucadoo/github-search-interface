import {AppBar, IconButton, InputBase, Toolbar, Typography} from "@mui/material";
import React from "react";
import {Whatshot} from "@mui/icons-material";
import {SearchIcon} from "@primer/octicons-react";
import "./Header.scss";
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <AppBar>
                <Toolbar>
                    <Whatshot fontSize="large" />
                    <Typography className="title" variant="h6" color="inherit" noWrap>
                        GitHub Searcher
                    </Typography>
                    <div className="grow" />
                    <div className="navigation">
                        <NavLink
                            to="/"
                            className={(navData) => (navData.isActive ? 'navButton activeLink' : 'navButton')}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/favorites"
                            className={(navData) => (navData.isActive ? 'navButton activeLink' : 'navButton')}
                        >
                            Favorites
                        </NavLink>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;