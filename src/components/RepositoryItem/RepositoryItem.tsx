import React, {useState} from 'react';
import {Repository} from '../../interfaces/Repository';
import {
    Avatar, Card,
    CardActions,
    CardContent,
    CardHeader, Grid,
    IconButton, Modal, Rating,
    Typography
} from "@mui/material";
import languagesData from '../../data/languages.json';
import {RepoForkedIcon, RepoIcon, StarIcon} from '@primer/octicons-react';
import {Bookmark, BookmarkBorder, StarHalf, Whatshot} from "@mui/icons-material";
import "./RepositoryItem.scss";
import {purple} from "@mui/material/colors";
import {TruncatedText} from "../StyledComponents/TruncatedText";
import {Box} from "@mui/system";

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

    //const language = languagesData.find((language) => language.name === repository.language) || {name: null, color: ''};
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
                        <Avatar aria-label="recipe" className="avatar" sx={{ backgroundColor: purple[500] }}>
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
                                    color: '#551A8B',
                                }}
                            >
                                <StarIcon size={20}/>
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
                                    color: '#551A8B',
                                    marginLeft: 0
                                }}
                            >
                                <RepoForkedIcon size={20}/>
                                {repository.forkCount}
                            </a>
                        </React.Fragment>
                    ) : null}
                        <div style={{ marginLeft: 'auto' }}>
                            {onRate && (
                                <IconButton onClick={handleOpenRatingModal}>
                                    <StarHalf fontSize={"large"} />
                                </IconButton>
                            )}
                            <IconButton onClick={onToggleFavorite}>
                                {isFavorite ? <Bookmark fontSize={"large"} /> : <BookmarkBorder fontSize={"large"} />}
                            </IconButton>
                        </div>
                </CardActions>
                {isLastItem && lastRepoRef && (
                    <div ref={(node) => lastRepoRef(node as HTMLDivElement)}></div>
                )}
            </Card>
            <Modal
                open={isRatingModalOpen}
                onClose={handleCloseRatingModal}
                aria-labelledby="rating-modal-title"
                aria-describedby="rating-modal-description"
            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'white',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" id="rating-modal-title">
                        Edit Rating
                    </Typography>
                    <Rating
                        name={`rating-${repository.url}`}
                        value={rating}
                        onChange={(event, newRating) => handleRatingChange(Number(newRating))}
                    />
                </Box>
            </Modal>
        </Grid>
        // <div>
        //     <Typography variant="h6" component="div">
        //         <a href={repository.url} target="_blank" rel="noopener noreferrer">
        //             {repository.name}
        //         </a>
        //     </Typography>
        //     <Typography variant="body2" color="textSecondary">
        //         {repository.description}
        //     </Typography>
        //     <Button
        //         variant="contained"
        //         color={isFavorite ? 'secondary' : 'primary'}
        //         onClick={onToggleFavorite}
        //     >
        //         {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        //     </Button>
        //     {onRate && (
        //         <Rating
        //             name={`rating-${repository.url}`}
        //             value={repository.rating !== null ? repository.rating : 0}
        //             onChange={(event, newRating) => onRate(Number(newRating))}
        //         />
        //     )}
        // </div>
    );
};

export default RepositoryItem;