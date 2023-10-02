import React from 'react';
import {
    Modal,
    Box,
    Typography,
    Rating,
} from "@mui/material";

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRatingChange: (newRating: number) => void;
    rating: number;
}

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, onRatingChange, rating }) => {
    const handleRatingChange = (newRating: number) => {
        onRatingChange(newRating);
        onClose();
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="rating-modal-title"
            aria-describedby="rating-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'white',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography variant="h6" id="rating-modal-title">
                    Edit Rating
                </Typography>
                <Rating
                    name="rating-modal"
                    value={rating}
                    onChange={(event, newRating) => handleRatingChange(Number(newRating))}
                />
            </Box>
        </Modal>
    );
};

export default RatingModal;