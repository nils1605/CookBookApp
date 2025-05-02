import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
// Pages
import CreateRecipePage from './pages/CreateRecipe';
import FavoritesPage from './pages/Favorites';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound';
import RecipeDetailPage from './pages/RecipeDetail';
import RegisterPage from './pages/Register';

// UI
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateRecipePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
