import { Feature } from "@/types/feature";
import { FeatureAuth, FeatureQualityResponse, FeatureResume, FeatureS } from "@/components/svg-components/feature-svgs";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: <FeatureResume />,
    title: "Resume reviews",
    paragraph:
      "Enhance your job application process with our Resume Review feature, which provides personalized feedback to help you craft a standout resume. Leverage AI-driven insights to highlight your strengths and optimize your presentation for potential employers.",
  },
  {
    id: 2,
    icon: <FeatureQualityResponse />,
    title: "High-quality Response",
    paragraph: "Experience unparalleled insights with our Prep wise@ app, delivering high-quality responses tailored to your needs. Unlock the potential of intelligent assistance that enhances your decision-making and boosts productivity.",
  },
  {
    id: 3,
    icon: <FeatureS />,
    title: "Accurate Chat",
    paragraph: "Accurate Chat ensures precise and reliable communication, empowering users with trustworthy information at their fingertips. Experience seamless interactions where clarity and correctness are prioritized, making every conversation count.",
  },
];
export default featuresData;
