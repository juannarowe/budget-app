import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BudgetDetailPage from './pages/BudgetDetailPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/budget/:id" element={<BudgetDetailPage />} />
    </Routes>
  )
}