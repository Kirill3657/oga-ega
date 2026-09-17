import { MotionProvider } from "./components/MotionProvider";
import { LandingPage } from "./components/LandingPage";

export default function Page() {
  return (
    <MotionProvider>
      <LandingPage />
    </MotionProvider>
  );
}