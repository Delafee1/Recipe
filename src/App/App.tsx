import React from "react";
import RecipePage from "pages/RecipePage";
import RecipesPage from "pages/RecipesPage";
import { useQueryParamsStoreInit } from "store/RootStore/useQueryParamsStoreInit";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  useQueryParamsStoreInit();
  return (
    <Routes>
      <Route path="/recipes/*" element={<RecipesPage />} />
      <Route path="/recipe/*" element={<RecipePage />} />
      <Route path="*" element={<Navigate to="/recipes/" replace />} />
    </Routes>
  );
};

export default App;
