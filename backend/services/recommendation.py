def generate_recommendation(

    rsi,
    macd,
    macd_signal,
    predicted_price,
    current_price,
    sentiment_score
):

    score = 0

    reasons = []

    # RSI
    if rsi < 30:

        score += 2

        reasons.append(
            "RSI indicates oversold market"
        )

    elif rsi > 70:

        score -= 2

        reasons.append(
            "RSI indicates overbought market"
        )

    # MACD
    if macd > macd_signal:

        score += 2

        reasons.append(
            "MACD bullish crossover"
        )

    else:

        score -= 2

        reasons.append(
            "MACD bearish crossover"
        )

    # PREDICTION
    if predicted_price > current_price:

        score += 3

        reasons.append(
            "AI predicts price increase"
        )

    else:

        score -= 3

        reasons.append(
            "AI predicts price decrease"
        )

    # SENTIMENT
    if sentiment_score > 0.7:

        score += 2

        reasons.append(
            "Positive market sentiment"
        )

    else:

        score -= 2

        reasons.append(
            "Negative market sentiment"
        )

    # FINAL DECISION
    if score >= 5:

        recommendation = "STRONG BUY"

    elif score >= 2:

        recommendation = "BUY"

    elif score <= -5:

        recommendation = "STRONG SELL"

    elif score <= -2:

        recommendation = "SELL"

    else:

        recommendation = "HOLD"

    confidence = min(
        abs(score) * 10,
        95
    )

    return {

        "recommendation":
            recommendation,

        "confidence":
            confidence,

        "reasons":
            reasons
    }