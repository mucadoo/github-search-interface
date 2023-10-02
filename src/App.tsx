import React, { useCallback, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { debounce } from 'lodash';
import { CircularProgress, Grid } from '@mui/material';
import Header from './components/Header/Header';
import SearchForm from './components/SearchForm/SearchForm';
import RepositoryItem from './components/RepositoryItem/RepositoryItem';
import { Repository } from "./interfaces/Repository";
import { SEARCH_REPOSITORIES } from './queries/queries';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

loadDevMessages();
loadErrorMessages();

function App() {

    const first = 20;
    const observer = useRef<IntersectionObserver | null>(null);
    const [favorites, setFavorites] = useState<Repository[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loadedRepositories, setLoadedRepositories] = useState<Repository[]>([]);
    const [after, setAfter] = useState(null);
    const [executeQuery, setExecuteQuery] = useState(false);

    const {loading, error, data} = useQuery(SEARCH_REPOSITORIES, {
        variables: {query: searchQuery, first, after},
        skip: !executeQuery,
        onCompleted: (newData) => {
            if (newData.search.edges) {
                setLoadedRepositories([...loadedRepositories, ...newData.search.edges.map((edge: {
                    node: Repository;
                }) => edge.node)]);
            }
        }
    });

    const handleSearch = debounce((query) => {
        setExecuteQuery(false);
        setLoadedRepositories([]);
        setAfter(null);
        setSearchQuery(query);
        setExecuteQuery(true);
    }, 500);

    const loadMoreRepositories = useCallback(() => {
        if (data && data.search.pageInfo.hasNextPage && !loading) {
            setAfter(data.search.pageInfo.endCursor);
            setExecuteQuery(true);
        }
    }, [data, loading]);

    const lastRepoRef = useCallback(
        (node: Element) => {
            if (loading) return;

            if (observer.current) {
                observer.current.disconnect();
            }

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreRepositories();
                }
            });

            if (node) {
                observer.current.observe(node);
            }
        },
        [loading, loadMoreRepositories]
    );

    const toggleFavorite = (repository: Repository) => {
        if (favorites.some((fav) => fav.url === repository.url)) {
            const updatedFavorites = favorites.filter((fav) => fav.url !== repository.url);
            setFavorites(updatedFavorites);
        } else {
            setFavorites([...favorites, repository]);
        }
    };

    const rateRepository = (repository: Repository, rating: number) => {
        const updatedFavorites = favorites.map((fav) => {
            if (fav.url === repository.url) {
                return {...fav, rating};
            }
            return fav;
        });
        setFavorites(updatedFavorites);
    };

    return (
        <div>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Header/>
                </Grid>
                <Grid item xs={12} style={{marginTop: 40}}>
                    <Grid container spacing={0}>
                        <Routes>
                            <Route path="/"
                                element={
                                    <Grid item xs={12} style={{
                                        position: "absolute",
                                        right: "0px",
                                        width: "100%"}}>
                                        <div>
                                            <SearchForm onSearch={handleSearch}/>
                                        </div>
                                        <br />
                                        <div>
                                            <Grid container spacing={5} sx={{ padding: '20px' }}>
                                                {loadedRepositories.map((repository, index) => (
                                                    <RepositoryItem
                                                        key={repository.url}
                                                        repository={repository}
                                                        isFavorite={favorites.some((fav) => fav.url === repository.url)}
                                                        onToggleFavorite={() => toggleFavorite(repository)}
                                                        isLastItem={index === loadedRepositories.length - 1}
                                                        lastRepoRef={lastRepoRef}
                                                    />
                                                ))}
                                            </Grid>
                                            {loading && (
                                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                    <CircularProgress />
                                                </div>
                                            )}
                                        </div>
                                    </Grid>
                                }
                            />
                            <Route path="/favorites"
                                element={
                                    <Grid item xs={12} style={{
                                        position: "absolute",
                                        right: "0px",
                                        width: "100%"}}>
                                        <Grid container spacing={5} sx={{ padding: '20px' }}>
                                            {favorites.map((repository) => (
                                                <RepositoryItem
                                                    key={repository.url}
                                                    repository={repository}
                                                    isFavorite={true}
                                                    onToggleFavorite={() => toggleFavorite(repository)}
                                                    onRate={(rating) => rateRepository(repository, rating)}
                                                />
                                            ))}
                                        </Grid>
                                    </Grid>
                                }
                            />
                        </Routes>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    );
}

export default App;