export function CardView({ status = "notSelected", value, suite, clickCard, type, suitSvg }) {
    const isRedSuit = suite === 'HEARTS' || suite === 'DIAMONDS';
    const isWildcard = type === "WILDCARD";

    return (
        <div className={`card-container ${status} ${type}`} onClick={clickCard}>
            <div className={ `card-content ${isWildcard ? 'wildcard-suit' : (isRedSuit ? 'red-suit' : 'black-suit')}` }>
                <div className="value">{value}</div>
                <img 
                    src={suitSvg}
                    alt={suite} 
                    className="suite-symbol"
                />
            </div>
        </div>
    );
}