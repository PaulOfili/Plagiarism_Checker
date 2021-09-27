import React from "react";

const SimilarResultCardComponent = ({title, content, matchedWordsCount}) => {
    return (
        <div className="similar-card">
            <h4 className="similar-card__title">{title.substring(0, 45) + (title.length > 45 ? "...": "")}</h4>
            <div className="similar-card__box">
                <p className="similar-card__content">
                    {content.substring(0,80) + (content.length > 80 ? "...": "")}
                </p>
                <p className="similar-card__count">{matchedWordsCount}</p>
            </div>
            
        </div>
    )
}

export default SimilarResultCardComponent;