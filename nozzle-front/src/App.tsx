import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header'; // Header 컴포넌트를 임포트합니다.
import Footer from './components/Footer'; // Footer 컴포넌트를 임포트합니다.
import Home from './pages/Home';
import Prompt from './pages/Prompt';
import Edit from './pages/Edit';
import Save from './pages/Save';
import { ImageContext } from './context/ImageContext';
import { useState } from 'react';

const App = () => {
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // 업로드된 이미지 URL 상태
  return (
    <>
      {/* Header 컴포넌트*/}
      <Header /> 

      {/* 섹션 영역 */}
      <ImageContext.Provider value={{ uploadedImage, setUploadedImage }}>
      <Container className='main' fluid>
        <Routes>
        {/* URL 파라미터 형식으로 Route 구성하기 */}
        <Route path='/' element={<Home />} />
        <Route path='/prompt' element={<Prompt/>} />
        <Route path='/edit' element={<Edit/>} />
        <Route path='/save' element={<Save/>} />
      </Routes> 
      </Container>
      </ImageContext.Provider>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
