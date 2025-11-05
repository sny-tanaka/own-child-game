import { Route, Routes } from 'react-router-dom';

import styles from './App.module.scss';

import { Page as NotFoundPage } from '@/pages/not-found';
import { Page as RootPage } from '@/pages/root';

function App(): JSX.Element {
  return (
    <div className={styles.main}>
      <Routes>
        <Route
          path="/"
          element={<RootPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
