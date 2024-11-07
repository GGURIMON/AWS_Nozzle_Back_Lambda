import { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ImageContext } from '../context/ImageContext';

const Prompt = () => {
  const { uploadedImage, setUploadedImage } = useContext(ImageContext) || { uploadedImage: null, setUploadedImage: () => { } }; // 기본값 추가
  // const [imageUrl, setImageUrl] = useState<string | null>(null); // 이미지 URL 상태
  const [prompt, setPrompt] = useState<string>("호랑이");
  const [delay, setDelay] = useState<boolean>(false);

  const handleGenerateImage = async () => {
    setDelay(true)
    console.log(prompt);
    console.log(typeof (prompt));
    try {
      const { data } = await axios.post('https://x8txu4fs3e.execute-api.ap-northeast-2.amazonaws.com/dev/create', {
        prompt: prompt, // 프롬프트 데이터

      }, {
        // responseType: 'blob' // Blob 형식으로 응답 받기
      });
      console.log(data)
      // console.log(response.data.image_base64)
      //     // Blob 데이터를 URL로 변환
      //     // const imageBlob = response.data;
      //     // const imageUrl = URL.createObjectURL(imageBlob);
      //     // setImageUrl(imageUrl); // 이미지 URL 설정
      const base64Image = data.image_base64; // Base64 문자열
      console.log("1234", base64Image)
      setUploadedImage(`data:image/png;base64,${base64Image}`); // 이미지 URL 설정
      setDelay(false)
    } catch (error) {
      setDelay(false)
      console.error('Error generating image:', error);
    }
  };

  return (
    <Row className='full-page-section-prompt'>

      <Col xs={10} md={10} lg={5} className='prompt-text mt-5'>
        <Row>
          <div style={{ height: "13vh", borderBottom: "2px solid rgba(51, 51, 51, 1)" }}>
            <Col lg={12}>설명 프롬프트 작성하기</Col>
            <Col lg={12} className='mt-4 prompt-input' style={{ position: 'relative' }}>
              <input type='text' onChange={(e) => setPrompt(e.target.value)} placeholder="떠오른 영감을 자유롭게 작성해주세요." style={{ paddingRight: '100px' }} />
              <button className='generate-button' onClick={handleGenerateImage} style={{ position: 'absolute', top: '10px', right: '20px' }}>이미지 생성</button>
            </Col>
          </div>
          <Col lg={12} className='created-img mt-3'>
            {delay && <div className="loading">Loading&#8230;</div>}
            {uploadedImage &&
              <img className='temp-img1' src={uploadedImage} alt="Generated" style={{ width: '100%', height: '60vh' }} />
            } {/* 이미지 표시 */}
          </Col>
          {uploadedImage && <Row className='d-flex align-items-center justify-content-center mt-1 g-2'>
            <Col xs={6} md={6} className="text-center">
              <div></div>
              <Link to={'/edit'} className="img-btn d-flex align-items-center justify-content-center ">편집 하러가기</Link>
            </Col>
            <Col xs={6} md={6} className="text-center">

              <Link to={'/save'} className="img-create-btn d-flex align-items-center justify-content-center ">이미지 저장하기</Link>
            </Col>
          </Row>}



        </Row>
      </Col>
    </Row>
  )
}

export default Prompt
