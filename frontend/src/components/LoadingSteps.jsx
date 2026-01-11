import "./LoadingSteps.css";

export default function LoadingSteps() {
  const steps = [
    "Searching across multiple platforms",
    "Gathering product information",
    "Analyzing YouTube reviews & comments",
    "Processing sentiment analysis",
    "Comparing prices & offers",
    "Preparing your personalized results",
  ];

  return (
    <div className="overlay">
      <div className="loader-card">
        <h2>🔍 Finding the best deals for you</h2>
        <p>Please wait while we analyze the market</p>

        <div className="steps-box">
          {steps.map((step, index) => (
            <div className="step" key={index}>
              <span className="check">✅</span>
              <div className="step-content">
                <p>{step}</p>
                <div className="bar"></div>
              </div>
            </div>
          ))}
        </div>

        <small>This may take a few moments...</small>
      </div>
    </div>
  );
}