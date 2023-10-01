import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Grid } from '@mui/material';

const allowedLanguages = ["JavaScript", "Python", "Java", "TypeScript", "C#", "C++", "PHP", "Shell", "C", "Ruby", "Go"];

function SearchForm({ onSearch }: { onSearch: (query: string) => void }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>('best-match');
    const [mounted, setMounted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleLanguageChange = (e: React.ChangeEvent<{}>, newLanguages: string[]) => {
        setSelectedLanguages(newLanguages);
    };

    const handleSortChange = (e: SelectChangeEvent) => {
        setSelectedSort(e.target.value);
    };

    useEffect(() => {

        if (!mounted) {
            setMounted(true);
            return;
        }

        const languageQuery = selectedLanguages.length > 0 ? `(language:${selectedLanguages.join(' OR ')})` : '';
        const query = `${searchQuery} in:(name,description) ${languageQuery} sort:${selectedSort}`;

        onSearch(query);

    }, [searchQuery, selectedLanguages, selectedSort]);

    return (
        <Grid container spacing={2} sx={{ padding: '20px' }}>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Search GitHub repositories"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Autocomplete
                    multiple
                    id="languages"
                    options={allowedLanguages}
                    onChange={handleLanguageChange}
                    value={selectedLanguages}
                    renderInput={(params) => <TextField {...params} label="Languages" variant="outlined" />}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Sort By</InputLabel>
                    <Select label="Sort By" value={selectedSort} onChange={handleSortChange}>
                        <MenuItem value="best-match">Best Match</MenuItem>
                        <MenuItem value="stars-desc">Most stars</MenuItem>
                        <MenuItem value="stars-asc">Fewest stars</MenuItem>
                        <MenuItem value="forks-desc">Most forks</MenuItem>
                        <MenuItem value="forks-asc">Fewest forks</MenuItem>
                        <MenuItem value="updated-desc">Recently updated</MenuItem>
                        <MenuItem value="updated-asc">Least recently updated</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default SearchForm;