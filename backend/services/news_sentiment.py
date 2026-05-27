from transformers import pipeline

# LOAD MODEL ONCE
classifier = pipeline(
    "sentiment-analysis"
)


def analyze_sentiment(text):

    result = classifier(text)[0]

    return {

        "label": result["label"],

        "score": round(
            result["score"],
            2
        )
    }