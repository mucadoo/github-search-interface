import React, { useState } from 'react';
import {Typography} from "@mui/material";

export const TruncatedText = ({ text, maxLength }: { text: string; maxLength: number }) => {

    if (!text || text.length <= maxLength) {
        return <Typography>{text}</Typography>;
    }

    return (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <Typography>{text.slice(0, maxLength)}...</Typography>
            {/*<a href="#" onClick={() => false}>*/}
            {/*    Show more*/}
            {/*</a>*/}
        </div>
    );
};