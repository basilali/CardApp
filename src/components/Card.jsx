export function CardView({ status = "notSelected", value, suite, clickCard, type, suitSvg }) {
    const isRedSuit = suite === 'HEARTS' || suite === 'DIAMONDS';

    return (
        <div className={`card-container ${status}`} onClick={clickCard}>
            <div className={`card-content ${isRedSuit ? 'red-suit' : 'black-suit'}`}>
                {type === "WILDCARD" && <div className="card-wildcard">WILDCARD</div>}
                <div className="value">{value}</div>
                <div className="card-suite">
                    <img 
                        src={suitSvg}
                        alt={suite} 
                        className="suite-symbol"
                    />
                </div>
            </div>
        </div>
    );
}