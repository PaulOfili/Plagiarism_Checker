import React from "react";

const SimilarCardComponent = ({title, content, matchedWordsCount}) => {
    return (
        <div className="similar-card">
            <p className="similar-card__title">{title.substring(0, 20) + (title.length > 20 ? "...": "")}</p>
            <div className="similar-card__box">
                <p className="similar-card__content">
                    {content.substring(0,80) + (content.length > 80 ? "...": "")}
                </p>
                <p className="similar-card__count">{matchedWordsCount}</p>
            </div>
            
        </div>
    )
}

export default SimilarCardComponent;