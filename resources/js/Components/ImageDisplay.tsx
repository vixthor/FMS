import React from "react";


interface ImageProps {
    src: string; // Image source path (relative to public folder)
    alt?: string; // Alternative text for accessibility
    className?: string; // Custom Tailwind CSS classes
}

const ImageDisplay: React.FC<ImageProps> = ({ src, alt = "Image", className }) => {
    const imageUrl = `${window.location.origin}/${src}`;

    return <img src={imageUrl} alt={alt} className={className} />;
};

export default ImageDisplay;

