import AboutPage from "./AboutPage/page";
import AssetsPage from "./AssetsPage/page";
import HomePage from "./HomePage/page";
import StepProcessPage from "./StepProcessPage/page";

export default function Wrapper() {
  return (
    <main className="relative overflow-x-hidden px-4">
      <HomePage />
      <AboutPage />
      <AssetsPage />
      <StepProcessPage />
    </main>
  )
}
