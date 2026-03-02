import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SoundProvider } from "@/contexts/SoundContext";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import TheoryPage from "@/pages/TheoryPage";
import WaveTypesPage from "@/pages/WaveTypesPage";
import ApplicationsPage from "@/pages/ApplicationsPage";
import QuizPage from "@/pages/QuizPage";
import BibliographyPage from "@/pages/BibliographyPage";

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/teorie" element={<TheoryPage />} />
              <Route path="/tipuri-unde" element={<WaveTypesPage />} />
              <Route path="/aplicatii" element={<ApplicationsPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/bibliografie" element={<BibliographyPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;
