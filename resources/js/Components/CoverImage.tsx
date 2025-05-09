import React from "react";


interface ImageProps {
    src: string; // Image source path (relative to public folder)
    alt?: string; // Alternative text for accessibility
    className?: string; // Custom Tailwind CSS classes
}

const CoverImage: React.FC<ImageProps> = ({ src, alt = "Image", className }) => {
    const imageUrl = `${window.location.origin}/${src}`;

    return <img src={imageUrl} alt={alt} className={className} />;
};

export default CoverImage;

<CoverImage src='images/coverimage.svg' className="h-100vh object-cover hidden md:block w-4/6"></CoverImage>