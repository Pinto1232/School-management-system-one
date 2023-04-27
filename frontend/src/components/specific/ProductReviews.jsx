import React, { useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import reviews from '../../data/ProductReviewData'
import ProductRatingsAndReviews from "./ProductRatingsAndReviews";


const ProductReviews = () => {
    const [sortedReviews, setSortedReviews] = useState(reviews);

    const handleUpvote = (reviewId) => {
        const updatedReviews = sortedReviews.map((review) => {
            if (review.id === reviewId) {
                return {
                    ...review,
                    upvotes: review.upvotes + 1,
                };
            } else {
                return review;
            }
        });
        setSortedReviews(updatedReviews);
    };

    const handleDownvote = (reviewId) => {
        const updatedReviews = sortedReviews.map((review) => {
            if (review.id === reviewId) {
                return {
                    ...review,
                    downvotes: review.downvotes + 1,
                };
            } else {
                return review;
            }
        });
        setSortedReviews(updatedReviews);
    };

    const handleSort = (sortBy) => {
        const sorted = [...sortedReviews].sort((a, b) => b[sortBy] - a[sortBy]);
        setSortedReviews(sorted);
    };

    return (
        <Box>
            <ProductRatingsAndReviews
                reviews={sortedReviews}
                onSort={handleSort}
                onUpvote={handleUpvote}
                onDownvote={handleDownvote}
            />
        </Box>
    );
};

export default ProductReviews;
