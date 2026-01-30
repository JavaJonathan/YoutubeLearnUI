import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const TAG_LENS_COPY = {
  Incentives: {
    question: "What is actually motivating the behavior here?",
    explanation:
      "Use this tag when the video explains why people, companies, or systems act the way they do, especially when stated goals differ from real incentives."
  },
  Constraints: {
    question: "What is the real bottleneck or limiting factor?",
    explanation:
      "Use this tag when the lesson is shaped by limits like time, money, skills, rules, or energy, and progress depends on recognizing or relieving them."
  },
  Tradeoffs: {
    question: "What am I giving up to get this?",
    explanation:
      "Use this tag when the video forces a choice between competing priorities or reveals hidden costs that come with a decision."
  },
  "Time Horizons": {
    question: "Over what timeframe does this decision actually matter?",
    explanation:
      "Use this tag when the insight depends on patience, compounding, delayed payoff, or avoiding short-term thinking."
  },
  "Second-Order Effects": {
    question: "If this works, what happens next?",
    explanation:
      "Use this tag when the video explores downstream consequences, feedback loops, or unintended side effects."
  },
  Asymmetry: {
    question: "Is the upside much larger than the downside?",
    explanation:
      "Use this tag when the lesson is about leverage, optionality, or decisions with capped risk and outsized potential reward."
  },
  "Environment > Willpower": {
    question: "How can the environment make the right behavior automatic?",
    explanation:
      "Use this tag when the focus is on systems, defaults, or setup, not motivation or self-control."
  }
};

export default function TagExplanation({ tag }) {
  if (!tag || !TAG_LENS_COPY[tag]) return null;

  const { question, explanation } = TAG_LENS_COPY[tag];

  return (
    <Box
      sx={{
        mb: 2,
        px: 2,
        py: 1.5,
        borderRadius: 2,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        textAlign: "center"
      }}
    >
      <Typography variant="subtitle1" fontWeight={700}>
        {question}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {explanation}
      </Typography>
    </Box>
  );
}
