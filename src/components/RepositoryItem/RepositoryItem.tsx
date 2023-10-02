import React, {useState} from 'react';
import {Repository} from '../../interfaces/Repository';
import {
    Avatar, Card,
    CardActions,
    CardContent,
    CardHeader, Grid,
    IconButton, Tooltip,
    Typography
} from "@mui/material";
import {RepoForkedIcon, RepoIcon, StarIcon} from '@primer/octicons-react';
import {
    Favorite,
    FavoriteBorder,
    Star,
    StarBorder,
} from "@mui/icons-material";
import "./RepositoryItem.scss";
import {yellow} from "@mui/material/colors";
import {TruncatedText} from "../StyledComponents/TruncatedText";
import theme from "../../themes/default";
import RatingModal from "../RatingModal/RatingModal";

interface RepositoryItemProps {
    repository: Repository;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    onRate?: (rating: number) => void;
    isLastItem?: boolean;
    lastRepoRef?: (node: Element) => void;
}

const RepositoryItem: React.FC<RepositoryItemProps> = ({
                                                           repository,
                                                           isFavorite,
                                                           onToggleFavorite,
                                                           onRate,
                                                           isLastItem = false,
                                                           lastRepoRef,
                                                       }) => {

    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [rating, setRating] = useState(repository.rating || 0);

    const handleOpenRatingModal = () => {
        setIsRatingModalOpen(true);
    };

    const handleCloseRatingModal = () => {
        setIsRatingModalOpen(false);
    };

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
        if (onRate) {
            onRate(newRating);
        }
        handleCloseRatingModal();
    };

    return (
        <Grid item xs={12} sm={6} lg={3} className="repository-item">
            <Card className="card">
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className="avatar" sx={{ bgcolor: theme.palette.primary.main }}>
                            <RepoIcon size={20} />
                        </Avatar>
                    }
                    title={
                        <Typography variant="h6">
                            <a
                                href={repository.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="title"
                                style={{color: theme.palette.primary.main}}
                            >
                                {repository.name}
                            </a>
                        </Typography>
                    }
                />
                <CardContent className="cardContent">
                    <TruncatedText maxLength={175} text={repository.description}></TruncatedText>
                </CardContent>
                <CardActions className="cardActions">
                    {repository.primaryLanguage ? (
                        <React.Fragment>
                          <span className="dot" style={{ backgroundColor: repository.primaryLanguage.color }}></span>
                            <Typography style={{ marginRight: '10px' }}>
                                {repository.primaryLanguage.name}
                            </Typography>
                        </React.Fragment>
                    ) : null}
                    {repository.stargazerCount >= 0 ? (
                        <React.Fragment>
                            <a
                                href={repository.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    textDecoration: 'none',
                                    marginRight: '10px',
                                    color: 'black'
                                }}
                            >
                                <StarIcon fill={theme.palette.secondary.main} size={20}/>
                                {repository.stargazerCount}
                            </a>
                        </React.Fragment>
                    ) : null}
                    {repository.forkCount >= 0 ? (
                        <React.Fragment>
                            <a
                                href={`${repository.url}/fork`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    textDecoration: 'none',
                                    marginRight: '10px',
                                    marginLeft: 0,
                                    color: 'black'
                                }}
                            >
                                <RepoForkedIcon fill={theme.palette.secondary.main} size={20}/>
                                {repository.forkCount}
                            </a>
                        </React.Fragment>
                    ) : null}
                        <div style={{ marginLeft: 'auto' }}>
                            {onRate && (
                                <Tooltip title="Repository rating">
                                    <IconButton style={{color: "black"}} onClick={handleOpenRatingModal}>
                                        {rating}{rating > 0 ? <Star style={{color: yellow["A700"]}} fontSize={"large"}/> : <StarBorder style={{color: yellow["A700"]}} fontSize={"large"}/>}
                                    </IconButton>
                                </Tooltip>
                            )}
                            <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                                <IconButton onClick={onToggleFavorite}>
                                    {isFavorite ? <Favorite color={"primary"} fontSize={"large"} /> : <FavoriteBorder color={"primary"} fontSize={"large"} />}
                                </IconButton>
                            </Tooltip>
                        </div>
                </CardActions>
                {isLastItem && lastRepoRef && (
                    <div ref={(node) => lastRepoRef(node as HTMLDivElement)}></div>
                )}
            </Card>
            <RatingModal
                isOpen={isRatingModalOpen}
                onClose={handleCloseRatingModal}
                onRatingChange={handleRatingChange}
                rating={rating}
            />
        </Grid>
    );
};

export default RepositoryItem;